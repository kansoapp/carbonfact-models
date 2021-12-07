import { EmissionFactorProvider } from "../providers/emission-factor-provider";
import { ModelParameterEntity } from "../entities/ModelParameterEntity";
import { ProductDataEntity } from "../entities/ProductDataEntity";
import {
  ProductFootprintEntity,
  ProductFootprintExplanation,
} from "../entities/ProductFootprintEntity";
import { ModelVersion } from "../types";
import { checkDataValidity } from "./expand-partial-product-data";
import { ModelParameterProvider } from "../providers/model-parameter-provider";
import { EmissionFactorEntity } from "../entities/EmissionFactorEntity";

type ComputeProductFootprintOperation = (
  emissionFactorProvider: EmissionFactorProvider,
  modelParameterProvider: ModelParameterProvider
) => (
  productDataEntity: ProductDataEntity,
  modelVersion: ModelVersion
) => ProductFootprintEntity;

/**
 * Computes the carbon footprint using Carbonfact's simplified LCA model
 * for the specified `ProductDataEntity`.
 *
 * Scope
 * -----
 * This use case processes complete data and does not perform data extension
 * using a template. This is out-of-scope for this use case as it would violate
 * the Single-Responsibility-Principle. Another use case should handle the
 * expansion. The resulting complete product data could then be passed to this
 * use case.
 *
 * Dependencies
 * ------------
 * This use case depends on `EmissionFactorProvider` and `ModelParameterProvider`.
 * They provide the emission factors and model parameters required to perform
 * the footprint calculation.
 *
 * @param emissionFactorProvider
 * @param modelParameterProvider
 * @returns
 */
