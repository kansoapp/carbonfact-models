import { ProductDataTemplateEntity } from "../entities/ProductDataTemplateEntity";
import { ModelVersion } from "../types";

export const productDataTemplates: ProductDataTemplateEntity[] = [
  {
    id: "shoes/sneakers/generic",
    label: "Default (internal)",
    source: "Internal Carbonfact template", // TODO
    modelVersion: ModelVersion.version_0_1_0,
    productCategoryId: "shoes/sneakers",
    weight: 0.7,
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "cotton/standard",
            proportion: 1.0,
          },
        ],
        materialCountryId: "china",
        proportion: 0.3,
      },
      {
        componentId: "outsole",
        materials: [
          {
            materialId: "rubber/standard",
            proportion: 1.0,
          },
        ],
        materialCountryId: "china",
        proportion: 0.55,
      },
    ],
    manufacturingCountryId: "china",
    endOfLifeRecyclingProgram: false, // TECHNICAL-DEBT to be removed after migration of existing data
    endOfLifeOption: "withoutRecyclingProgram",
    endOfLifeValue: null,
  },
  {
    id: "shoes/sneakers/caval_samieco_lca_2021",
    label: "Caval (LCA 2021)",
    source: "Information from Caval's LCA 2021 report produced by Sami.eco",
    modelVersion: ModelVersion.version_0_2_0,
    productCategoryId: "shoes/sneakers",
    weight: 0.7,
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "cotton/standard",
            proportion: 1.0,
          },
        ],
        materialCountryId: "china",
        proportion: 0.3,
      },
      {
        componentId: "outsole",
        materials: [
          {
            materialId: "rubber/standard",
            proportion: 1.0,
          },
        ],
        materialCountryId: "china",
        proportion: 0.55,
      },
      // TODO: complete with other values from the report
    ],
    manufacturingCountryId: "china",
    endOfLifeRecyclingProgram: false,
    endOfLifeOption: "withoutRecyclingProgram",
    endOfLifeValue: null,
  },
];
