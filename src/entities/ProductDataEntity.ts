export const ProductComponentId = {
  insole: "insole",
  outsole: "outsole",
  lining: "lining",
  laces: "laces",
  upper: "upper",
  sides: "sides",
  other: "other",
} as const;

export type ProductComponentId =
  typeof ProductComponentId[keyof typeof ProductComponentId];

// TECHNICAL-DEBT type duplication with PartialProductDataEntity
// maybe could DRY it using type composition.

/**
 * ProductDataEntity represents the data used to perform the
 * footprint computation.
 *
 * ### Rules
 *
 * - No optional value: if optional values are needed, `PartialProductDataEntity`
 *   must be used instead. Prior to perform the computation,
 *   `ExpandPartialProductData` operation must be used to expand the data
 *   into a `ProductDataEntity`.
 */

export type MaterialItem = {
  materialId: string;
  proportion: number;
};

export type ProductDataEntityComponent = {
  componentId: ProductComponentId;
  materials: MaterialItem[];
  materialCountryId: string;
  proportion: number;
};

export type ProductDataEntity = {
  weight: number;
  components: ProductDataEntityComponent[];
  manufacturingCountryId: string;
  distributionMode: string;

  // End-of-life
  endOfLifeRecyclingProgram?: boolean; // DEPRECATED, replaced by endOfLifeOption and  endOfLifeValue

  endOfLifeOption: string | "custom";
  // An option to select the model parameter to apply for the EOL emissions.
  // This should match model parameters with path starting with
  // `fixedValue/lifeCycleAnalysisStep/endOfLife/<productCategory>`, e.g.
  // `withoutRecyclingProgram`.
  // If "custom" is used, then `endOfLifeCustomValue` must be not null.

  endOfLifeValue: number | null;
  // A custom value for the EOL emissions (in kgCO2eq) to be set when
  // `endOfLifeOption` is "custom".
};
