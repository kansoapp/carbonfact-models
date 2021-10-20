import { GeographicalAreaEntity } from "../entities/GeographicalAreaEntity";

export interface IGeographicalAreaProvider {
  /**
   * Returns the GeographicalAreaEntity matching the specified id.
   *
   * If there is no match, throws an Error.
   */
  getById: (id: string) => GeographicalAreaEntity;

  /**
   * Returns all countries.
   */
  allCountries: () => GeographicalAreaEntity[];

  /**
   * Returns the parent of the specified entity.
   */
  getParent: (ga: GeographicalAreaEntity) => GeographicalAreaEntity | undefined;
}
