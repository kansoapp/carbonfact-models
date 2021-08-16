import { ModelEntity, ModelParameter } from "./types";
import { modelEntities, modelParameters, countryDefault } from "./parameters";
import { ModelVersion } from "../lib/types";
import { compare } from "../lib/sorting";

// TECHNICAL-DEBT this should be tested extensively and parameters should be
//   injected to maximize testing possibilities.

// TECHNICAL-DEBT no filtering on countries for emissionFactors yet.

/**
 * Returns the `ModelEntity` items matching the specified prefix.
 * NB: the prefix is stripped from the returned entities' id.
 *
 * @param prefix
 * @returns
 */
function filteredModelEntities(prefix: string): ModelEntity[] {
  return modelEntities
    .map((p) =>
      p.id.startsWith(prefix)
        ? {
            ...p,
            id: p.id.replace(prefix, ""),
          }
        : undefined
    )
    .filter((p) => p != undefined) as ModelEntity[];
}

function filteredModelParameters(prefix: string): ModelParameter[] {
  return modelParameters
    .map((p) =>
      p.id.startsWith(prefix)
        ? {
            ...p,
            id: p.id.replace(prefix, ""),
          }
        : undefined
    )
    .filter((p) => p != undefined) as ModelParameter[];
}

const emissionFactorsForMaterials: ModelParameter[] = filteredModelParameters(
  "emissionFactor/material/"
);

interface DropdownItem {
  id: string;
  label: string;
}

/**
 * Takes all emission factors and return an array of the unique
 * `{id: ef.id, label: ef.label}` values.
 *
 * Several emission factors may have the same idea and differ on the country.
 *   Only one item should be returned.
 */
export const emissionFactorsDropdownItems: DropdownItem[] = (() => {
  const itemsMap: { [key: string]: string } = {};
  const items: DropdownItem[] = [];

  // Selecting distinct ids
  for (let ef of emissionFactorsForMaterials) {
    if (!ef.deprecated && !itemsMap[ef.id]) {
      itemsMap[ef.id] = ef.label;
    }
  }
  for (let efId in itemsMap) {
    items.push({ id: efId, label: itemsMap[efId] });
  }

  // Sorting
  items.sort((ef1, ef2) => compare<string>(ef1.label, ef2.label, "asc"));

  return items;
})();

const emissionFactorsForElectricity = filteredModelParameters(
  "emissionFactor/energy/electricity"
);

const countries = filteredModelEntities("country/");

export const countriesDropdownItems: DropdownItem[] = countries
  .map((c) => ({ id: c.id, label: c.label }))
  .sort((c1, c2) => compare<string>(c1.label, c2.label, "asc"));

export function findModelParameter(id: string): ModelParameter | undefined {
  return modelParameters.find((p) => p.id == id);
}

/**
 * Returns a `ModelParameter` with "emissionFactor/energy/electricity"
 * id prefix, matching the specified country.
 *
 * If several values match, returns the one with the higher version lower
 * or equal to the `version` parameter.
 *
 * NB: parameter's `id` "emissionFactor/energy/electricity" prefix
 * has been removed.
 *
 * TECHNICAL-DEBT: should not remove the prefix here, makes it complex
 *   to reason with what the id of an `ModelParameter` is.
 *
 * @param country
 * @param version
 * @returns
 */
export function findEmissionFactorForElectricityWithCountry(
  country: string
): ModelParameter | undefined {
  let emissionFactor = emissionFactorsForElectricity.find((ef) => {
    return ef.connectedEntityIds.includes(`country/${country}`);
  });
  if (emissionFactor) return emissionFactor;

  return undefined;
}

/**
 * Returns a `ModelParameter` selected as so:
 * - `id` prefixed with "emissionFactor/material",
 * - after the prefix, `id` matches `materialId`,
 * - `country/${country}` is present in the parameter's `connectedEntityIds`.
 *
 * If several values match, returns the one with the highest version number
 * that is  lower or equal to the `version` parameter.
 *
 * NB: parameter's `id` "emissionFactor/material" prefix
 * has been removed.
 *
 * TECHNICAL-DEBT: should not remove the prefix here, makes it complex
 *   to reason with what the id of an `ModelParameter` is.
 *
 * @param country
 * @param version
 * @returns
 */
export function findEmissionFactorForMaterialWithIdAndCountry(
  materialId: string,
  country: string,
  version: ModelVersion
): ModelParameter | undefined {
  let matchingEFs: ModelParameter[] = emissionFactorsForMaterials.filter(
    (f) => f.id === materialId
  );
  matchingEFs = filterModelParametersOnCountries(matchingEFs, [country]);
  if (matchingEFs.length == 0) {
    matchingEFs = filterModelParametersOnCountries(matchingEFs, [
      countryDefault,
    ]);
  }
  const matchingEF = selectModelParameterOnVersion(matchingEFs, version);
  return matchingEF;
}

const fixedValues: ModelParameter[] = filteredModelParameters("fixedValue/");

/**
 * Returns model parameters starting with "fixedValue" and
 * matching the specified `id`, filtering on countries and version:
 *
 * - All specified countries must be present in the parameter's
 *   `connectedEntityIds` list.
 * - The parameter's version must be lower or equal to `version`.
 *
 * @param id
 * @param countries
 * @param version
 * @returns
 */
export function findFixedValueForIdAndCountries(
  id: string,
  countries: string[],
  version: ModelVersion
): ModelParameter | undefined {
  let matchingValues = fixedValues.filter((mp) => mp.id === id);
  matchingValues = filterModelParametersOnCountries(matchingValues, countries);
  if (matchingValues.length < 1) {
    return undefined;
  }
  const matchingValue = selectModelParameterOnVersion(matchingValues, version);
  return matchingValue;
}

export function findCountryForId(id: string): ModelEntity | undefined {
  return countries.find((c) => c.id == id);
}

/**
 * Filters the passed model parameters and only return those
 * who contain all passed `countries` in their `connectedEntityIds`
 * field.
 */
export function filterModelParametersOnCountries(
  parameters: ModelParameter[],
  countries: string[]
) {
  let matchingResults = parameters.filter((p) => {
    for (let country of countries) {
      if (!p.connectedEntityIds.includes(`country/${country}`)) {
        return false;
      }
    }
    return true;
  });
  return matchingResults;
}

/**
 * Select the model parameter with the highest model version
 * lower or equal to the specified version.
 */
export function selectModelParameterOnVersion(
  parameters: ModelParameter[],
  version: ModelVersion
): ModelParameter | undefined {
  let maxParameter = undefined;
  for (let parameter of parameters) {
    if (parameter.version > version) continue;
    if (!maxParameter) maxParameter = parameter;
    else {
      if (maxParameter.version < parameter.version) maxParameter = parameter;
    }
  }
  return maxParameter;
}
