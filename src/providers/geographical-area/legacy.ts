import { modelEntities } from "../../data/parameters";
import { GeographicalAreaEntity } from "../../entities/GeographicalAreaEntity";
import { IGeographicalAreaProvider } from "../interfaces";

export const LegacyGeographicalAreaProvider: () => IGeographicalAreaProvider =
  () => {
    return {
      getById: (id: string) => {
        return {
          id,
          label: `${id[0].toUpperCase()}${id.slice(1)}`,
          type: "country",
          parentId: (() => {
            if (countriesInAsia.includes(id)) return "asia";
            if (countriesInEurope.includes(id)) return "europe";
            if (countriesInSouthAmerica.includes(id)) return "south-america";
            if (countriesInAfrica.includes(id)) return "africa";
            throw new Error(`unknown geographical area: ${id}`);
          })(),
        };
      },

      allCountries: () => {
        return modelEntities.map((me) => {
          const country = me.id.replace("country/", "");
          return {
            id: country,
            label: `${country[0].toUpperCase()}${country.slice(1)}`,
            type: "country",
            parentId: (() => {
              if (countriesInAsia.includes(country)) return "asia";
              if (countriesInEurope.includes(country)) return "europe";
              if (countriesInSouthAmerica.includes(country))
                return "south-america";
              if (countriesInAfrica.includes(country)) return "africa";
            })(),
          };
        });
      },

      getParent: (ga: GeographicalAreaEntity) => {
        const parentId = ga.parentId;
        if (!parentId && ga.id !== "world")
          throw new Error(
            `unexpected geographical area without parent: ${ga.id}`
          );
        if (!parentId) return undefined;
        switch (parentId) {
          case "asia":
            return {
              id: "asia",
              label: "Asia",
              type: "continent",
              parentId: "world",
            };
          case "europe":
            return {
              id: "europe",
              label: "Europe",
              type: "continent",
              parentId: "world",
            };
          case "south-america":
            return {
              id: "south-america",
              label: "South America",
              type: "continent",
              parentId: "world",
            };
          case "africa":
            return {
              id: "africa",
              label: "Africa",
              type: "continent",
              parentId: "world",
            };
          case "world":
            return {
              id: "world",
              label: "World",
              type: "world",
              parentId: undefined,
            };
          default:
            throw new Error(`unexpected geographical area parent: ${parentId}`);
        }
      },
    };
  };

// TECHNICAL-DEBT until we correctly handle geographical areas
// We use exhaustive lists to ensure that adding a new country would
// not silently introduce a model error.
const countriesInAsia = ["china", "vietnam"];
const countriesInEurope = ["france", "italy", "spain", "portugal", "greece"];
const countriesInSouthAmerica = ["peru"];
const countriesInAfrica = ["senegal"];
