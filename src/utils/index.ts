import { PartialProductDataEntity } from "../entities/PartialProductDataEntity";
import { ProductFootprintEntity } from "../entities/ProductFootprintEntity";
import { ComputeProductFootprintOperation } from "../operations/ComputeProductFootprint";
import { ExpandPartialProductDataEntityOperation } from "../operations/ExpandPartialProductData";
import { EmissionFactorProvider } from "../providers/EmissionFactorProvider";
import { LegacyGeographicalAreaProvider } from "../providers/geographical-area/legacy";
import { ModelParameterProvider } from "../providers/ModelParameterProvider";
import {
  defaultTemplateId,
  ProductDataTemplateProvider,
} from "../providers/ProductDataTemplateProvider";
import { ModelVersion } from "../types";

const compute = ComputeProductFootprintOperation(
  EmissionFactorProvider,
  ModelParameterProvider
);

const expand = ExpandPartialProductDataEntityOperation(
  ProductDataTemplateProvider,
  LegacyGeographicalAreaProvider()
);

/**
 * This is simply sugar syntax to reduce the boilerplate
 * to expand partial product data and compute the footprint.
 *
 * It instantiates carbon model operations using the standard
 * providers.
 *
 * @param partial `PartialProductDataEntity`
 * @param modelVersion `ModelVersion` (optional, defaults to `ModelVersion.current`)
 * @param templateId `string` (optional, defaults to `defaultTemplateId`)
 *
 */
export function defaultExpandAndCompute(
  partial: PartialProductDataEntity,
  modelVersion = ModelVersion.current,
  templateId = defaultTemplateId
): ProductFootprintEntity {
  const expanded = expand(partial, templateId, modelVersion);
  const footprint = compute(expanded, modelVersion);
  return footprint;
}
