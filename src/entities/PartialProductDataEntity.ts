import { ProductComponentId } from "./ProductDataEntity";

export type PartialMaterialItem = {
  materialId: string;
  proportion?: number;
};

// TECHNICAL-DEBT could probably extract the type instead of building it
//   and composing the other one with it.
export type PartialProductDataEntityComponent = {
  componentId: ProductComponentId;
  materials?: PartialMaterialItem[];
  materialCountryId?: string;
  proportion?: number;
};

// TECHNICAL-DEBT could use TS's <Partial> type utility
export interface PartialProductDataEntity {
  weight?: number;
  components?: PartialProductDataEntityComponent[];
  manufacturingCountryId?: string;
  distributionMode?: string;
  endOfLifeRecyclingProgram?: boolean;
  endOfLifeOption?: string;
  endOfLifeValue?: number | null;
}
