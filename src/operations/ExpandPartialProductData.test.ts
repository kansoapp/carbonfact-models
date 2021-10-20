import { PartialProductDataEntity } from "../entities/PartialProductDataEntity";
import { ProductDataEntity } from "../entities/ProductDataEntity";
import { ProductDataTemplateEntity } from "../entities/ProductDataTemplateEntity";
import { IGeographicalAreaProvider } from "../providers/interfaces";
import { ModelVersion } from "../types";
import {
  ExpandPartialProductDataEntityOperation,
  IProductDataTemplateProvider,
} from "./ExpandPartialProductData";

const testPartial_Empty: PartialProductDataEntity = {};

const testPartial_Complete: PartialProductDataEntity = {
  weight: 0.7,
  components: [
    {
      componentId: "upper",
      materials: [
        {
          materialId: "upperFromPartial",
          proportion: 1.0,
        },
      ],
      materialCountryId: "upperMaterialCountryIdFromPartial",
      proportion: 0.3,
    },
    {
      componentId: "insole",
      materials: [
        {
          materialId: "insoleFromPartial",
          proportion: 1.0,
        },
      ],
      materialCountryId: "insoleMaterialCountryIdFromPartial",
      proportion: 0.1,
    },
    {
      componentId: "outsole",
      materials: [
        {
          materialId: "outsoleFromPartial",
          proportion: 1.0,
        },
      ],
      materialCountryId: "outsoleMaterialCountryIdFromPartial",
      proportion: 0.6,
    },
  ],
  manufacturingCountryId: "countryIdFromPartial",
  endOfLifeOption: "endOfLifeOptionFromPartial",
  endOfLifeValue: null,
};

const testTemplates: ProductDataTemplateEntity[] = [
  {
    id: "template1",
    label: "label template1",
    source: "source template1",
    modelVersion: ModelVersion.version_0_2_0,
    productCategoryId: "shoes/sneakers",
    weight: 1.0,
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "upperFromTemplate1",
            proportion: 1.0,
          },
        ],
        materialCountryId: "upperMaterialCountryIdFromTemplate1",
        proportion: 0.3,
      },
      {
        componentId: "insole",
        materials: [
          {
            materialId: "insoleFromTemplate1",
            proportion: 1.0,
          },
        ],
        materialCountryId: "insoleMaterialCountryIdFromTemplate1",
        proportion: 0.1,
      },
      {
        componentId: "outsole",
        materials: [
          {
            materialId: "outsoleFromTemplate1",
            proportion: 1.0,
          },
        ],
        materialCountryId: "outsoleMaterialCountryIdFromTemplate1",
        proportion: 0.5,
      },
    ],
    manufacturingCountryId: "countryIdFromTemplate1",
    endOfLifeOption: "endOfLifeOptionFromTemplate1",
    endOfLifeValue: null,
  },
  {
    id: "template2",
    label: "label template2",
    source: "source template2",
    modelVersion: ModelVersion.current,
    productCategoryId: "shoes/sneakers",
    weight: 1.0,
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "upperFromTemplate2",
            proportion: 1.0,
          },
        ],
        materialCountryId: "upperMaterialCountryIdFromTemplate2",
        proportion: 0.3,
      },
    ],
    manufacturingCountryId: "countryIdFromTemplate2",
    endOfLifeOption: "custom",
    endOfLifeValue: 0.9,
  },
];

const templateProvider: (
  template?: ProductDataTemplateEntity
) => IProductDataTemplateProvider = (template) => {
  return {
    get: (templateId: string) => {
      if (template) return template;
      const testTemplate = testTemplates.find(({ id }) => id === templateId);
      if (!testTemplate)
        throw new Error(`missing test template for id "${templateId}"`);
      return testTemplate;
    },
    allIdAndLabel: () => {
      return [];
    }, // not used here
  };
};

