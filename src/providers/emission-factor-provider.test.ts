import { EmissionFactorEntity } from "../entities/EmissionFactorEntity";
import { ModelVersion } from "../types";
import {
  buildEmissionFactorProvider,
  EmissionFactorProvider,
} from "./emission-factor-provider";

const modelVersion = ModelVersion.current;
const emissionFactorProvider: EmissionFactorProvider =
  buildEmissionFactorProvider();

it("returns the correct value for China's electricity emission factor", () => {
  const ef = emissionFactorProvider.get(
    "energy/electricity",
    modelVersion,
    "china"
  );
  expect(ef.value).toBeCloseTo(0.555);
  expect(ef.unit).toBe("kgCO2eq/kWh");
  expect(ef.countryIds).toStrictEqual(["china"]);
});

it("returns the correct value for an older version", () => {
  const ef = emissionFactorProvider.get(
    "energy/electricity",
    ModelVersion.version_0_2_0,
    "china"
  );
  expect(ef.value).toBeCloseTo(0.6);
  expect(ef.unit).toBe("kgCO2eq/kWh");
  expect(ef.countryIds).toStrictEqual(["china"]);
});

it("throws an error when no emission factor matching the id is found", () => {
  expect(() =>
    emissionFactorProvider.get("unknown", modelVersion, "china")
  ).toThrowError();
});

it("throws an error when no emission factor matching the country is found", () => {
  expect(() =>
    emissionFactorProvider.get("energy/electricity", modelVersion, "bhoutan")
  ).toThrowError();
});

// Disabled this test since in the `0.5.0` update we only
// kept the latest version of the emission factor, so it
// cannot be tested anymore.
// it("returns the value for the maximum version lower or equal to the specified one when there are several matches for id, version and country", () => {
//   let ef: EmissionFactorEntity;
//   ef = emissionFactorProvider.get(
//     "material/polyester/standard",
//     ModelVersion.version_0_2_0,
//     "portugal"
//   );
//   expect(ef.value).toBeCloseTo(4.561);

//   ef = emissionFactorProvider.get(
//     "material/polyester/standard",
//     modelVersion,
//     "portugal"
//   );
//   expect(ef.value).toBeCloseTo(8.558);
// });

it("throws an error when there is no match on id and country below the specified version", () => {
  expect(() =>
    emissionFactorProvider.get(
      "material/rubber/synthetic",
      ModelVersion.version_0_1_0,
      "italy"
    )
  ).toThrowError();
});
