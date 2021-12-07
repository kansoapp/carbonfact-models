import { compare } from "../lib/sorting";
import { modelParameters as allModelParameters } from "../data/parameters";
import { ModelParameterEntity, Unit } from "../entities/ModelParameterEntity";
import { ModelParameter } from "../legacy/types";
import { ModelVersion } from "../types";

const modelParameters = allModelParameters.filter((mp) =>
  mp.id.startsWith("fixedValue/")
);

export interface ModelParameterProvider {
  /**
   * Returns the model parameters for the given id and model version.
   *
   * Rules
   * -----
   * - If `countryId` is provided, the model parameter will be searched within
   *   the ones connected to this country.
   * - If `countryId` is not provided, all model parameters matching this id
   *   must not be associated to any country. Otherwise, an error is thrown.
   */
  get: (
    id: string,
    version: ModelVersion,
    countryId?: string
  ) => ModelParameterEntity;
}

export function buildModelParameterProvider(): ModelParameterProvider {
  return {
    get: (id: string, version: ModelVersion, countryId?: string) => {
      // TECHNICAL-DEBT: duplication with EmissionFactorProvider

      let selectedModelParameter: ModelParameter;
      const inVersionRange = modelParameters.filter(
        (mp) => mp.id === `fixedValue/${id}` && mp.version <= version
      );
      if (countryId) {
        const inVersionRangeAndMatchingCountry = inVersionRange.filter((mp) =>
          mp.countryIds?.includes(countryId)
        );
        if (inVersionRangeAndMatchingCountry.length === 0) {
          throw new Error(
            `ModelParameter "${id}" for ${countryId}, ${version} not found`
          );
        }
        inVersionRangeAndMatchingCountry.sort((mp1, mp2) =>
          compare<string>(mp1.version, mp2.version, "desc")
        );
        selectedModelParameter = inVersionRangeAndMatchingCountry[0];
      } else {
        // No `countryId` provided, matching model parameters must not be associated to any country.
        if (
          inVersionRange.filter(
            (mp) => mp.countryIds && mp.countryIds.length > 0
          ).length > 0
        ) {
          throw new Error(
            `unexpected error: found ModelParameter "${id}" with countryIds while requesting without 'countryId' param`
          );
        }
        inVersionRange.sort((mp1, mp2) =>
          compare<string>(mp1.version, mp2.version, "desc")
        );
        selectedModelParameter = inVersionRange[0];
      }

      const modelParameter: ModelParameterEntity = {
        id,
        source: selectedModelParameter.source,
        description: selectedModelParameter.label, // TECHNICAL-DEBT: should be description
        value: selectedModelParameter.value,
        unit: selectedModelParameter.unit as Unit,
        countryIds: selectedModelParameter.countryIds,
        version: selectedModelParameter.version,
        comments: selectedModelParameter.comments,
      };
      return modelParameter;
    },
  };
}