const geographicalAreaProvider: IGeographicalAreaProvider = {
  getById: (id) => {
    return {
      id,
      label: "Country from Partial",
      type: "country",
      parentId: "asia",
    };
  },
  allCountries: () => {
    return [];
  },
  getParent: (ga) => {
    if (ga.id.includes("europe")) {
      return {
        id: "europe",
        label: "Europe",
        type: "continent",
        parentId: "world",
      };
    }
    return {
      id: "asia",
      label: "Asia",
      type: "continent",
      parentId: "world",
    };
  },
};

const expandPartialProductData = ExpandPartialProductDataEntityOperation(
  templateProvider(),
  geographicalAreaProvider
);

test("ExpandPartialProductDataEntity(Empty, any) fills all values without adding template specific fields: id, label, source)", () => {
  const partial: PartialProductDataEntity = { ...testPartial_Empty };
  const result: ProductDataEntity = expandPartialProductData(
    partial,
    "template1",
    ModelVersion.current
  );

  // Checking template's specific fields are removed.
  expect((result as any).id).toBeUndefined();
  expect((result as any).label).toBeUndefined();
  expect((result as any).source).toBeUndefined();

  // Checking expanded fields.
  expect(result.weight).toBeCloseTo(1.0);
  expect(result.components[0].materials[0].materialId).toBe(
    "upperFromTemplate1"
  );
  expect(result.components[0].materialCountryId).toBe(
    "upperMaterialCountryIdFromTemplate1"
  );
  expect(result.components[0].proportion).toBeCloseTo(0.3);
  expect(result.components[1].materials[0].materialId).toBe(
    "insoleFromTemplate1"
  );
  expect(result.components[1].materialCountryId).toBe(
    "insoleMaterialCountryIdFromTemplate1"
  );
  expect(result.components[1].proportion).toBeCloseTo(0.1);
  expect(result.components[2].materials[0].materialId).toBe(
    "outsoleFromTemplate1"
  );
  expect(result.components[2].materialCountryId).toBe(
    "outsoleMaterialCountryIdFromTemplate1"
  );
  expect(result.components[2].proportion).toBeCloseTo(0.5);
  expect(result.manufacturingCountryId).toBe("countryIdFromTemplate1");

  expect(result.endOfLifeRecyclingProgram).toBeUndefined();
  expect(result.endOfLifeOption).toBe("endOfLifeOptionFromTemplate1");
  expect(result.endOfLifeValue).toBeNull();
});

test("ExpandPartialProductDataEntity(blankWeight, any) overwrites weight", () => {
  let partial: PartialProductDataEntity = {
    ...testPartial_Empty,
  };

  for (const value of [NaN, undefined]) {
    partial.weight = value;
    expect(
      expandPartialProductData(partial, "template1", ModelVersion.current)
        .weight
    ).toBeCloseTo(1);
  }
});

test("ExpandPartialProductDataEntity(completeData, any, current) changes no value", () => {
  const partial: PartialProductDataEntity = {
    ...testPartial_Complete,
  };
  const result: ProductDataEntity = expandPartialProductData(
    partial,
    "template1",
    ModelVersion.current
  );

  expect(result.weight).toBeCloseTo(testPartial_Complete.weight!);
  for (let i = 0; i < result.components.length; i++) {
    expect(result.components[i]).toMatchObject(
      testPartial_Complete.components![i]
    );
  }
  expect(result.manufacturingCountryId).toBe(
    testPartial_Complete.manufacturingCountryId
  );
  expect(result.endOfLifeRecyclingProgram).toBe(
    testPartial_Complete.endOfLifeRecyclingProgram
  );
});

