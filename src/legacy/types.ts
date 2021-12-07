import { ProductComponentId } from "../entities/ProductDataEntity";
import { ModelVersion } from "../types";

export interface ModelParameter {
  id: string; // a path to identify the entity represented by this parameter
  label: string; // a human-readable string to display the model parameter in the UI
  description?: string;
  source: string; // human-readable explanation and sources
  value: number;
  variationCoefficient?: number;
  unit: "kgCO2eq" | "kgCO2eq/kg" | "kWh" | "kgCO2eq/kWh";
  countryIds?: string[];
  comments?: string;
  version: ModelVersion;
}

export interface ProductDataComponent {
  componentId: ProductComponentId;
  materialId: string;
  materialSourceUrls: string[];
  proportion: number;
  proportionSourceUrls: string[];
}

export interface ProductData {
  modelVersion: string;
  weight: number;
  weightSourceUrls: string[];
  components: ProductDataComponent[];
  manufacturingCountry: string;
  manufacturingCountrySourceUrls: string[];
  endOfLifeRecyclingProgram: boolean;
  endOfLifeRecyclingProgramSourceUrls: string[];
}

export interface ProductDataTemplate extends ProductData {
  id: string; // referenced by ProductDataPartial.templateId
  label: string; // to be displayed in UI
  source: string; // explains how the template was constructed and/or gives the sources
}

export interface ProductDataComponentPartial {
  componentId: ProductComponentId;
  materialId: string;
  materialSourceUrls: string[];
  proportion?: number;
  proportionSourceUrls?: string[];
}

export interface ProductDataPartial {
  templateId: string;
  modelVersion: string; // TECHNICAL-DEBT: should be ModelVersion
  weight?: number;
  weightSourceUrls?: string[];
  components?: ProductDataComponentPartial[];
  manufacturingCountry?: string;
  manufacturingCountrySourceUrls?: string[];
  endOfLifeRecyclingProgram?: boolean;
  endOfLifeRecyclingProgramSourceUrls?: string[];
}
