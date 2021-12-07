import {
  PartialProductDataEntityComponent,
  PartialProductDataEntity,
} from "../entities/PartialProductDataEntity";
import {
  ProductDataEntity,
  ProductDataEntityComponent,
} from "../entities/ProductDataEntity";
import {
  buildGeographicalAreaProvider,
  IGeographicalAreaProvider,
} from "../providers/geographical-area";
import { IProductDataTemplateProvider } from "../providers/product-data-template-provider";
import { ModelVersion } from "../types";

const FLOAT_ERROR_MARGIN = 0.001;
// TECHNICAL-DEBT should look at what's a good value

type ExpandPartialProductDataEntityOperation = (
  productDataTemplateProvider: IProductDataTemplateProvider,
  geographicalAreaProvider: IGeographicalAreaProvider
) => (
  partialProductData: PartialProductDataEntity,
  templateId: string,
  modelVersion: ModelVersion
) => ProductDataEntity;

/**
 * Expands a partial product data (`PartialProductDataEntity`)
 * into a complete product data (`ProductDataEntity`).
 *
 * The expansion is done by applying an algorithm specified in
 * [doc/expansion.md](../doc/expansion.md).
 *
 * ### Dependencies
 *
 * - `ProductDataTemplateProvider`: provides the template for the
 *   expansion, based on its `id`.
 *
 * @param productDataTemplateProvider
 */
export const ExpandPartialProductDataEntityOperation: ExpandPartialProductDataEntityOperation =
  (
    productDataTemplateProvider: IProductDataTemplateProvider,
    geographicalAreaProvider = buildGeographicalAreaProvider()
  ) => {
    return (src, templateId, modelVersion) => {
      const template = productDataTemplateProvider.get(
        templateId,
        modelVersion
      );
      const unidentifiedMaterialId = "missingMaterialPart"; // TECHNICAL-DEBT: only for "shoes/sneakers"

      let expanded: PartialProductDataEntity = {
        weight: src.weight,
        components: src.components?.map((c) => ({
          componentId: c.componentId,
          materials: c.materials?.map((m) => ({
            materialId: m.materialId,
            proportion: m.proportion,
          })),
          materialCountryId: c.materialCountryId,
          proportion: c.proportion,
        })),
        manufacturingCountryId: src.manufacturingCountryId,
        endOfLifeRecyclingProgram: src.endOfLifeRecyclingProgram,
      }; // deep copy

      // 1. Expand missing material country id with
      //   manufacturing country.
      if (expanded.components) {
        for (const c of expanded.components) {
          c.materialCountryId ||=
            src.manufacturingCountryId || template.manufacturingCountryId;
        }
      }

      // 2. Expand from template

      // End-of-life fields
      // DEPRECATED: handling endOfLifeRecyclingProgram is for retro-compatibility
      //   with older product data schemas before ...Option and ...Value were
      //   introduced.
      // TECHNICAL-DEBT: remove this after having migrated the data
      let expandedEndOfLifeOption: string;
      let expandedEndOfLifeValue: number | null;
      if (src.endOfLifeRecyclingProgram !== undefined) {
        if (src.endOfLifeOption)
          throw new Error(
            "invalid partial with both legacy and new values for `endOfLife`"
          );
        expandedEndOfLifeOption = src.endOfLifeRecyclingProgram
          ? "withRecyclingProgram"
          : "withoutRecyclingProgram";
        expandedEndOfLifeValue = null;
      } else {
        expandedEndOfLifeOption =
          src.endOfLifeOption || template.endOfLifeOption;
        expandedEndOfLifeValue =
          expandedEndOfLifeOption === "custom"
            ? src.endOfLifeValue || template.endOfLifeValue
            : null;
        if (expandedEndOfLifeOption === "custom" && !expandedEndOfLifeValue) {
          throw new Error(`unexpected null endOfLifeValue with option=custom`);
        }
      }

      expanded = {
        weight: src.weight || template.weight,
        components: expandComponentsFromTemplate(expanded, template.components),
        manufacturingCountryId:
          src.manufacturingCountryId || template.manufacturingCountryId,
        endOfLifeRecyclingProgram:
          src.endOfLifeRecyclingProgram === undefined
            ? template.endOfLifeRecyclingProgram
            : src.endOfLifeRecyclingProgram,
        endOfLifeOption: expandedEndOfLifeOption,
        endOfLifeValue: expandedEndOfLifeValue,
      };

      if (!expanded.components)
        throw new Error(
          "unexpected empty results.components, should have been filled with template's"
        );

      // 3. Expanding missing material proportions
      for (const c of expanded.components) {
        if (c.materials && c.materials.length > 0) {
          const materialsProportionSum = sumProportions(c.materials);
          if (materialsProportionSum < 1.0) {
            const materialsWithUndefinedProportion = c.materials.filter(
              (m) => !m.proportion
            );
            if (materialsWithUndefinedProportion.length > 0) {
              // Filling equally all materials with undefined proportions
              // with the remaining proportion.
              for (const m of materialsWithUndefinedProportion) {
                m.proportion =
                  (1.0 - materialsProportionSum) /
                  materialsWithUndefinedProportion.length;
              }
            } else {
              // Adding a default material for the remaining proportion.
              // TECHNICAL-DEBT: this default material should be selected
              //   according to the component.
              c.materials.push({
                materialId: unidentifiedMaterialId,
                proportion: 1.0 - materialsProportionSum,
              });
            }
          }
        } else
          throw new Error(
            `unexpected error, components[${c.componentId}].materials should have been completed from template`
          );
      }

      // 4. Expanding components with an "other" component for the remaining proportion
      const componentsProportionSum = sumProportions(expanded.components);
      if (componentsProportionSum < 1.0) {
        expanded.components.push({
          componentId: "other",
          materials: [
            {
              materialId: unidentifiedMaterialId,
              proportion: 1.0,
            },
          ],
          materialCountryId:
            src.manufacturingCountryId || template.manufacturingCountryId,
          proportion: 1.0 - componentsProportionSum,
        });
      }

      // 5. Expanding `distributionMode`
      expanded.distributionMode =
        src.distributionMode ||
        distributionModeForCountry(
          geographicalAreaProvider,
          expanded.manufacturingCountryId!
        );

      // TECHNICAL-DEBT should check expanded is a valid `ProductDataEntity`
      return expanded as ProductDataEntity;
    };
  };