test("ExpandPartialProductDataEntity(partialData, any, current) expands missing values, adding missing components and completing partial components", () => {
  const partial: PartialProductDataEntity = {
    weight: 0.6,
    components: [
      {
        componentId: "insole",
        proportion: 0.1,
      },
      {
        componentId: "outsole",
        materials: [
          {
            materialId: "outsoleFromPartial",
            proportion: 1.0,
          },
        ],
      },
    ],
    endOfLifeRecyclingProgram: true,
  };

  const result: ProductDataEntity = expandPartialProductData(
    partial,
    "template1",
    ModelVersion.current
  );

  expect(result.weight).toBeCloseTo(partial.weight!); // unchanged
  expect(result.components.length).toBe(4); // added 1 from template and 1 other
  ["upper", "insole", "outsole"].map((componentId) => {
    expect(result.components.map((c) => c.componentId)).toContain(componentId);
  });

  let expandedComponent = result.components.find(
    (c) => c.componentId === "insole"
  );
  expect(expandedComponent!.materials[0].materialId).toBe(
    "insoleFromTemplate1"
  ); // expanded
  expect(expandedComponent!.materials[0].proportion).toBeCloseTo(1.0); // expanded
  expect(expandedComponent!.proportion).toBeCloseTo(0.1); // unchanged

  expandedComponent = result.components.find(
    (c) => c.componentId === "outsole"
  );
  expect(expandedComponent!.materials[0].materialId).toBe("outsoleFromPartial"); // expanded
  expect(expandedComponent!.materials[0].proportion).toBeCloseTo(1.0); // expanded
  expect(expandedComponent!.proportion).toBeCloseTo(0.5); // unchanged

  const addedComponent = result.components.find(
    (c) => c.componentId === "upper"
  );
  expect(addedComponent!.materials[0].materialId).toBe("upperFromTemplate1");
  expect(addedComponent!.materials[0].proportion).toBeCloseTo(1.0);
  expect(addedComponent!.proportion).toBeCloseTo(0.3);
});

test("ExpandPartialProductDataEntity(partial, any, current) expands the material country id from the partial's manufacturing country, without overridding it with the template's value", () => {
  const partial: PartialProductDataEntity = {
    weight: 0.7,
    components: [
      {
        componentId: "upper", // TECHNICAL-DEBT this was not mandatory in schema v0.1.0
        materials: [
          {
            materialId: "upperFromPartial",
            proportion: 1.0,
          },
        ],
        proportion: 0.3,
      },
      {
        componentId: "outsole",
        materials: [
          {
            materialId: "outsoleFromPartial",
            proportion: 1.0,
          },
        ],
        proportion: 0.3,
      },
    ],
    manufacturingCountryId: "countryFromPartial",
    endOfLifeRecyclingProgram: true,
  };

  const result = expandPartialProductData(
    partial,
    "template1",
    ModelVersion.current
  );

  let component = result.components.find((c) => c.componentId === "upper");
  expect(component!.materialCountryId).toEqual("countryFromPartial");

  component = result.components.find((c) => c.componentId === "outsole");
  expect(component!.materialCountryId).toEqual("countryFromPartial");
});

test("ExpandPartialProductDataEntity(partial, any, current) expand unknown material proportions following implicit data expansion rules", () => {
  const partial: PartialProductDataEntity = {
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "upperFromPartial1",
          },
          {
            materialId: "upperFromPartial2",
          },
        ],
        proportion: 0.3,
      },
      {
        componentId: "outsole",
        materials: [
          {
            materialId: "outsoleFromPartial1",
            proportion: 0.5,
          },
          {
            materialId: "outsoleFromPartial2",
          },
          {
            materialId: "outsoleFromPartial3",
          },
        ],
        proportion: 0.3,
      },
    ],
  };

  const result = expandPartialProductData(
    partial,
    "template1",
    ModelVersion.current
  );

  let component = result.components.find((c) => c.componentId === "upper");
  let material = component!.materials.find(
    (m) => m.materialId === "upperFromPartial1"
  );
  expect(material!.proportion).toEqual(0.5);
  material = component!.materials.find(
    (m) => m.materialId === "upperFromPartial2"
  );
  expect(material!.proportion).toEqual(0.5);

  component = result.components.find((c) => c.componentId === "outsole");
  material = component!.materials.find(
    (m) => m.materialId === "outsoleFromPartial1"
  );
  expect(material!.proportion).toEqual(0.5);
  material = component!.materials.find(
    (m) => m.materialId === "outsoleFromPartial2"
  );
  expect(material!.proportion).toEqual(0.25);
  material = component!.materials.find(
    (m) => m.materialId === "outsoleFromPartial3"
  );
  expect(material!.proportion).toEqual(0.25);
});

