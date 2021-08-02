import { ProductDataTemplate } from "../model/types";

export const defaultTemplateId = "shoes/sneakers/generic";

export function findTemplateForId(templateId: string): ProductDataTemplate {
  const template = productTemplates.find((pt) => pt.id === templateId);
  if (!template) {
    throw new Error(`Could not find ProductTemplate for id '${templateId}'`);
  }
  return template;
}

export const productTemplates: ProductDataTemplate[] = [
  {
    modelVersion: "0.2.0",
    id: "shoes/sneakers/generic",
    label: "Default (internal)",
    source: "Internal Carbonfact template", // TODO
    weight: 0.7,
    weightSourceUrls: [],
    components: [
      {
        componentId: "upper",
        materialId: "cotton/standard",
        materialSourceUrls: [], // TODO
        proportion: 0.3,
        proportionSourceUrls: [], // TODO
      },
      {
        componentId: "outsole",
        materialId: "rubber/standard",
        materialSourceUrls: [], // TODO
        proportion: 0.55,
        proportionSourceUrls: [], // TODO
      },
    ],
    manufacturingCountry: "china",
    manufacturingCountrySourceUrls: [],
    endOfLifeRecyclingProgram: false,
    endOfLifeRecyclingProgramSourceUrls: [],
  },
  {
    modelVersion: "0.2.0",
    id: "shoes/sneakers/caval_samieco_lca_2021",
    label: "Caval (LCA 2021)",
    source: "Information from Caval's LCA 2021 report produced by Sami.eco",
    weight: 0.7,
    weightSourceUrls: [],
    components: [
      {
        componentId: "upper",
        materialId: "cotton/standard",
        materialSourceUrls: [], // TODO
        proportion: 0.3,
        proportionSourceUrls: [], // TODO
      },
      {
        componentId: "outsole",
        materialId: "rubber/standard",
        materialSourceUrls: [], // TODO
        proportion: 0.55,
        proportionSourceUrls: [], // TODO
      },
      // TODO: complete with other values from the report
    ],
    manufacturingCountry: "china",
    manufacturingCountrySourceUrls: [],
    endOfLifeRecyclingProgram: false,
    endOfLifeRecyclingProgramSourceUrls: [],
  },
];
