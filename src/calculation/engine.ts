import { ModelParameter, ProductData, ProductFootprint } from "../model/types";

import {
  findEmissionFactorForElectricityWithCountry,
  findEmissionFactorForMaterialWithIdAndCountry,
  findFixedValueForIdAndCountries,
} from "../model/adapters";
import { ModelVersion } from "../lib/types";
import { countryDefault } from "../model/parameters";

export const currentVersion = ModelVersion.version_0_2_0;
export const undefinedMaterialId = "undefined";
export const undefinedCountryId = "undefined";

const undefinedMaterialEmissionFactorId = "unidentified/shoesMix";
// TECHNICAL-DEBT this should probably be a parameter of the template, so we may use specific
// undefined mix' emission factor depending on the category.

export function computeFootprint(productData: ProductData): ProductFootprint {
  const weight = productData.weight;

  const footprint: ProductFootprint = {
    materials: 0,
    manufacturing: 0,
    distribution: 0,
    use: 0,
    endOfLife: 0,
  };

  // Materials
  let identifiedMaterialsProportion: number = 0;
  productData.components.forEach((component) => {
    const emissionFactor: ModelParameter = getEmissionFactor(
      component.materialId === undefinedMaterialId
        ? undefinedMaterialEmissionFactorId
        : component.materialId,
      productData.manufacturingCountry,
      productData.modelVersion,
      true
    );

    const componentEmissions =
      emissionFactor.value * component.proportion * weight;
    footprint.materials += componentEmissions;
    identifiedMaterialsProportion += component.proportion;
    // TECHNICAL-DEBT: not handling emissionFactor.unit
  });

  const unidentifiedMaterialsProportion = 1 - identifiedMaterialsProportion;
  const unidentifiedMaterialsEmissionFactor = getEmissionFactor(
    "unidentified/shoesMix",
    productData.manufacturingCountry,
    productData.modelVersion,
    true
  );
  const unidentifiedMaterialsEmissions =
    unidentifiedMaterialsProportion *
    unidentifiedMaterialsEmissionFactor.value *
    weight;
  footprint.materials += unidentifiedMaterialsEmissions;
  // TECHNICAL-DEBT: not handling emissionFactor.unit

  // Manufacturing
  const manufacturingEnergy =
    findFixedValueForIdAndCountries(
      "lifeCycleAnalysisStep/manufacturing/shoes/energyConsumption/electricity",
      [productData.manufacturingCountry],
      productData.modelVersion
    ) ||
    (findFixedValueForIdAndCountries(
      "lifeCycleAnalysisStep/manufacturing/shoes/energyConsumption/electricity",
      [countryDefault],
      productData.modelVersion
    ) as ModelParameter);

  const electricityEmissionFactor =
    findEmissionFactorForElectricityWithCountry(
      productData.manufacturingCountry
    ) || findEmissionFactorForElectricityWithCountry(countryDefault);
  if (!electricityEmissionFactor) {
    throw new Error(
      `Could not find electricity emission factor for country "${productData.manufacturingCountry}" nor default (${countryDefault})`
    );
  }

  footprint.manufacturing =
    manufacturingEnergy.value * electricityEmissionFactor.value;
  // TECHNICAL-DEBT: not handling/checking units

  // Distribution
  const distributionModelParameter =
    findFixedValueForIdAndCountries(
      "lifeCycleAnalysisStep/distribution/shoes",
      [productData.manufacturingCountry],
      productData.modelVersion
    ) ||
    findFixedValueForIdAndCountries(
      "lifeCycleAnalysisStep/distribution/shoes",
      [countryDefault],
      productData.modelVersion
    );
  if (!distributionModelParameter) {
    throw new Error(
      `Could not find distribution emissions value for country "${productData.manufacturingCountry}" nor default (${countryDefault})`
    );
  }
  footprint.distribution = distributionModelParameter.value;
  // TECHNICAL-DEBT: not handling emissionFactor.unit

  // Use
  footprint.use = findFixedValueForIdAndCountries(
    "lifeCycleAnalysisStep/use/shoes",
    [countryDefault],
    productData.modelVersion
  )!.value;
  // TECHNICAL-DEBT: assumes the parameter is present
  // TECHNICAL-DEBT: not handling modelParameter.unit

  // End of life
  footprint.endOfLife = findFixedValueForIdAndCountries(
    productData.endOfLifeRecyclingProgram
      ? "lifeCycleAnalysisStep/endOfLife/shoes/withRecyclingProgram"
      : "lifeCycleAnalysisStep/endOfLife/shoes/withoutRecyclingProgram",
    [countryDefault],
    productData.modelVersion
  )!.value;

  return footprint;
}

export function footprintTotal(f: ProductFootprint): number {
  return f.materials + f.manufacturing + f.distribution + f.use + f.endOfLife;
}

// TECHNICAL-DEBT: this should probably be moved into findEmissionFactorForMaterialWithIdAndCountry
//   and correctly tested (already got a bug on this).
function getEmissionFactor(
  materialId: string,
  country: string,
  version: ModelVersion,
  acceptDefaultCountry: boolean
): ModelParameter {
  let emissionFactor = findEmissionFactorForMaterialWithIdAndCountry(
    materialId,
    country,
    version
  );
  if (!emissionFactor && acceptDefaultCountry) {
    emissionFactor = findEmissionFactorForMaterialWithIdAndCountry(
      materialId,
      countryDefault,
      version
    );
  }
  if (!emissionFactor) {
    throw new Error(
      `Missing emission factor for materialId "${materialId}", country "${country}" or "${countryDefault}" and version <= "${version}"`
    );
  }
  return emissionFactor;
}
