export interface ModelParameter {
  id: string;
  label: string;
  source: string;
  value: number;
  unit: "kgCO2eq" | "kgCO2eq/kg" | "kWh" | "kgCO2eq/kWh";
  connectedEntityIds: string[];
  comments?: string;
}

export interface ModelEntity {
  id: string;
  label: string;
  default?: boolean;
}

const countryDefault = "world";

const modelEntities: ModelEntity[] = [
  {
    id: "country/china",
    label: "China",
  },
  {
    id: "country/vietnam",
    label: "Vietnam",
  },
  {
    id: "country/spain",
    label: "Spain",
  },
  {
    id: "country/world",
    label: "World",
    default: true,
  },
];

const modelParameters: ModelParameter[] = [
  {
    id: "emissionFactor/material/cotton/standard",
    label: "Cotton",
    source: "N/A",
    value: 8.02,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/world"],
  },
  {
    id: "emissionFactor/material/rubber/standard",
    label: "Rubber",
    source: "N/A",
    value: 0.38,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/world"],
  },
  {
    id: "emissionFactor/material/polyester/recycled",
    label: "Recycled polyester",
    source: "Kering database, Raw Material Intensities 2019",
    value: 26.68,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/world"],
  },
  {
    id: "emissionFactor/material/rubber/natural",
    label: "Natural rubber",
    source: "Kering database, Raw Material Intensities 2019",
    value: 0.53,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/world"],
  },
  {
    id: "emissionFactor/material/nylon/standard",
    label: "Nylon",
    source: "Kering database, Raw Material Intensities 2019",
    value: 96.94,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/world"],
  },
  {
    id: "emissionFactor/material/polyurethan/standard",
    label: "Polyurethan",
    source: "Kering database, Raw Material Intensities 2019",
    value: 10.37,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/world"],
  },
  {
    id: "emissionFactor/material/eva/standard",
    label: "Ethylene Vinyl Acetate (EVA)",
    source: "Kering database, Raw Material Intensities 2019",
    value: 7.79,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/world"],
  },
  {
    id: "emissionFactor/material/leather/cattle",
    label: "Leather",
    source: "Kering database, Raw Material Intensities 2019",
    value: 23.41,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/world"],
  },
  {
    id: "emissionFactor/material/unidentified/shoesMix",
    label: "Unidentified - Shoes mix)",
    source: "Carbonfact",
    value: 5.92,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/world"],
    comments:
      "This value is used to represent the emissions of unknown materials in our shoes model. It has been defined using the mean of the aggregate emission per kg of final product for 2 generic shoes LCA in ADEME BaseImpact database: leather shoes and cotton shoes.\n\nThe materials for the leather shoes represent a total of 3.06 kgCO2eq (NB: ADEME's model doesn't include the cattle stock raising in the material's emissions) and weight 0.8 kg. The emission factor is thus 3.06 / 0.8 = 3.82 kgCO2eq/kg.\n\nFor the cotton shoes, the emission factor is 4.81 / 0.6 = 8.02 kgCO2eq/kg.\n\nThe result is then (3.82 + 8.02) / 2 = 5.92.",
  },
  {
    id: "emissionFactor/energy/electricity/china",
    label: "Electricity (China)",
    source: "N/A",
    value: 0.6,
    unit: "kgCO2eq/kWh",
    connectedEntityIds: ["country/china"],
  },
  {
    id: `emissionFactor/energy/electricity/${countryDefault}`,
    label: `Electricity (${countryDefault} average)`,
    source: "N/A",
    value: 0.6,
    unit: "kgCO2eq/kWh",
    connectedEntityIds: ["country/world"],
  },
  {
    id: "lifeCycleAnalysisStep/manufacturing/shoes/energyConsumption/electricity",
    label: "Electricity consumed for manufacturing a pair of shoes",
    source: "ADEME BaseImpact",
    value: 6.0,
    unit: "kWh",
    connectedEntityIds: ["country/world"],
  },
  {
    id: "lifeCycleAnalysisStep/use/shoes",
    label: "Emissions for use of a pair of shoes",
    source: "ADEME BaseImpact",
    value: 1.5,
    unit: "kgCO2eq",
    connectedEntityIds: ["country/world"],
  },
  {
    id: "lifeCycleAnalysisStep/transport/shoes/china",
    label: "Emissions for transporting a pair of shoes from China",
    source:
      "Fixed amount for a shoe made in China, according to AllBirds report",
    value: 2.0,
    unit: "kgCO2eq",
    connectedEntityIds: ["country/world"],
  },
  {
    id: `lifeCycleAnalysisStep/transport/shoes/${countryDefault}`,
    label: "Emissions for transporting a pair of shoes non-China origins",
    source: "N/A",
    value: 0.6,
    unit: "kgCO2eq",
    connectedEntityIds: ["country/world"],
  },
  {
    id: "lifeCycleAnalysisStep/endOfLife/shoes/withoutRecyclingProgram",
    label:
      "Emissions for the end of life of a pair of shoes, in case there is no known end-of-life recycling program.",
    source: "N/A",
    value: 1.4,
    unit: "kgCO2eq",
    connectedEntityIds: ["country/world"],
  },
  {
    id: "lifeCycleAnalysisStep/endOfLife/shoes/withRecyclingProgram",
    label:
      "Emissions for the end of life of a pair of shoes, in case there is a known end-of-life recycling program (a 50% bonus is applied - coefficient chosen arbitrarily by Carbonfact)",
    source: "N/A",
    value: 0.7,
    unit: "kgCO2eq",
    connectedEntityIds: ["country/world"],
  },
];

function filteredModelEntities(prefix: string): () => ModelEntity[] {
  return () => {
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
  };
}

function filteredModelParameters(prefix: string): () => ModelParameter[] {
  return () => {
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
  };
}

export const emissionFactorsForMaterials = filteredModelParameters(
  "emissionFactor/material/"
)();

export const emissionFactorsForElectricity = filteredModelParameters(
  "emissionFactor/energy/electricity/"
)();

export const countries = filteredModelEntities("country/")();

export function findModelParameter(id: string): ModelParameter | undefined {
  return modelParameters.find((p) => p.id == id);
}

export function findEmissionFactorForElectricityWithCountry(
  country: string
): ModelParameter {
  let emissionFactor =
    emissionFactorsForElectricity.find((f) => f.id == country) ||
    emissionFactorsForElectricity.find((f) => f.id == countryDefault);
  if (!emissionFactor) {
    throw new Error(
      `Could not find emission factor for electricity in ${country} nor default value (${countryDefault})`
    );
  }
  return emissionFactor!;
}

export function findEmissionFactorForMaterialWithId(
  materialId: string
): ModelParameter | undefined {
  return emissionFactorsForMaterials.find((f) => f.id == materialId);
}

export function findEmissionsForTransportOfShoesFromCountry(
  country: string
): ModelParameter {
  let emissionFactor =
    findModelParameter(`lifeCycleAnalysisStep/transport/shoes/${country}`) ||
    findModelParameter(
      `lifeCycleAnalysisStep/transport/shoes/${countryDefault}`
    );
  if (!emissionFactor) {
    throw new Error(
      `Could not find emission factor for transport of shoes from ${country} nor default value (${countryDefault})`
    );
  }
  return emissionFactor!;
}

export function findCountryForId(id: string): ModelEntity | undefined {
  return countries.find((c) => c.id == id);
}
