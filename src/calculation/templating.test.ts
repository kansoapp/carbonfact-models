import {
  ProductData,
  ProductDataPartial,
  ProductDataTemplate,
} from "../model/types";
import { expandProductDataPartialWithTemplate } from "./templating";

const testProductData: ProductData = {
  modelVersion: "n/d",
  weight: 0.8,
  weightSourceUrls: ["weightUrl1", "weightUrl2"],
  components: [
    {
      componentId: "insole",
      materialId: "eva",
      materialSourceUrls: ["insoleMaterialUrl1"],
      proportion: 0.1,
      proportionSourceUrls: ["insoleProportionUrl1"],
    },
    {
      componentId: "outsole",
      materialId: "rubber",
      materialSourceUrls: ["outsoleMaterialUrl1"],
      proportion: 0.55,
      proportionSourceUrls: ["outsoleProportionUrl1"],
    },
    {
      componentId: "upper",
      materialId: "cotton",
      materialSourceUrls: ["outsoleMaterialUrl1"],
      proportion: 0.3,
      proportionSourceUrls: ["outsoleProportionUrl1"],
    },
  ],
  manufacturingCountry: "china",
  manufacturingCountrySourceUrls: ["manufacturingCountryUrl1"],
  endOfLifeRecyclingProgram: false,
  endOfLifeRecyclingProgramSourceUrls: [],
};

const template: ProductDataTemplate = {
  id: "testTemplate",
  label: "test template",
  source: "test template",
  ...testProductData,
};

test("expanding an empty ProductDataPartial fills all values with the ones from the template except `id`, `label` and `source` fields", () => {
  const partial: ProductDataPartial = {
    modelVersion: "n/d",
    templateId: "testTemplate",
  };
  const result: ProductData = expandProductDataPartialWithTemplate(
    partial,
    template
  );
  const expectedData = { ...template } as any;
  delete expectedData.id;
  delete expectedData.label;
  delete expectedData.source;

  // Checking template's id is removed
  expect((result as any).id).toBeUndefined();

  // Double-checking some fields just to be sure our earlier comparison is ok
  expect(result.weight).toBeCloseTo(0.8);
  expect(result.components[0].materialId).toBe("eva");
  expect(result.manufacturingCountry).toBe("china");

  // Checking full object
  expect(result).toMatchObject({
    ...expectedData,
  });
});

test("expandProductDataPartialWithTemplate() overwrites weight if blank", () => {
  const partial: ProductDataPartial = {
    modelVersion: "n/d",
    templateId: "testTemplate",
    weight: NaN,
  };
  let result: ProductData = expandProductDataPartialWithTemplate(
    partial,
    template
  );
  expect(result.weight).toBeCloseTo(0.8);

  partial.weight = undefined;
  result = expandProductDataPartialWithTemplate(partial, template);
  expect(result.weight).toBeCloseTo(0.8);
});

test("expanding a complete ProductDataPartial changes no value", () => {
  const entry: ProductDataPartial = {
    templateId: "testTemplate",
    ...testProductData,
  };
  entry.weight = 0.2;
  if (entry?.components) entry.components[0].materialId = "eva/recycled";

  const result: ProductData = expandProductDataPartialWithTemplate(
    entry,
    template
  );
  const expectedData = { ...entry } as any;

  // Checking full object
  expect(result).toMatchObject({
    ...expectedData,
  });

  // Double-checking some fields just to be sure our earlier comparison is ok
  expect(result.weight).toBeCloseTo(0.2);
  expect(result.components[0].materialId).toBe("eva/recycled");
  expect(result.manufacturingCountry).toBe("china");
});

test("expanding a partial ProductDataPartial expand missing values, adding missing components from the template", () => {
  const entry: ProductDataPartial = {
    modelVersion: "n/d",
    templateId: "testTemplate",
    weight: 0.6,
    weightSourceUrls: ["weightUrl1"],
    components: [
      {
        componentId: "insole",
        materialId: "eva",
        materialSourceUrls: ["insoleMaterialUrl1"],
      },
      {
        componentId: "outsole",
        materialId: "rubber",
        materialSourceUrls: ["outsoleMaterialUrl1"],
      },
    ],
    manufacturingCountry: "argentina",
    manufacturingCountrySourceUrls: ["manufacturingCountryUrl1"],
  };

  const result: ProductData = expandProductDataPartialWithTemplate(
    entry,
    template
  );

  expect(result.weight).toBeCloseTo(0.6);
  expect(result.components[0].componentId).toBe("insole");
  expect(result.components[0].proportion).toBeCloseTo(0.1);
  expect(result.components.length).toBe(3);
  expect(result.components[2].componentId).toBe("upper");
  expect(result.components[2].materialId).toBe("cotton");
});

test("expanding a partial with empty proportions adds the proportion and leaves the materialId unchanged", () => {
  const entry: ProductDataPartial = {
    modelVersion: "n/d",
    templateId: "testTemplate",
    weight: 0.6,
    weightSourceUrls: ["weightUrl1"],
    components: [
      {
        componentId: "outsole",
        materialId: "eva",
        materialSourceUrls: [],
        proportion: undefined,
      },
    ],
  };
  const result: ProductData = expandProductDataPartialWithTemplate(
    entry,
    template
  );
  const updatedComponent = result.components.find(
    (c) => c.componentId === "outsole"
  );
  expect(updatedComponent!.proportion).toBeCloseTo(0.55);
  expect(updatedComponent!.materialId).toBe("eva");
});
