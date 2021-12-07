import { Unit as ModelParameterUnit } from "../entities/ModelParameterEntity";
import {
  EmissionFactorEntity,
  EmissionFactorUnit,
} from "../entities/EmissionFactorEntity";
import { ProductDataEntity } from "../entities/ProductDataEntity";
import { ModelVersion } from "../types";
import { ComputeProductFootprintOperation } from "./compute-product-footprint";
import { EmissionFactorProvider } from "../providers/emission-factor-provider";
import { ModelParameterProvider } from "../providers/model-parameter-provider";

const MANUFACTURING_ELECTRICITY = 10;

const testData1: ProductDataEntity = {
  weight: 0.6,
  components: [
    {
      componentId: "upper",
      materials: [
        {
          materialId: "material1",
          proportion: 1.0,
        },
      ],
      materialCountryId: "china",
      proportion: 0.3,
    },
    {
      componentId: "outsole",
      materials: [
        {
          materialId: "material2",
          proportion: 1.0,
        },
      ],
      materialCountryId: "china",
      proportion: 0.55,
    },
    {
      componentId: "other",
      materials: [
        {
          materialId: "missingMaterialPart",
          proportion: 1.0,
        },
      ],
      materialCountryId: "china",
      proportion: 0.15,
    },
  ],
  manufacturingCountryId: "china",
  distributionMode: "some-mode",
  endOfLifeOption: "endOfLifeOption1",
  endOfLifeValue: null,
};

const testData2: ProductDataEntity = {
  weight: 0.7,
  components: [
    {
      componentId: "upper",
      materials: [
        {
          materialId: "material1",
          proportion: 0.7,
        },
        {
          materialId: "material2",
          proportion: 0.3,
        },
      ],
      materialCountryId: "china",
      proportion: 0.5,
    },
    {
      componentId: "outsole",
      materials: [
        {
          materialId: "material1",
          proportion: 1.0,
        },
      ],
      materialCountryId: "china",
      proportion: 0.5,
    },
  ],
  manufacturingCountryId: "china",
  distributionMode: "some-mode",
  endOfLifeOption: "endOfLifeOption2",
  endOfLifeValue: null,
};

const testData3: ProductDataEntity = {
  weight: 0.7,
  components: [
    {
      componentId: "upper",
      materials: [
        {
          materialId: "material1",
          proportion: 0.7,
        },
        {
          materialId: "material2",
          proportion: 0.3,
        },
      ],
      materialCountryId: "china",
      proportion: 0.5,
    },
    {
      componentId: "outsole",
      materials: [
        {
          materialId: "material1",
          proportion: 1.0,
        },
      ],
      materialCountryId: "portugal",
      proportion: 0.5,
    },
  ],
  manufacturingCountryId: "portugal",
  distributionMode: "some-mode",
  endOfLifeOption: "custom",
  endOfLifeValue: 0.03,
};

const emissionFactorProvider: EmissionFactorProvider = {
  get: (id, version, countryId) => {
    function params(id: string): { value: number; unit: EmissionFactorUnit } {
      switch (id) {
        case "material/material1":
          switch (countryId) {
            case "china":
              return { value: 10.0, unit: "kgCO2eq/kg" };
            case "portugal":
              return { value: 5.0, unit: "kgCO2eq/kg" };
          }
        case "material/material2":
          switch (countryId) {
            case "china":
              return { value: 20.0, unit: "kgCO2eq/kg" };
          }
        case "material/missingMaterialPart":
          return { value: 30.0, unit: "kgCO2eq/kg" };
        case "energy/electricity":
          switch (countryId) {
            case "china":
              return { value: 0.5, unit: "kgCO2eq/kWh" };
            case "portugal":
              return { value: 0.1, unit: "kgCO2eq/kWh" };
          }
        default:
          throw new Error(
            `no emission factor for "${id}", ${countryId}, ${version}`
          );
      }
    }
    const { value, unit } = params(id);
    return {
      id: id,
      label: `Label for ${id}`,
      source: `Source for ${id}`,
      value: value,
      unit: unit,
      countryIds: [countryId],
      version: version,
    };
  },
  all: () => [] as EmissionFactorEntity[],
};

