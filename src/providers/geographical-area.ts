type GeographicalAreaBase = {
  id: string;
  label: string;
};
type Continent = GeographicalAreaBase & {
  type: "continent";
};
type Country = GeographicalAreaBase & {
  type: "country";
  parentId: string;
};
export type GeographicalArea = Continent | Country;

export interface IGeographicalAreaProvider {
  /**
   * Returns the GeographicalAreaEntity matching the specified id.
   *
   * If there is no match, throws an Error.
   */
  getById: (id: string) => GeographicalArea;

  /**
   * Returns all countries.
   */
  allCountries: () => GeographicalArea[];
}

export const continents: { [key: string]: GeographicalArea } = {
  asia: { id: "asia", label: "Asia", type: "continent" },
  europe: {
    type: "continent",
    id: "europe",
    label: "Europe",
  },
  southAmerica: {
    type: "continent",
    id: "southAmerica",
    label: "South America",
  },
  africa: {
    type: "continent",
    id: "africa",
    label: "Africa",
  },
};

export const countries: { [id: string]: Country } = {
  china: {
    type: "country",
    id: "china",
    label: "China",
    parentId: "asia",
  },
  vietnam: {
    type: "country",
    id: "vietnam",
    label: "Vietnam",
    parentId: "asia",
  },
  italy: { type: "country", id: "italy", label: "Italy", parentId: "europe" },
  spain: { type: "country", id: "spain", label: "Spain", parentId: "europe" },
  portugal: {
    type: "country",
    id: "portugal",
    label: "Portugal",
    parentId: "europe",
  },
  greece: {
    type: "country",
    id: "greece",
    label: "Greece",
    parentId: "europe",
  },
  peru: {
    type: "country",
    id: "peru",
    label: "Peru",
    parentId: "southAmerica",
  },
  france: {
    type: "country",
    id: "france",
    label: "France",
    parentId: "europe",
  },
  senegal: {
    type: "country",
    id: "senegal",
    label: "Senegal",
    parentId: "africa",
  },
};

export const buildGeographicalAreaProvider: () => IGeographicalAreaProvider =
  () => {
    return {
      getById: (id: string) => {
        return countries[id] || continents[id];
      },

      allCountries: () => {
        return Object.values(countries);
      },
    };
  };
