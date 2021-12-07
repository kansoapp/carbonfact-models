import { EmissionFactorEntity } from "./EmissionFactorEntity";
import { ModelParameterEntity, Unit } from "./ModelParameterEntity";
import { ProductComponentId } from "./ProductDataEntity";

export type ProductFootprintEntity = {
  total: number;
  breakdown: {
    materials: number;
    manufacturing: number;
    distribution: number;
    use: number;
    endOfLife: number;
  };
  explanation?: ProductFootprintExplanation;
};

export type ProductFootprintExplanation = {
  materials: {
    components: {
      componentId: ProductComponentId;
      materials: {
        materialId: string;
        proportion: number;
        emissionFactor: EmissionFactorEntity;
        humanReadable: string;
      }[];
      proportion: number;
      total: number;
      unit: Unit;
    }[];
    humanReadable: string;
  };
  manufacturing: {
    humanReadable: string;
  };
  distribution: {
    modelParameter: ModelParameterEntity;
    humanReadable: string;
  };
  use: {
    humanReadable: string;
  };
  endOfLife: {
    modelParameter?: ModelParameterEntity;
    humanReadable: string;
  };
  total: {
    humanReadable: string;
  };
};
