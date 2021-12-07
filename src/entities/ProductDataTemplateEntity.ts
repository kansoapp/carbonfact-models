import { ModelVersion } from "../types";
import { ProductDataEntity } from "./ProductDataEntity";

export interface ProductDataTemplateEntity
  extends Omit<ProductDataEntity, "distributionMode"> {
  // See doc/expansion.md to know why "distributionMode" is omitted.

  id: string; // referenced by ProductDataSubmission.templateId
  label: string; // to be displayed in UI
  source: string; // explains how the template was constructed and/or gives the sources
  productCategorySlug: string; // uniquely identifies the product category this template applies to

  /**
   * The version of the model this parameter is associated with.
   * A template should be selected so that it's `modelVersion` is
   * the maximum that is less than or equal to the version of the model
   * being calculated.
   *
   * For example:
   * - We want to calculate for model v0.2.1.
   * - The template exists in versions v0.1.0, v0.2.0, v0.3.0.
   * - The version v0.2.0 should be selected.
   */
  modelVersion: ModelVersion;
}