test("ExpandPartialProductDataEntity(partial, any, current) expands missing component materialCountryId from partial's manufacturingCountryId when present", () => {
  const partial: PartialProductDataEntity = {
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "upperFromPartial",
          },
        ],
        proportion: 0.3,
      },
    ],
    manufacturingCountryId: "countryIdFromPartial",
  };

  const result = expandPartialProductData(
    partial,
    "template2",
    ModelVersion.current
  );

  let component = result.components.find((c) => c.componentId === "upper");
  expect(component!.materialCountryId).toBe("countryIdFromPartial");
});

test("ExpandPartialProductDataEntity(partial, any, current) expands missing component materialCountryId from template when partial is missing `manufacturingCountryId`", () => {
  const partial: PartialProductDataEntity = {
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "upperFromPartial",
          },
        ],
        proportion: 0.3,
      },
    ],
  };

  const result = expandPartialProductData(
    partial,
    "template2",
    ModelVersion.current
  );

  let component = result.components.find((c) => c.componentId === "upper");
  expect(component!.materialCountryId).toBe("countryIdFromTemplate2");
});

test("ExpandPartialProductDataEntity(partial, any, current) expands missing material proportions", () => {
  const partial: PartialProductDataEntity = {
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "upperFromPartial",
          },
        ],
        proportion: 0.3,
      },
    ],
  };

  const result = expandPartialProductData(
    partial,
    "template2",
    ModelVersion.current
  );

  let component = result.components.find((c) => c.componentId === "upper");
  let material = component!.materials.find(
    (m) => m.materialId === "upperFromPartial"
  );
  expect(material!.proportion).toBeCloseTo(1.0);
});

test('ExpandPartialProductDataEntity(partial, any, current) adds an "other" component to complete to 100% components\' proportions', () => {
  const partial: PartialProductDataEntity = {
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "upperFromPartial",
          },
        ],
        proportion: 0.3,
      },
    ],
  };

  const result = expandPartialProductData(
    partial,
    "template2",
    ModelVersion.current
  );

  expect(result.components.length).toBe(2); // 1 original, 1 added by expansion

  let component = result.components.find((c) => c.componentId === "other");
  expect(component!.proportion).toBeCloseTo(0.7);
  expect(component!.materialCountryId).toBe("countryIdFromTemplate2");
});

/**
 * Expansion of `distributionMode`
 *
 * Rules:
 * - Present: keep untouched.
 * - Missing:
 *   - If `manufacturingCountryId` in Asia (`vietnam` or `china` as of now): set with `intercontinental/default`.
 *   - Otherwise: set with `intracontinental/default`.
 */

test("expand(partialWithoutDistributionModeAndManufacturingCountryInAsia, any, any) sets distributionMode to `intercontinental/default`", () => {
  const result = expandPartialProductData(
    testPartial_Empty,
    "template1", // any (expansion not based on template)
    ModelVersion.current // any (expansion not based on template)
  );
  expect(result.distributionMode).toBe("intercontinental/default");
});

test("expand(partialWithoutDistributionModeAndManufacturingCountryInEurope, any, any) sets distributionMode to `intracontinental/default`", () => {
  const partial = {
    ...testPartial_Empty,
    manufacturingCountryId: "somewhere in europe",
  };
  const result = expandPartialProductData(
    partial,
    "template1", // any (expansion not based on template)
    ModelVersion.current // any (expansion not based on template)
  );
  expect(result.distributionMode).toBe("intracontinental/default");
});