export const ComputeProductFootprintOperation: ComputeProductFootprintOperation =
  (
    emissionFactorProvider: EmissionFactorProvider,
    modelParameterProvider: ModelParameterProvider
  ) => {
    return (data: ProductDataEntity, modelVersion: ModelVersion) => {
      checkDataValidity(data);
      const { weight, manufacturingCountryId } = data;

      // Materials
      // ---------
      const explanationMaterialsComponents: ProductFootprintExplanation["materials"]["components"] =
        [];
      let explanationMaterialsHumanReadable = "";
      let materialsTotal = 0;
      for (const component of data.components) {
        // Adding the emissions for each component of the product.

        let componentWeight = component.proportion * weight;
        let componentEmissions = 0.0;

        const explanationMaterialItems: any[] = [];
        for (const materialItem of component.materials) {
          // Adding the emissions for each material of the component.
          // TECHNICAL-DEBT check sum of components.materials.proportion <= 1.0

          let emissionFactor: EmissionFactorEntity;
          if (materialItem.materialId === "missingMaterialPart") {
            // TECHNICAL-DEBT relying on "missingMaterialPart" should
            //   be removed. This is a special case where we have only
            //   one emission factor, not attached to a specific country.
            //   This should be done differently in our carbon-model.
            emissionFactor = emissionFactorProvider.get(
              "material/missingMaterialPart",
              modelVersion,
              "world"
            );
          } else {
            emissionFactor = emissionFactorProvider.get(
              "material/" + materialItem.materialId,
              modelVersion,
              component.materialCountryId
            );
          }

          const materialItemEmissions =
            emissionFactor.value * componentWeight * materialItem.proportion;
          componentEmissions += materialItemEmissions;

          explanationMaterialItems.push({
            materialId: materialItem.materialId,
            proportion: materialItem.proportion,
            emissionFactor: emissionFactor,
            humanReadable: `${materialItem.proportion * 100}% ${
              materialItem.materialId
            } ${emissionFactor.value} ${emissionFactor.unit} * ${
              component.componentId
            } proportion ${
              component.proportion * 100
            }% * product weight ${weight} kg = ${materialItemEmissions} kgCO2e`,
          });
        }
        explanationMaterialsComponents.push({
          componentId: component.componentId,
          materials: explanationMaterialItems,
          proportion: component.proportion,
          total: componentEmissions,
          unit: "kgCO2eq",
        });

        materialsTotal += componentEmissions;
      }
      explanationMaterialsHumanReadable = `total = ${materialsTotal} kgCO2e`;

      // Manufacturing
      let manufacturingTotal = 0;
      const manufacturingEnergy = modelParameterProvider.get(
        "lifeCycleAnalysisStep/manufacturing/shoes/energyConsumption/electricity",
        modelVersion
      );
      const electricityEmissionFactor = emissionFactorProvider.get(
        "energy/electricity",
        modelVersion,
        manufacturingCountryId
      );
      manufacturingTotal =
        manufacturingEnergy.value * electricityEmissionFactor.value;
      // TECHNICAL-DEBT: not handling/checking units

      const explanationManufacturingHumanReadable = `energy (${
        manufacturingEnergy.value
      } kWh) * electricity intensity for ${electricityEmissionFactor.countryIds.join(
        ", "
      )} (${
        electricityEmissionFactor.value
      } kgCO2e/kWh) = ${manufacturingTotal} kgCO2e`;

      // Distribution
      let distributionTotal = 0;
      const distributionModelParameter = selectDistributionModelParameter(
        modelParameterProvider,
        data.distributionMode,
        modelVersion
      );
      distributionTotal = distributionModelParameter.value;
      // TECHNICAL-DEBT: no handling/checking units

      const explanationDistributionHumanReadable = `${distributionModelParameter.description}: ${distributionModelParameter.value} ${distributionModelParameter.unit}`;

      // Use
      let useTotal = 0;
      useTotal = modelParameterProvider.get(
        "lifeCycleAnalysisStep/use/shoes",
        modelVersion
      ).value;
      // TECHNICAL-DEBT: not handling case where it's missing
      // TECHNICAL-DEBT: not handling/checking unit

      const explanationUseHumanReadable = `"use" step: fixed value = ${useTotal} kgCO2e`;

      // End of life
      let endOfLifeTotal = 0;
      const endOfLifeOption = data.endOfLifeOption;
      let endOfLifeModelParameter: ModelParameterEntity | undefined = undefined;
      let explanationEndOfLifeHumanReadable: string = "";

      if (endOfLifeOption !== "custom") {
        const endOfLifeParameterId = `lifeCycleAnalysisStep/endOfLife/shoes/${endOfLifeOption}`;
        endOfLifeModelParameter = modelParameterProvider.get(
          endOfLifeParameterId,
          modelVersion
        );
        endOfLifeTotal = endOfLifeModelParameter.value;
        explanationEndOfLifeHumanReadable = `${endOfLifeModelParameter.description}: ${endOfLifeModelParameter.value} ${endOfLifeModelParameter.unit}`;
      } else {
        if (!data.endOfLifeValue) {
          throw new Error(
            `unexpected: null "endOfLifeValue" with option="custom"`
          );
        }
        endOfLifeTotal = data.endOfLifeValue;
        explanationEndOfLifeHumanReadable = `Value estimated by the brand according to its own recycling programs for this product: ${data.endOfLifeValue} kgCO2eq`;
      }

      const footprintTotal =
        materialsTotal +
        manufacturingTotal +
        distributionTotal +
        useTotal +
        endOfLifeTotal;
      const explanationTotalHumanReadable = `${footprintTotal} kgCO2e`;
      const explanation: ProductFootprintExplanation = {
        materials: {
          components: explanationMaterialsComponents,
          humanReadable: explanationMaterialsHumanReadable,
        },
        manufacturing: {
          humanReadable: explanationManufacturingHumanReadable,
        },
        distribution: {
          modelParameter: distributionModelParameter,
          humanReadable: explanationDistributionHumanReadable,
        },
        use: {
          humanReadable: explanationUseHumanReadable,
        },
        endOfLife: {
          modelParameter: endOfLifeModelParameter,
          humanReadable: explanationEndOfLifeHumanReadable,
        },
        total: {
          humanReadable: explanationTotalHumanReadable,
        },
      };
      return {
        total: footprintTotal,
        breakdown: {
          materials: materialsTotal,
          manufacturing: manufacturingTotal,
          distribution: distributionTotal,
          use: useTotal,
          endOfLife: endOfLifeTotal,
        },
        explanation,
      };
    };
  };

/**
 * For retro-compatibility, to support model version before 0.4.0 which
 * changed the way the distribution emissions fixed value was selected.
 */
function selectDistributionModelParameter(
  modelParameterProvider: ModelParameterProvider,
  distributionMode: string,
  modelVersion: ModelVersion
) {
  return modelParameterProvider.get(
    `lifeCycleAnalysisStep/distribution/shoes/${distributionMode}`,
    modelVersion
  );
}
