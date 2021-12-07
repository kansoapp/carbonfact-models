import { compare } from "../lib/sorting";
import { modelParameters } from "../data/parameters";
import { EmissionFactorUnit } from "../entities/EmissionFactorEntity";
import { ModelParameter } from "../legacy/types";
import { EmissionFactorEntity } from "../entities/EmissionFactorEntity";
import { ModelVersion } from "../types";
import { MissingEmissionFactorMappingError } from "../lib/errors";

const emissionFactors = modelParameters.filter((mp) =>
  mp.id.startsWith("emissionFactor/")
);

export interface EmissionFactorProvider {
  /**
   * Returns the emission factor corresponding to the `id` and
   * `country`, whose version is the maximum available one lower
   * than `version`.
   *
   * Throws an error when the emission factor could not be found.
   */
  get: (
    id: string,
    version: ModelVersion,
    countryId: string
  ) => EmissionFactorEntity;

  all: () => EmissionFactorEntity[];
}

export function buildEmissionFactorProvider(): EmissionFactorProvider {
  return {
    /**
     * Selection process:
     *
     * - `id` must match with `emissionFactor/<id>`,
     * - `version` must be lower than or equal to the one of the emission
     *   factor,
     * - the emission factor's country must match `countryId`.
     *
     * Throws an error if no result is found.
     *
     * Expectations
     * ------------
     *
     * Given the following values in the source data:
     *  1. id: emissionFactor/test, country: france, version: 0.1
     *  2. id: emissionFactor/test, country: germany, version: 0.2
     *  3. id: emissionFactor/test, country: germany, version: 0.3
     *
     * Expected results:
     *
     * - id="emissionFactor/test", country="france", version="0.2":
     *   returns 1 (only one matching the country)
     *
     * - id="emissionFactor/test", country="portugal", version="0.2",
     *   throws an error (no match for this country)
     *
     * - id="emissionFactor/test", country="germany", version="0.3":
     *   returns 3 (max version number matching the id and country)
     *
     * - id="emissionFactor/test", country="germany", version="0.1":
     *   throws an error because no matching emission factor with version
     *   <= 0.1.
     *
     * @param id
     * @param version
     * @param countryId
     */
    get: (id: string, version: ModelVersion, countryId: string) => {
      // TECHNICAL-DEBT: duplication with ModelParameterProvider

      const inVersionRange = emissionFactors.filter(
        (ef) => ef.id === `emissionFactor/${id}` && ef.version <= version
      );
      const inVersionRangeAndMatchingCountry = inVersionRange.filter((ef) =>
        ef.countryIds?.includes(countryId)
      );
      inVersionRangeAndMatchingCountry.sort((ef1, ef2) =>
        compare<string>(ef1.version, ef2.version, "desc")
      );

      let selectedModelParameter: ModelParameter;
      if (inVersionRangeAndMatchingCountry.length === 0)
        throw new MissingEmissionFactorMappingError(id, countryId, version);
      selectedModelParameter = inVersionRangeAndMatchingCountry[0];
      if (
        !selectedModelParameter.countryIds ||
        selectedModelParameter.countryIds.length === 0
      ) {
        throw new Error(
          `unexpected EmissionFactor "${selectedModelParameter.id}" without countryId`
        );
      }

      return {
        id,
        label: selectedModelParameter.label,
        source: selectedModelParameter.source,
        value: selectedModelParameter.value,
        unit: selectedModelParameter.unit as EmissionFactorUnit,
        countryIds: selectedModelParameter.countryIds || [],
        version: selectedModelParameter.version,
        comments: selectedModelParameter.comments,
      };
    },

    all: () => {
      return emissionFactors.map((ef) => {
        if (!ef.countryIds || ef.countryIds.length === 0) {
          throw new Error(
            `unexpected EmissionFactor "${ef.id}" without countryIds`
          );
        }
        return {
          id: ef.id,
          label: ef.label,
          source: ef.source,
          value: ef.value,
          unit: ef.unit as EmissionFactorUnit,
          countryIds: ef.countryIds,
          version: ef.version,
          comments: ef.comments,
        };
      });
    },
  };
}
