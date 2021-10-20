import { compare } from "../../../_lib/sorting";
import {
  countryDefault,
  modelParameters as allModelParameters,
} from "../data/parameters";
import { ModelParameterEntity, Unit } from "../entities/ModelParameterEntity";
import { ModelParameter } from "../legacy/types";
import { IModelParameterProvider } from "../operations/ComputeProductFootprint";
import { ModelVersion } from "../types";

const modelParameters = allModelParameters.filter((mp) =>
  mp.id.startsWith("fixedValue/")
);

export const ModelParameterProvider: IModelParameterProvider = {
  get: (id: string, country: string, version: ModelVersion) => {
    // TECHNICAL-DEBT: duplication with EmissionFactorProvider

    const inVersionRange = modelParameters.filter(
      (mp) => mp.id === `fixedValue/${id}` && mp.version <= version
    );
    const inVersionRangeAndMatchingCountry = inVersionRange.filter(
      (mp) => mp.connectedEntityIds[0] === `country/${country}`
    );
    inVersionRangeAndMatchingCountry.sort((mp1, mp2) =>
      compare<string>(mp1.version, mp2.version, "desc")
    );

    let selectedModelParameter: ModelParameter;
    if (inVersionRangeAndMatchingCountry.length === 0) {
      const inVersionRangeAndDefaultCountry = inVersionRange.filter(
        (ef) => ef.connectedEntityIds[0] === `country/${countryDefault}`
      );
      inVersionRangeAndDefaultCountry.sort((mp1, mp2) =>
        compare<string>(mp1.version, mp2.version, "desc")
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

    const modelParameter: ModelParameterEntity = {
      id,
      source: selectedModelParameter.source,
      description: selectedModelParameter.label, // TECHNICAL-DEBT: should be description
      value: selectedModelParameter.value,
      unit: selectedModelParameter.unit as Unit,
      countryId: selectedModelParameter.connectedEntityIds[0],
      version: selectedModelParameter.version,
      comments: selectedModelParameter.comments,
      deprecated: selectedModelParameter.deprecated,
    };
    return modelParameter;
  },
};
