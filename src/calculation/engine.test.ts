import { computeFootprint, footprintTotal } from "./engine";
import {
  ProductData,
  ProductDataPartial,
  ProductFootprint,
  ProductDataTemplate,
} from "../model/types";
import { expandProductDataPartialWithTemplate } from "./templating";
import { ModelVersion } from "../lib/types";

const testProductDataPartial_1_AdidasStanSmith: ProductDataPartial = {
  // Adidas Stan Smith
  modelVersion: ModelVersion.version_0_2_0,
  templateId: "testTemplate",
  weight: 0.748,
  weightSourceUrls: [],
  components: [
    {
      componentId: "upper",
      materialId: "polyester/recycled",
      materialSourceUrls: [],
    },
    {
      componentId: "outsole",
      materialId: "rubber/natural",
      materialSourceUrls: [],
    },
  ],
  endOfLifeRecyclingProgram: false,
};

const testProductDataPartial_2_NikeTanjun: ProductDataPartial = {
  // Nike Tanjun
  modelVersion: ModelVersion.version_0_2_0,
  templateId: "testTemplate",
  weight: 0.7,
  weightSourceUrls: [],
  components: [
    {
      componentId: "upper",
      materialId: "nylon/standard",
      materialSourceUrls: [],
    },
    {
      componentId: "outsole",
      materialId: "eva/standard",
      materialSourceUrls: [],
    },
  ],
};

// Manual expansion of testProductDataPartial_1
const testProductData_1: ProductData = {
  modelVersion: ModelVersion.version_0_2_0,
  weight: testProductDataPartial_1_AdidasStanSmith.weight!,
  weightSourceUrls: [],
  components: [
    {
      componentId: "upper",
      materialId: "polyester/recycled",
      materialSourceUrls: [] as string[],
      proportion: 0.3,
      proportionSourceUrls: [] as string[],
    },
    {
      componentId: "outsole",
      materialId: "rubber/natural",
      materialSourceUrls: [] as string[],
      proportion: 0.55,
      proportionSourceUrls: [] as string[],
    },
  ],
  manufacturingCountry: "china",
  manufacturingCountrySourceUrls: [] as string[],
  endOfLifeRecyclingProgram: false,
  endOfLifeRecyclingProgramSourceUrls: [] as string[],
};

const testTemplate: ProductDataTemplate = {
  ...testProductData_1,
  id: "testTemplateId",
  source: "test template source",
  label: "test template label",
  weight: 0.7, // testProductData_1 has not the template's weight
};

test("computeFootprint for ProductData", () => {
  const resultFootprint = computeFootprint(testProductData_1);
  expect(resultFootprint.materials).toBeCloseTo(6.87);
  expect(resultFootprint.manufacturing).toBeCloseTo(3.6);
  expect(resultFootprint.distribution).toBeCloseTo(1.05381);
  expect(resultFootprint.use).toBeCloseTo(0);
  expect(resultFootprint.endOfLife).toBeCloseTo(1.4);
});

test("computeFootprint for expanded ProductDataPartial should match the one for ProductData", () => {
  const resultFootprint = computeFootprint(
    expandProductDataPartialWithTemplate(
      testProductDataPartial_1_AdidasStanSmith,
      testTemplate
    )
  );
  expect(resultFootprint.materials).toBeCloseTo(6.87);
  expect(resultFootprint.manufacturing).toBeCloseTo(3.6);
  expect(resultFootprint.distribution).toBeCloseTo(1.05381);
  expect(resultFootprint.use).toBeCloseTo(0);
  expect(resultFootprint.endOfLife).toBeCloseTo(1.4);
});

test("computeFootprint for model version 0.1.0 should use the correct model parameters", () => {
  const productData = expandProductDataPartialWithTemplate(
    testProductDataPartial_1_AdidasStanSmith,
    testTemplate
  );
  productData.modelVersion = ModelVersion.version_0_1_0;
  const resultFootprint = computeFootprint(productData);
  expect(resultFootprint.materials).toBeCloseTo(6.87);
  expect(resultFootprint.manufacturing).toBeCloseTo(3.6);
  expect(resultFootprint.distribution).toBeCloseTo(2);
  expect(resultFootprint.use).toBeCloseTo(1.5);
  expect(resultFootprint.endOfLife).toBeCloseTo(1.4);
});

test("footprintTotal is the sum of the footprint's parts", () => {
  const footprint: ProductFootprint = {
    materials: 1.1,
    manufacturing: 1.2,
    distribution: 1.3,
    use: 1.4,
    endOfLife: 1.5,
  };
  expect(footprintTotal(footprint)).toBeCloseTo(6.5);
});

test("calculate footprint result for ProductDataPartial_1", () => {
  const footprint = computeFootprint(
    expandProductDataPartialWithTemplate(
      testProductDataPartial_1_AdidasStanSmith,
      testTemplate
    )
  );
  expect(footprint.materials).toBeCloseTo(6.87);
  expect(footprint.manufacturing).toBeCloseTo(3.6);
  expect(footprint.distribution).toBeCloseTo(1.05381);
  expect(footprint.use).toBeCloseTo(0);
  expect(footprint.endOfLife).toBeCloseTo(1.4);
  expect(footprintTotal(footprint)).toBeCloseTo(12.92381);
});

test("calculate footprint result for ProductDataPartial_2", () => {
  const footprint = computeFootprint(
    expandProductDataPartialWithTemplate(
      testProductDataPartial_2_NikeTanjun,
      testTemplate
    )
  );
  expect(footprintTotal(footprint)).toBeCloseTo(30.03181);
});