test("expand(partialWithDistributionMode, any, any) leaves distributionMode unchanged", () => {
  const partial = {
    ...testPartial_Empty,
    distributionMode: "some/mode",
  };
  const result = expandPartialProductData(
    partial,
    "template1", // any (expansion not based on template)
    ModelVersion.current // any (expansion not based on template)
  );
  expect(result.distributionMode).toBe("some/mode");
});

test("expand(emptyPartial, templateWithEndOfLifeOption...) uses template's endOfLifeOption and sets endOfLifeValue to null", () => {
  const result = expandPartialProductData(
    testPartial_Empty,
    "template1",
    ModelVersion.current
  );
  expect(result.endOfLifeOption).toBe("endOfLifeOptionFromTemplate1");
  expect(result.endOfLifeValue).toBeNull();
});

test("expand(emptyPartial, templateWithEndOfLifeCustomValue...) uses template's endOfLifeValue", () => {
  const result = expandPartialProductData(
    testPartial_Empty,
    "template2",
    ModelVersion.current
  );
  expect(result.endOfLifeOption).toBe("custom");
  expect(result.endOfLifeValue).toBeCloseTo(0.9);
});

test("expand(partialWithEndOfLifeOption...) leaves endOfLifeOption unchanged", () => {
  for (const templateId of testTemplates.map((tt) => tt.id)) {
    const result = expandPartialProductData(
      testPartial_Complete,
      templateId,
      ModelVersion.current
    );
    expect(result.endOfLifeOption).toBe("endOfLifeOptionFromPartial");
    expect(result.endOfLifeValue).toBeNull();
  }
});

test("expand(partialWithEndOfLifeCustomValue...) leaves endOfLife fields unchanged", () => {
  for (const templateId of testTemplates.map((tt) => tt.id)) {
    const partial: PartialProductDataEntity = {
      ...testPartial_Complete,
      endOfLifeOption: "custom",
      endOfLifeValue: 7.7,
    };
    const result = expandPartialProductData(
      partial,
      templateId,
      ModelVersion.current
    );
    expect(result.endOfLifeOption).toBe("custom");
    expect(result.endOfLifeValue).toBeCloseTo(7.7);
  }
});

test('expand(partialWithEndOfLifeOptionCustomAndEmptyValue...) throws an error because value must be set if option is "custom"', () => {
  const partial: PartialProductDataEntity = {
    ...testPartial_Complete,
    endOfLifeOption: "custom",
    endOfLifeValue: null,
  };
  expect(() => {
    expandPartialProductData(partial, "template1", ModelVersion.current);
  }).toThrow("unexpected null endOfLifeValue with option=custom");
});

// DEPRECATED for retro-compatibility before new endOfLife properties
test('expand(legacyPartialWithEndOfLifeRecyclingProgram, any, current) sets option to "with..." or "withoutRecyclingProgram" and value to null', () => {
  for (const testCase of [
    { boolValue: true, expectedOption: "withRecyclingProgram" },
    { boolValue: false, expectedOption: "withoutRecyclingProgram" },
  ]) {
    for (const templateId of testTemplates.map((tt) => tt.id)) {
      const partial: PartialProductDataEntity = {
        ...testPartial_Empty,
        endOfLifeRecyclingProgram: testCase.boolValue,
      };
      const result = expandPartialProductData(
        partial,
        templateId,
        ModelVersion.current
      );
      expect(result.endOfLifeOption).toBe(testCase.expectedOption);
    }
  }
});
// expand the `option` with the correct value based on `endOfLifeRecyclingProgram` if present

// throws if ...RecyclingProgram is present with option and value
test("expand(partialWithLegacyAndNewEndOfLifeValues...) throws an error because only legacy or new values should be set", () => {
  const partial: PartialProductDataEntity = {
    ...testPartial_Complete,
    endOfLifeRecyclingProgram: true,
  };
  expect(() => {
    expandPartialProductData(partial, "template1", ModelVersion.current);
  }).toThrow("invalid partial with both legacy and new values for `endOfLife`");
});
