import { ModelVersion } from "../types";

export type EmissionFactorUnit = "kgCO2eq/kg" | "kgCO2eq/kWh";

export type EmissionFactorEntity = {
  id: string; // path to identify the entity represented by this parameter (not unique, several emission factors could share an id but differ in country, version...)
  label: string; // human-readable string to display the model parameter in the UI (e.g. labels, dropdowns...)
  description?: string; // human-readable description of the material (e.g. what it's made of, how...)
  source: string; // human-readable explanation and sources
  value: number;
  unit: EmissionFactorUnit;
  countryIds: string[];
  version: ModelVersion;
  comments?: string;
};