function expandComponentsFromTemplate(
  partial: PartialProductDataEntity,
  templateComponents: ProductDataEntityComponent[]
): PartialProductDataEntityComponent[] {
  const srcComponents: PartialProductDataEntityComponent[] | undefined =
    partial.components;

  if (!srcComponents || srcComponents.length === 0) {
    return templateComponents.map((c) => ({
      componentId: c.componentId,
      materials: c.materials.map((m) => ({
        materialId: m.materialId,
        proportion: m.proportion,
      })),
      materialCountryId: c.materialCountryId,
      proportion: c.proportion,
    }));
  }

  const resultComponents: PartialProductDataEntityComponent[] = [];
  for (let tc of templateComponents) {
    const sc = srcComponents.find((c) => c.componentId === tc.componentId);
    const tcCopy = {
      componentId: tc.componentId,
      materials: tc.materials.map((m) => ({
        materialId: m.materialId,
        proportion: m.proportion,
      })),
      materialCountryId: tc.materialCountryId,
      proportion: tc.proportion,
    };
    // TECHNICAL-DEBT should use deepCopy

    if (!sc) {
      // If the template component is missing from the source, add it.
      resultComponents.push(tcCopy);
    } else {
      // If present, expand it with values from the template.
      if (!sc.materialCountryId)
        throw new Error(
          "unexpected error: materialCountryId should have been filled with manufacturingCountryId"
        );

      const resultComp: PartialProductDataEntityComponent = {
        componentId: tc.componentId,
        materials: (() => {
          if (sc.materials && sc.materials.length > 0) {
            // Source component already has materials, leave untouched
            return sc.materials;
          } else {
            return tcCopy.materials;
          }
        })(),
        materialCountryId: sc.materialCountryId,
        proportion: sc.proportion || tc.proportion,
      };
      resultComponents.push(resultComp);
    }
  }
  return resultComponents;
}

export function sumProportions(
  items: { proportion?: number }[] | undefined
): number {
  if (!items) return 0.0;
  const sum = items.reduce((sum, item) => sum + (item.proportion || 0.0), 0.0);
  return sum;
}

// TECHNICAL-DEBT should be synchronized with `ProductDataEntity`
//   type.
export function checkDataValidity(data: ProductDataEntity) {
  const sumComponentProportions = sumProportions(data.components);
  if (sumComponentProportions < 1.0 - FLOAT_ERROR_MARGIN) {
    throw new Error(
      `invalid data, sum of proportions of components < 1.0 (${sumComponentProportions})`
    );
  }
  for (const c of data.components) {
    const sumMaterialProportions = sumProportions(c.materials);
    if (sumMaterialProportions < 1.0 - FLOAT_ERROR_MARGIN) {
      throw new Error(
        `invalid data, sum of proportions for materials of ${c.componentId} < 1.0 (${sumMaterialProportions})`
      );
    }
  }
}

function distributionModeForCountry(
  geographicalAreaProvider: IGeographicalAreaProvider,
  countryId: string
): string {
  const ga = geographicalAreaProvider.getById(countryId);
  if (ga.type === "country") {
    switch (ga.parentId) {
      case "asia":
        return "intercontinental/default";
      case "south-america":
        return "intercontinental/default";
      case "europe":
        return "intracontinental/default";
      case "africa":
        return "intercontinental/default";
    }
  }
  throw new Error(
    `unexpected "${ga.type}" geographic area, expected "country" (${ga.id})`
  );
}
