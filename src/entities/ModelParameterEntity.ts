import { ModelVersion } from "../types";

export type Unit = "kgCO2eq" | "kgCO2eq/kg" | "kWh";

// TECHNICAL-DEBT some duplication with EmissionFactorEntity
// TODO: add "label" (short, e.g. for dropdowns), "description", "explanation"
export type ModelParameterEntity = {
  id: string; // path to identify the model parameter
  source: string; // human-readable explanation and sources
  description: string;
  value: number;
  unit: Unit;
  countryIds?: string[];
  version: ModelVersion;
  comments?: string;
};
