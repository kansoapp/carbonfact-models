import { compare } from "../lib/sorting";
import { productDataTemplates } from "../data/productDataTemplates";
import { ModelVersion } from "../types";
import { ProductDataTemplateEntity } from "../entities/ProductDataTemplateEntity";

export const defaultTemplateId = "shoes/sneakers/generic";

export interface IProductDataTemplateProvider {
  get: (id: string, modelVersion: ModelVersion) => ProductDataTemplateEntity;
  allIdAndLabel: (
    modelVersion: ModelVersion
  ) => { id: string; label: string }[];
}

export function buildProductDataTemplateProvider(): IProductDataTemplateProvider {
  return {
    get: (id: string, modelVersion: ModelVersion) => {
      const matchingTemplates = productDataTemplates.filter(
        (pt) => pt.id === id && pt.modelVersion <= modelVersion
      );
      if (matchingTemplates.length === 0) {
        throw new Error(
          `no template with id "${id}" and model <= ${modelVersion}`
        );
      }
      matchingTemplates.sort((t1, t2) =>
        compare<string>(t1.modelVersion, t2.modelVersion, "desc")
      );
      return matchingTemplates[0];
    },

    allIdAndLabel: (modelVersion: ModelVersion) => {
      return productDataTemplates.map((t) => ({ id: t.id, label: t.label }));
    },
  };
}
