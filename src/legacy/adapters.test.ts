import { ModelVersion } from "../types";
import {
  filterModelParametersOnCountries,
  findEmissionFactorForElectricityWithCountry,
  findEmissionFactorForMaterialWithIdAndCountry,
  findFixedValueForIdAndCountries,
  selectModelParameterOnVersion,
} from "./adapters";
import { countryDefault } from "../data/parameters";
import { ModelParameter } from "./types";

test("findEmissionFactorForElectricityWithCountry() returns the matching `ModelParameter` with the prefix removed", () => {
  const result = findEmissionFactorForElectricityWithCountry("china");
  expect(result).not.toBeUndefined();
  expect(result!.value).toBeCloseTo(0.6);
  expect(result!.id).toBe("");
});

test("findEmissionFactorForElectricityWithCountry() returns undefined when there is no matching result", () => {
  const result = findEmissionFactorForElectricityWithCountry("bhoutan");
  expect(result).toBeUndefined();
});

test("findEmissionFactorForMaterialWithIdAndCountry() returns undefined if no values match", () => {
  const result = findEmissionFactorForMaterialWithIdAndCountry(
    "shouldMatchNothing",
    countryDefault,
    ModelVersion.version_0_1_0
  );
  expect(result).toBeUndefined();
});

test("findEmissionFactorForMaterialWithIdAndCountry('rubber/synthetic', 'china', 0.1.0) returns a value", () => {
  const result = findEmissionFactorForMaterialWithIdAndCountry(
    "rubber/synthetic",
    "china",
    ModelVersion.version_0_1_0
  );
  expect(result).not.toBeUndefined();
});

test("findEmissionFactorForMaterialWithIdAndCountry() returns the matching value", () => {
  const result = findEmissionFactorForMaterialWithIdAndCountry(
    "leather/vegan",
    countryDefault,
    ModelVersion.version_0_2_0
  );
  expect(result).not.toBeUndefined();
  expect(result!.value).toBeCloseTo(2.42);
});

test("findEmissionFactorForMaterialWithIdAndCountry() returns the highest version when several matches", () => {
  const result = findEmissionFactorForMaterialWithIdAndCountry(
    "rubber/synthetic",
    "china",
    ModelVersion.version_0_2_0
  );
  expect(result).not.toBeUndefined();
  expect(result!.value).toBeCloseTo(5.844);
});

test("findEmissionFactorForMaterialWithIdAndCountry() returns the highest version below the specified one when several matches", () => {
  // TECHNICAL-DEBT: not testable yet, we don't have this case in parameters
});

test("findEmissionFactorForMaterialWithIdAndCountry() returns undefined when there is no value with a version below or equal to the specified one", () => {
  const result = findEmissionFactorForMaterialWithIdAndCountry(
    "rubber/synthetic",
    "italy",
    ModelVersion.version_0_1_0
  );
  expect(result).toBeUndefined();
});

test("findFixedValueForIdAndCountries() returns the matching `ModelParameter` with the prefix removed", () => {
  const result = findFixedValueForIdAndCountries(
    "lifeCycleAnalysisStep/distribution/shoes",
    [countryDefault],
    ModelVersion.version_0_1_0
  );
  expect(result).not.toBeUndefined();
  expect(result!.value).toBeCloseTo(0.6);
  expect(result!.connectedEntityIds).toContain(`country/${countryDefault}`);
});

test("findFixedValueForIdAndCountries() returns the matching `ModelParameter` with the highest version lower or equal to the specified version", () => {
  let result = findFixedValueForIdAndCountries(
    "lifeCycleAnalysisStep/use/shoes",
    [countryDefault],
    ModelVersion.version_0_1_0
  );
  expect(result).not.toBeUndefined();
  expect(result!.value).toBeCloseTo(1.5);

  result = findFixedValueForIdAndCountries(
    "lifeCycleAnalysisStep/use/shoes",
    [countryDefault],
    ModelVersion.version_0_2_0
  );
  expect(result).not.toBeUndefined();
  expect(result!.value).toBeCloseTo(0);
});

const testModelParameters: ModelParameter[] = [
  {
    id: "p1",
    label: "p1",
    source: "p1",
    value: 1,
    unit: "kgCO2eq",
    connectedEntityIds: ["country/france", "country/argentina"],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "p2",
    label: "p2",
    source: "p2",
    value: 2,
    unit: "kgCO2eq",
    connectedEntityIds: ["country/china"],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "p3",
    label: "p3",
    source: "p3",
    value: 3,
    unit: "kgCO2eq",
    connectedEntityIds: ["country/argentina"],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "p4",
    label: "p4",
    source: "p4",
    value: 4,
    unit: "kgCO2eq",
    connectedEntityIds: ["country/mexico"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "p5",
    label: "p5",
    source: "p5",
    value: 5,
    unit: "kgCO2eq",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "p6",
    label: "p6",
    source: "p6",
    value: 6,
    unit: "kgCO2eq",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
  },
];

test("filterModelParametersOnCountries() returns parameters matching the specified country", () => {
  let result = filterModelParametersOnCountries(testModelParameters, [
    "france",
  ]);
  expect(result.length).toBe(1);
  expect(result[0].id).toBe("p1");
  result = filterModelParametersOnCountries(testModelParameters, ["argentina"]);
  expect(result.length).toBe(2);
  expect(result.map((r) => r.id)).toContain("p1");
  expect(result.map((r) => r.id)).toContain("p3");
});

test("filterModelParametersOnCountries() returns parameters matching all specified countries", () => {
  const result = filterModelParametersOnCountries(testModelParameters, [
    "france",
    "argentina",
  ]);
  expect(result.length).toBe(1);
  expect(result[0].id).toBe("p1");
});

test("filterModelParametersOnCountries() returns no results if the countries don't match", () => {
  const result = filterModelParametersOnCountries(testModelParameters, [
    "lebanon",
  ]);
  expect(result.length).toBe(0);
});

test("selectModelParameterOnVersion() returns null if no parameters matches the maximum version requested", () => {
  const result = selectModelParameterOnVersion(
    testModelParameters.slice(3, 4),
    ModelVersion.version_0_1_0
  );
  expect(result).toBeUndefined();
});

test("selectModelParameterOnVersion() returns the parameter with the highest version if several are matching", () => {
  const result = selectModelParameterOnVersion(
    testModelParameters,
    ModelVersion.version_0_2_0
  );
  expect(result).not.toBeUndefined();
  expect(result!.id).toBe("p4");
});

test("selectModelParameterOnVersion() returns the parameter with the version lower or equal to the specified version", () => {
  const result = selectModelParameterOnVersion(
    testModelParameters.slice(2, 4),
    ModelVersion.version_0_1_0
  );
  expect(result).not.toBeUndefined();
  expect(result!.id).toBe("p3");
});
