import { countryDefault } from "../data/parameters";
import { EmissionFactorEntity } from "../entities/EmissionFactorEntity";
import { ModelParameterEntity } from "../entities/ModelParameterEntity";
import { ProductDataEntity } from "../entities/ProductDataEntity";
import {
  ProductFootprintEntity,
  ProductFootprintExplanation,
  productFootprintTotal,
} from "../entities/ProductFootprintEntity";
import { ModelVersion } from "../types";
import { checkDataValidity } from "./ExpandPartialProductData";

export interface IEmissionFactorProvider {
  /**
   * Returns the emission factor corresponding to the `id` and
   * `country`, whose version is the maximum available one lower
   * than `version`.
   *
   * If there is no match for the specified `country` but the emission
   * factor exists for "world", this one is returned.
   *
   * Throws an error when the emission factor could not be found.
   */
  get: (
    id: string,
    country: string,
    version: ModelVersion
  ) => EmissionFactorEntity;
}

export interface IModelParameterProvider {
  get: (
    id: string,
    countryId: string,
    version: ModelVersion
  ) => ModelParameterEntity;
}

type ComputeProductFootprintOperation = (
  emissionFactorProvider: IEmissionFactorProvider,
  modelParameterProvider: IModelParameterProvider
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
    emissionFactorProvider: IEmissionFactorProvider,
    modelParameterProvider: IModelParameterProvider
  ) => {
    return (data: ProductDataEntity, modelVersion: ModelVersion) => {
      checkDataValidity(data);

      const { weight, manufacturingCountryId } = data;

      const footprint: ProductFootprintEntity = {
        materials: 0,
        manufacturing: 0,
        distribution: 0,
        use: 0,
        endOfLife: 0,
      };

      // Materials
      // ---------
      const explanationMaterialsComponents: ProductFootprintExplanation["materials"]["components"] =
        [];
      let explanationMaterialsHumanReadable = "";
      for (const component of data.components) {
        // Adding the emissions for each component of the product.

        let componentWeight = component.proportion * weight;
        let componentEmissions = 0.0;

        const explanationMaterialItems: any[] = [];
        for (const materialItem of component.materials) {
          // Adding the emissions for each material of the component.
          // TECHNICAL-DEBT check sum of components.materials.proportion <= 1.0

          const emissionFactor = emissionFactorProvider.get(
            "material/" + materialItem.materialId,
            component.materialCountryId,
            modelVersion
          );

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

        footprint.materials += componentEmissions;
      }
      explanationMaterialsHumanReadable = `total = ${footprint.materials} kgCO2e`;

      // Manufacturing
      const manufacturingEnergy = modelParameterProvider.get(
        "lifeCycleAnalysisStep/manufacturing/shoes/energyConsumption/electricity",
        manufacturingCountryId,
        modelVersion
      );
      const electricityEmissionFactor = emissionFactorProvider.get(
        "energy/electricity",
        manufacturingCountryId,
        modelVersion
      );
      footprint.manufacturing =
        manufacturingEnergy.value * electricityEmissionFactor.value;
      // TECHNICAL-DEBT: not handling/checking units

      const explanationManufacturingHumanReadable = `energy (${manufacturingEnergy.value} kWh) * electricity intensity (${electricityEmissionFactor.value} kgCO2e/kWh) = ${footprint.manufacturing} kgCO2e`;

      // Distribution
      const distributionModelParameter = selectDistributionModelParameter(
        modelParameterProvider,
        data.distributionMode,
        manufacturingCountryId,
        modelVersion
      );
      footprint.distribution = distributionModelParameter.value;
      // TECHNICAL-DEBT: no handling/checking units

      const explanationDistributionHumanReadable = `${distributionModelParameter.description}: ${distributionModelParameter.value} ${distributionModelParameter.unit}`;

      // Use
      footprint.use = modelParameterProvider.get(
        "lifeCycleAnalysisStep/use/shoes",
        countryDefault,
        modelVersion
      ).value;
      // TECHNICAL-DEBT: not handling case where it's missing
      // TECHNICAL-DEBT: not handling/checking unit

      const explanationUseHumanReadable = `fixed value for ${countryDefault} = ${footprint.use}`;

      // End of life
      const endOfLifeOption = data.endOfLifeOption;
      let endOfLifeModelParameter: ModelParameterEntity | undefined = undefined;
      let explanationEndOfLifeHumanReadable: string = "";

      if (endOfLifeOption !== "custom") {
        const endOfLifeParameterId = `lifeCycleAnalysisStep/endOfLife/shoes/${endOfLifeOption}`;
        endOfLifeModelParameter = modelParameterProvider.get(
          endOfLifeParameterId,
          manufacturingCountryId,
          modelVersion
        );
        footprint.endOfLife = endOfLifeModelParameter.value;
        explanationEndOfLifeHumanReadable = `${endOfLifeModelParameter.description}: ${endOfLifeModelParameter.value} ${endOfLifeModelParameter.unit}`;
      } else {
        if (!data.endOfLifeValue) {
          throw new Error(
            `unexpected: null "endOfLifeValue" with option="custom"`
          );
        }
        footprint.endOfLife = data.endOfLifeValue;
        explanationEndOfLifeHumanReadable = `Value estimated by the brand according to its own recycling programs for this product: ${data.endOfLifeValue} kgCO2eq`;
      }

      const explanationTotalHumanReadable = `${productFootprintTotal(
        footprint
      )} kgCO2e`;

      footprint.explanation = {
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
      return footprint;
    };
  };

/**
 * For retro-compatibility, to support model version before 0.4.0 which
 * changed the way the distribution emissions fixed value was selected.
 */
function selectDistributionModelParameter(
  modelParameterProvider: IModelParameterProvider,
  distributionMode: string,
  manufacturingCountryId: string,
  modelVersion: ModelVersion
) {
  if (modelVersion < ModelVersion.version_0_4_0) {
    return modelParameterProvider.get(
      `lifeCycleAnalysisStep/distribution/shoes`,
      manufacturingCountryId,
      modelVersion
    );
  } else {
    return modelParameterProvider.get(
      `lifeCycleAnalysisStep/distribution/shoes/${distributionMode}`,
      manufacturingCountryId,
      modelVersion
    );
  }
}
