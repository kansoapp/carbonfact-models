import { compare } from "../../../_lib/sorting";
import { countryDefault, modelParameters } from "../data/parameters";
import { EmissionFactorUnit } from "../entities/EmissionFactorEntity";
import { ModelParameter } from "../legacy/types";
import { IEmissionFactorProvider } from "../operations/ComputeProductFootprint";
import { ModelVersion } from "../types";

const emissionFactors = modelParameters.filter((mp) =>
  mp.id.startsWith("emissionFactor/")
);

export const EmissionFactorProvider: IEmissionFactorProvider = {
  /**
   * Selection process:
   *  - emission factor's id must match with `emissionFactor/${id}` and
   *    its country with the specified one,
   *  - the highest available model version is chosen,
   *  - if there is no emission factor matching with the specified country,
   *    selects the emission factor with the highest version for the default
   *    country.
   *
   * Throws an error if no result is found.
   *
   * Example:
   *
   * Given the following values in the source data:
   *  1. id: emissionFactor/test, country: france, version: 0.1
   *  2. id: emissionFactor/test, country: germany, version: 0.2
   *  3. id: emissionFactor/test, country: world, version: 0.2
   *
   * If "emissionFactor/test", country="france", version="0.2":
   *   returns the 1 because it's the only one matching with "france".
   *
   * If "emissionFactor/test", country="portugal", version="0.2",
   *   returns the 3 because it's the only one matching with the default
   *   country.
   *
   * @param id
   * @param country
   * @param version
   */
  get: (id: string, country: string, version: ModelVersion) => {
    // TECHNICAL-DEBT: duplication with ModelParameterProvider

    const inVersionRange = emissionFactors.filter(
      (ef) => ef.id === `emissionFactor/${id}` && ef.version <= version
    );
    const inVersionRangeAndMatchingCountry = inVersionRange.filter(
      (ef) => ef.connectedEntityIds[0] === `country/${country}`
    );
    inVersionRangeAndMatchingCountry.sort((ef1, ef2) =>
      compare<string>(ef1.version, ef2.version, "desc")
    );

    let selectedModelParameter: ModelParameter;
    if (inVersionRangeAndMatchingCountry.length === 0) {
      const inVersionRangeAndDefaultCountry = inVersionRange.filter(
        (ef) => ef.connectedEntityIds[0] === `country/${countryDefault}`
      );
      inVersionRangeAndDefaultCountry.sort((ef1, ef2) =>
        compare<string>(ef1.version, ef2.version, "desc")
      );

      if (inVersionRangeAndDefaultCountry.length === 0) {
        throw new Error(
          `emission factor for ${id}, ${country} or ${countryDefault}, ${version} not found`
        );
      }
      selectedModelParameter = inVersionRangeAndDefaultCountry[0];
    } else {
      selectedModelParameter = inVersionRangeAndMatchingCountry[0];
    }

    return {
      id,
      label: selectedModelParameter.label,
      source: selectedModelParameter.source,
      value: selectedModelParameter.value,
      unit: selectedModelParameter.unit as EmissionFactorUnit,
      countryId: selectedModelParameter.connectedEntityIds[0],
      version: selectedModelParameter.version,
      comments: selectedModelParameter.comments,
      deprecated: selectedModelParameter.deprecated,
    };
  },
};
