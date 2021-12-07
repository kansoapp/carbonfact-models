import { PartialProductDataEntity } from "../entities/PartialProductDataEntity";
import { ComputeProductFootprintOperation } from "../operations/compute-product-footprint";
import { ExpandPartialProductDataEntityOperation } from "../operations/expand-partial-product-data";
import { ModelVersion } from "../types";
import { ProductFootprintEntity } from "../entities/ProductFootprintEntity";
import {
  buildGeographicalAreaProvider,
  IGeographicalAreaProvider,
} from "../providers/geographical-area";
import {
  buildEmissionFactorProvider,
  EmissionFactorProvider,
} from "../providers/emission-factor-provider";
import {
  buildModelParameterProvider,
  ModelParameterProvider,
} from "../providers/model-parameter-provider";
import {
  buildProductDataTemplateProvider,
  IProductDataTemplateProvider,
} from "../providers/product-data-template-provider";
import { ProductDataEntity } from "../entities/ProductDataEntity";

export interface IGetFootprintOperation {
  forProductData: (
    productData: ProductDataEntity,
    modelVersion?: ModelVersion
  ) => ProductFootprintEntity;

  forPartialProductData: (
    partial: PartialProductDataEntity,
    templateId: string,
    modelVersion?: ModelVersion
  ) => ProductFootprintEntity;

  forProductCategory: (
    categorySlug: string,
    modelVersion?: ModelVersion
  ) => ProductFootprintEntity;
}

const defaultEmissionFactorProvider: EmissionFactorProvider =
  buildEmissionFactorProvider();
const defaultModelParameterProvider: ModelParameterProvider =
  buildModelParameterProvider();
const defaultProductDataTemplateProvider: IProductDataTemplateProvider =
  buildProductDataTemplateProvider();
const defaultGeographicalAreaProvider: IGeographicalAreaProvider =
  buildGeographicalAreaProvider();

export function buildGetFootprintOperation(
  emissionFactorProvider: EmissionFactorProvider = defaultEmissionFactorProvider,
  modelParameterProvider: ModelParameterProvider = defaultModelParameterProvider,
  productDataTemplateProvider: IProductDataTemplateProvider = defaultProductDataTemplateProvider,
  geographicalAreaProvider: IGeographicalAreaProvider = defaultGeographicalAreaProvider
): IGetFootprintOperation {
  const compute = ComputeProductFootprintOperation(
    emissionFactorProvider,
    modelParameterProvider
  );
  const expand = ExpandPartialProductDataEntityOperation(
    productDataTemplateProvider,
    geographicalAreaProvider
  );

  return {
    forProductData: (
      productData: ProductDataEntity,
      modelVersion: ModelVersion = ModelVersion.current
    ) => {
      return compute(productData, modelVersion);
    },

    forPartialProductData: (
      partialData: PartialProductDataEntity,
      templateId: string,
      modelVersion: ModelVersion = ModelVersion.current
    ) => {
      const data = expand(partialData, templateId, modelVersion);
      return compute(data, modelVersion);
    },

    forProductCategory: (
      categorySlug: string,
      modelVersion: ModelVersion = ModelVersion.current
    ) => {
      const categoryTemplateId = (() => {
        switch (categorySlug) {
          case "shoes":
          case "sneakers":
            return "shoes/sneakers/generic";
          default:
            return `shoes/sneakers/${categorySlug}`;
        }
      })();
      const data = expand({}, categoryTemplateId, modelVersion);
      return compute(data, modelVersion);
    },
  };
}
