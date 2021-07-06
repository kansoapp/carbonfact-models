import {
  findCountryForId,
  findEmissionFactorForElectricityWithCountry,
  findEmissionFactorForMaterialWithId,
  findEmissionsForTransportOfShoesFromCountry,
  findModelParameter,
  ModelParameter,
} from "./modelParameters";

export interface ProductFootprint {
  materials: number;
  manufacturing: number;
  transport: number;
  use: number;
  endOfLife: number;
}

export interface ProductData {
  weight: number;
  weightSourceUrls: string[];
  components: {
    materialId: string;
    materialSourceUrls: string[];
    proportion: number;
    proportionSourceUrls: string[];
  }[];
  manufacturingCountry: string;
  manufacturingCountrySourceUrls: string[];
  endOfLifeRecyclingProgram: boolean;
  endOfLifeRecyclingProgramSourceUrls: string[];
}

export function computeFootprint(productData: ProductData): ProductFootprint {
  const weight = productData.weight;
  const manufacturingEnergy = findModelParameter(
    "lifeCycleAnalysisStep/manufacturing/shoes/energyConsumption/electricity"
  ) as ModelParameter;

  const footprint: ProductFootprint = {
    materials: 0,
    manufacturing: 0,
    transport: 0,
    use: 0,
    endOfLife: 0,
  };

  // Materials

  let identifiedMaterialsProportion: number = 0;
  productData.components.forEach((component) => {
    const emissionFactor = findEmissionFactorForMaterialWithId(
      component.materialId
    );
    if (!emissionFactor) return NaN;

    footprint.materials += emissionFactor.value * component.proportion * weight;
    identifiedMaterialsProportion += component.proportion;
    // TECHNICAL-DEBT: not handling emissionFactor.unit
  });

  const unidentifiedMaterialsProportion = 1 - identifiedMaterialsProportion;
  const unidentifiedMaterialsEmissionFactor =
    findEmissionFactorForMaterialWithId("unidentified/shoesMix");
  if (!unidentifiedMaterialsEmissionFactor) {
    throw new Error(
      'Missing emission factor for materialId "unidentified/shoesMix"'
    );
  }
  footprint.materials +=
    unidentifiedMaterialsProportion *
    unidentifiedMaterialsEmissionFactor.value *
    weight;
  // TECHNICAL-DEBT: not handling emissionFactor.unit

  footprint.manufacturing =
    manufacturingEnergy.value *
    findEmissionFactorForElectricityWithCountry(
      productData.manufacturingCountry
    ).value;
  // TECHNICAL-DEBT: not handling emissionFactor.unit

  footprint.use = findModelParameter("lifeCycleAnalysisStep/use/shoes")!.value;
  // TECHNICAL-DEBT: assumes the parameter is present
  // TECHNICAL-DEBT: not handling modelParameter.unit

  footprint.transport = findEmissionsForTransportOfShoesFromCountry(
    productData.manufacturingCountry
  ).value;
  // TECHNICAL-DEBT: not handling emissionFactor.unit

  footprint.endOfLife = findModelParameter(
    productData.endOfLifeRecyclingProgram
      ? "lifeCycleAnalysisStep/endOfLife/shoes/withRecyclingProgram"
      : "lifeCycleAnalysisStep/endOfLife/shoes/withoutRecyclingProgram"
  )!.value;

  return footprint;
}

export function footprintTotal(f: ProductFootprint): number {
  return f.materials + f.manufacturing + f.transport + f.use + f.endOfLife;
}

/**
 * This function returns the label for a given product
 * data item key (e.g. `weight`, `primary_material`).
 */
export function productDataLabel(key: string): string | undefined {
  const mapping: { [key: string]: string } = {
    weight: "Weight",
    primary_material: "Primary Material",
    primary_material_proportion: "Primary Material Proportion",
    secondary_material: "Secondary Material",
    secondary_material_proportion: "Secondary Material Proportion",
    manufacturing_country: "Manufacturing Country",
    endOfLifeRecyclingProgram: "End-of-life Recycling Program",
  };
  return mapping[key];
}

export function productDataDisplayValue(
  productData: ProductData,
  key: string
): string {
  switch (key) {
    case "weight":
      return `${productData.weight} kg`;

    case "primary_material":
      return displayValueForMaterialId(productData.components[0].materialId);

    case "primary_material_proportion":
      return `${productData.components[0].proportion * 100} %`;

    case "secondary_material":
      return displayValueForMaterialId(productData.components[1].materialId);

    case "secondary_material_proportion":
      return `${productData.components[1].proportion * 100} %`;

    case "manufacturing_country":
      return displayValueForCountry(productData.manufacturingCountry);

    case "endOfLifeRecyclingProgram":
      return productData.endOfLifeRecyclingProgram ? "Yes" : "No";

    default:
      throw new Error(`Missing ${key} item for ProductData "${productData}`);
  }
}

export function productDataItemSource(
  productData: ProductData,
  key: string
): string {
  switch (key) {
    case "weight":
      return productData.weightSourceUrls[0];

    case "primary_material":
      return productData.components[0].materialSourceUrls[0];

    case "primary_material_proportion":
      return productData.components[0].proportionSourceUrls[0];

    case "secondary_material":
      return productData.components[1].materialSourceUrls[0];

    case "secondary_material_proportion":
      return productData.components[1].proportionSourceUrls[0];

    case "manufacturing_country":
      return productData.manufacturingCountrySourceUrls[0];

    case "endOfLifeRecyclingProgram":
      return productData.endOfLifeRecyclingProgramSourceUrls[0];

    default:
      throw new Error(`Missing ${key} item for ProductData "${productData}`);
  }
}

/**
 * Returns the keys of the flattened data items in the passed
 * product data.
 *
 * Components are nested in `productData.components` and are returned
 * flattened as `primary_material` and `secondary_material`.
 *
 * @param productData the product data to extract the data items from
 *   (not used yet as we only have a single type of ProductData objects,
 *   for shoes).
 */
export function productDataItemKeys(productData: ProductData): string[] {
  return [
    "weight",
    "primary_material",
    "primary_material_proportion",
    "secondary_material",
    "secondary_material_proportion",
    "manufacturing_country",
    "endOfLifeRecyclingProgram",
  ];
}

function displayValueForMaterialId(materialId: string): string {
  const emissionFactor = findEmissionFactorForMaterialWithId(materialId);
  if (!emissionFactor) return "Unknown";
  return emissionFactor.label;
}

function displayValueForCountry(countryId: string): string {
  const countryEntity = findCountryForId(countryId);
  return countryEntity ? countryEntity.label : "Unknown";
}
