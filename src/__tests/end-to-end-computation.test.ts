import { buildGetFootprintOperation } from "../operations/get-footprint";
import { PartialProductDataEntity } from "../entities/PartialProductDataEntity";
import { defaultTemplateId } from "../providers/product-data-template-provider";
import { ModelVersion } from "../types";

/**
 * This tests the computation from end to end, using the real
 * ModelParameter and EmissionFactor providers.
 */
const getFootprintOperation = buildGetFootprintOperation();

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
test("Nike Tanjun with model 0.5.0 is correct", () => {
  const partial: PartialProductDataEntity = {
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
  const footprint = getFootprintOperation.forPartialProductData(
    partial,
    defaultTemplateId,
    ModelVersion.version_0_5_0
  );
  expect(footprint.breakdown.materials).toBeCloseTo(23.977);
  expect(footprint.breakdown.manufacturing).toBeCloseTo(3.33);
  expect(footprint.breakdown.distribution).toBeCloseTo(1.053);
  expect(footprint.breakdown.use).toBeCloseTo(0);
  expect(footprint.breakdown.endOfLife).toBeCloseTo(1.4);
});

test("Adidas UltraBoost 21 with model 0.5.0 is correct", () => {
  const partial: PartialProductDataEntity = {
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
  const footprint = getFootprintOperation.forPartialProductData(
    partial,
    defaultTemplateId,
    ModelVersion.version_0_5_0
  );
  expect(footprint.breakdown.materials).toBeCloseTo(5.83985);
  expect(footprint.breakdown.manufacturing).toBeCloseTo(4.892);
  expect(footprint.breakdown.distribution).toBeCloseTo(1.053);
  expect(footprint.breakdown.use).toBeCloseTo(0);
  expect(footprint.breakdown.endOfLife).toBeCloseTo(1.4);
});
