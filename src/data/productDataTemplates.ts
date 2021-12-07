import { ProductDataTemplateEntity } from "../entities/ProductDataTemplateEntity";
import { ModelVersion } from "../types";

export const productDataTemplates: ProductDataTemplateEntity[] = [
  {
    id: "shoes/sneakers/generic",
    label: "Default (internal)",
    source: "Internal Carbonfact template",
    modelVersion: ModelVersion.version_0_1_0,
    productCategorySlug: "sneakers",
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
            materialId: "rubber/undetermined",
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
    id: "shoes/sneakers/sneakers-leather",
    label: "Sneakers Leather - Reference model",
    source: "Internal Carbonfact template",
    modelVersion: ModelVersion.version_0_4_2,
    productCategorySlug: "sneakers-leather",
    weight: 0.7,
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "leather/cattle",
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
            materialId: "eva/standard",
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
    id: "shoes/sneakers/sneakers-plastic",
    label: "Sneakers Plastic - Reference model",
    source: "Internal Carbonfact template",
    modelVersion: ModelVersion.version_0_4_2,
    productCategorySlug: "sneakers-plastic",
    weight: 0.7,
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "polyester/standard",
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
            materialId: "eva/standard",
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
    id: "shoes/sneakers/sneakers-natural-fiber",
    label: "Sneakers Natural Fiber - Reference model",
    source: "Internal Carbonfact template",
    modelVersion: ModelVersion.version_0_4_2,
    productCategorySlug: "sneakers-natural-fiber",
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
            materialId: "eva/standard",
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
  // TECHNICAL-DEBT: should be removed (requires to migrate submissions using this template)
  {
    id: "shoes/sneakers/caval_samieco_lca_2021",
    label: "Caval (LCA 2021)",
    source: "Information from Caval's LCA 2021 report produced by Sami.eco",
    modelVersion: ModelVersion.version_0_2_0,
    productCategorySlug: "sneakers",
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
            materialId: "rubber/undetermined",
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
