export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class InvalidRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidRequestError";
  }
}

export class MissingEmissionFactorMappingError extends Error {
  materialId: string;
  countryId: string;
  modelVersion: string;

  constructor(materialId: string, countryId: string, modelVersion: string) {
    super(
      `Missing emission factor for id "${materialId}", country "${countryId}", model version "${modelVersion}"`
    );

    // Necessary for Typescript
    Object.setPrototypeOf(this, MissingEmissionFactorMappingError.prototype);

    this.materialId = materialId;
    this.countryId = countryId;
    this.modelVersion = modelVersion;
  }
}
