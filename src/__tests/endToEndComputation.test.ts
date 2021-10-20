import { PartialProductDataEntity } from "../entities/PartialProductDataEntity";
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

/**
 * This tests the computation from end to end, using the real
 * ModelParameter and EmissionFactor providers.
 */
const computeProductFootprint = ComputeProductFootprintOperation(
  EmissionFactorProvider,
  ModelParameterProvider
);
const expandProductData = ExpandPartialProductDataEntityOperation(
  ProductDataTemplateProvider,
  LegacyGeographicalAreaProvider()
);

/**
 * This tests the computation from end-to-end for an older version of the model
 * still works and the result is not changed.
 *
 * This is necessary for now because product page displays the computed footprint
 * using the model version specified in the latest data submission, so the engine
 * must still be able to compute it correctly.
 *
 * This may be a decision that changes in the future, were we can decide to roll-out
 * a new version of the model and ensure all footprints will be computed with this
 * version.
 */
test("Nike Tanjun with model 0.2.1 is correct", () => {
  const partialProductDataEntity: PartialProductDataEntity = {
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "nylon/standard",
            proportion: 1.0,
          },
        ],
      },
      {
        componentId: "outsole",
        materials: [
          {
            materialId: "eva/standard",
            proportion: 1.0,
          },
        ],
      },
    ],
    manufacturingCountryId: "china",
    endOfLifeRecyclingProgram: false,
  };
  const productDataEntity = expandProductData(
    partialProductDataEntity,
    defaultTemplateId,
    ModelVersion.version_0_2_1
  );
  console.log(productDataEntity);
  const footprint = computeProductFootprint(
    productDataEntity,
    ModelVersion.version_0_2_1
  );
  expect(footprint.materials).toBeCloseTo(23.977);
  expect(footprint.manufacturing).toBeCloseTo(3.6);
  expect(footprint.distribution).toBeCloseTo(1.053);
  expect(footprint.use).toBeCloseTo(0);
  expect(footprint.endOfLife).toBeCloseTo(1.4);
});

test("Adidas UltraBoost 21 with model 0.4.0 is correct", () => {
  const partialProductDataEntity: PartialProductDataEntity = {
    weight: 0.71,
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "polyester/standard",
            proportion: 1.0,
          },
        ],
        proportion: (0.047 * 2) / 0.71, // formula in LCA shoes Google Sheet
      },
      {
        componentId: "outsole",
        materials: [
          {
            materialId: "rubber/synthetic",
            proportion: 1.0,
          },
        ],
        proportion: (0.246 * 2) / 0.71, // formula in LCA shoes Google Sheet
      },
    ],
    manufacturingCountryId: "vietnam",
    endOfLifeRecyclingProgram: false,
  };
  const productDataEntity = expandProductData(
    partialProductDataEntity,
    defaultTemplateId,
    ModelVersion.version_0_4_0
  );
  console.log(productDataEntity);
  const footprint = computeProductFootprint(
    productDataEntity,
    ModelVersion.version_0_4_0
  );
  expect(footprint.materials).toBeCloseTo(4.458);
  expect(footprint.manufacturing).toBeCloseTo(4.892);
  expect(footprint.distribution).toBeCloseTo(1.053);
  expect(footprint.use).toBeCloseTo(0);
  expect(footprint.endOfLife).toBeCloseTo(1.4);
});