const modelParameterProvider: ModelParameterProvider = {
  get: (id: string, version: ModelVersion, countryId?: string) => {
    function params(id: string): { value: number; unit: ModelParameterUnit } {
      switch (id) {
        case "lifeCycleAnalysisStep/manufacturing/shoes/energyConsumption/electricity":
          return { value: MANUFACTURING_ELECTRICITY, unit: "kWh" };
        case "lifeCycleAnalysisStep/distribution/shoes/some-mode":
          if (version < ModelVersion.version_0_4_0) {
            throw new Error(
              "no .../distribution/shoes/... model parameter before v0.4.0"
            );
          }
          return { value: 2, unit: "kgCO2eq" };
        case "lifeCycleAnalysisStep/distribution/shoes":
          return { value: 2.2, unit: "kgCO2eq" };
        case "lifeCycleAnalysisStep/use/shoes":
          return { value: 1, unit: "kgCO2eq" };
        case "lifeCycleAnalysisStep/endOfLife/shoes/endOfLifeOption1":
          return { value: 0.01, unit: "kgCO2eq" };
        case "lifeCycleAnalysisStep/endOfLife/shoes/endOfLifeOption2":
          return { value: 0.02, unit: "kgCO2eq" };
        default:
          throw new Error(
            `No model parameter for id "${id}" for version <= ${version}`
          );
      }
    }
    const { value, unit } = params(id);
    return {
      id: id,
      description: "Model parameter ${id}",
      source: `Source for model parameter ${id}`,
      value: value,
      unit: unit,
      countryId: countryId,
      version: version,
    };
  },
};

const computeProductFootprint = ComputeProductFootprintOperation(
  emissionFactorProvider,
  modelParameterProvider
);

test("ComputeProductFootprint(testData1) is correct", () => {
  const data = testData1;
  const resultFootprint = computeProductFootprint(data, ModelVersion.current);
  expect(resultFootprint.breakdown.materials).toBeCloseTo(
    0.6 * (0.3 * 10 + 0.55 * 20 + 0.15 * 30)
  );
  expect(resultFootprint.breakdown.manufacturing).toBeCloseTo(
    MANUFACTURING_ELECTRICITY * 0.5
  );
  expect(resultFootprint.breakdown.distribution).toBeCloseTo(2);
  expect(resultFootprint.breakdown.use).toBeCloseTo(1);
  expect(resultFootprint.breakdown.endOfLife).toBeCloseTo(0.01);
});

test("ComputeProductFootprint(testData2) is correct", () => {
  const data = testData2;
  const resultFootprint = computeProductFootprint(data, ModelVersion.current);
  expect(resultFootprint.breakdown.materials).toBeCloseTo(
    0.7 * 0.5 * (10 * 0.7 + 20 * 0.3) + 0.7 * 0.5 * 10
  );
  expect(resultFootprint.breakdown.manufacturing).toBeCloseTo(
    MANUFACTURING_ELECTRICITY * 0.5
  );
  expect(resultFootprint.breakdown.distribution).toBeCloseTo(2);
  expect(resultFootprint.breakdown.use).toBeCloseTo(1);
  expect(resultFootprint.breakdown.endOfLife).toBeCloseTo(0.02);
});

test("ComputeProductFootprint(testData3) is correct", () => {
  const data = testData3;
  const resultFootprint = computeProductFootprint(data, ModelVersion.current);
  expect(resultFootprint.breakdown.materials).toBeCloseTo(
    0.7 * (0.5 * (0.7 * 10 + 0.3 * 20) + 0.5 * (1.0 * 5))
  );
  expect(resultFootprint.breakdown.manufacturing).toBeCloseTo(
    MANUFACTURING_ELECTRICITY * 0.1
  );
  expect(resultFootprint.breakdown.distribution).toBeCloseTo(2);
  expect(resultFootprint.breakdown.use).toBeCloseTo(1);
  expect(resultFootprint.breakdown.endOfLife).toBeCloseTo(0.03);
});

test("ComputeProductFootprint(...) raises an error when a material emission factor is missing", () => {
  const testData: ProductDataEntity = {
    weight: 0.6,
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "missingMaterial",
            proportion: 1.0,
          },
        ],
        materialCountryId: "china",
        proportion: 1.0,
      },
    ],
    manufacturingCountryId: "china",
    distributionMode: "intercontinental/default",
    endOfLifeOption: "anyway",
    endOfLifeValue: null,
  };
  expect(() => computeProductFootprint(testData, ModelVersion.current)).toThrow(
    'no emission factor for "material/missingMaterial"'
  );
});

test("ComputeProductFootprint(invalid) raises an error if the sum of components.proportion is not 1.0", () => {
  const testData: ProductDataEntity = {
    weight: 0.6,
    components: [
      {
        componentId: "upper",
        materials: [
          {
            materialId: "missingMaterial",
            proportion: 1.0,
          },
        ],
        materialCountryId: "china",
        proportion: 0.3,
      },
    ],
    manufacturingCountryId: "china",
    distributionMode: "intercontinental/default",
    endOfLifeOption: "endOfLifeOption1",
    endOfLifeValue: null,
  };
  expect(() => computeProductFootprint(testData, ModelVersion.current)).toThrow(
    "invalid data, sum of proportions of components < 1.0 (0.3)"
  );
});
