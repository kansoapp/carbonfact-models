# Model versions

## 0.5.0

- Removed the `world` fallback mechanism for emission factors.
- Added and updated emission factors.
- Removed deprecated emission factors and the `deprecated` and `replacedBy` properties.
- Added new product templates, differentiating between leather, plastic and vegetal sneakers.

_NB: this version is not retro-compatible (it's not possible to compute values for older versions with this implementation). This has been done to enable reducing code and cleaning up the emission factors list._

### Removed the `world` fallback mechanism for emission factors

In previous versions, the model may use a default value for an emission factor which was not available for the product's country. Some materials had an emission factor associated with the `world`, which would then serve as default value.

In the beginning, this was useful to simplify managing emission factors. Every new product was manually reviewed, so errors could not be introduced. To import a growing number of products that cannot be all manually reviewed, we need to remove this fallback mechanism that may introduce silent errors. For example, if a new (material, country) combination is introduced, the model may continue to work even if the appropriate emission factor is not present in the parameters, due to the presence of the default value.

Emission factors are now attached to a list of country IDs. This list makes it explicit to use a given emission factor for a given country.

### Added and updated emission factors

- Emission factors have been added to support values for new countries and new materials.
- Emission factors have been reviewed to ensure they were up-to-date and as accurate as possible. The reviewed emission factors have been updated to model version `0.5.0`.

### Removed old and deprecated emission factors, and the `deprecated` and `replacedBy` properties

The modelling of emission factors and model parameters has been simplified to make it easier to use and less error-prone.

- Emission factors are attached to a list of countries (instead of "connected entities"),
- `deprecated` and `isReplacedBy` properties have been removed:

  - For auditing purposes, the versioning of the model parameters via Git could be used instead of keeping old and deprecated emission factors.
  - While this could be used to make more dynamic changes in emission factors, until it was implemented in the model, this could only be a source of errors (e.g. by using a deprecated emission factor).

History of emission factors (previous model versions) have been removed too.

## 0.4.0

### Multiple distribution mode

We now support the following emission values for distribution mode:

- [intercontinental (default)](https://github.com/kansoapp/carbonfact-models/blob/1a0c644d76ba3f91e11af3381d34c5d12484c44a/src/data/parameters.ts#L1532)
- [sea only](https://github.com/kansoapp/carbonfact-models/blob/1a0c644d76ba3f91e11af3381d34c5d12484c44a/src/data/parameters.ts#L1543)
- [sea only biofuel](https://github.com/kansoapp/carbonfact-models/blob/1a0c644d76ba3f91e11af3381d34c5d12484c44a/src/data/parameters.ts#L1554)
- [intracontinental](https://github.com/kansoapp/carbonfact-models/blob/1a0c644d76ba3f91e11af3381d34c5d12484c44a/src/data/parameters.ts#L1565)

### Materials

In the 0.3.0 release we introduced the following capabilities:

- Introduced possibility to have a component made of a mix of materials.
- Introduced component country of origin, to associate the emission factors for the materials of this component with this country rather than with the manufacturing country.

### End of life

We support custom parameter for end of life emission factor when that information is provided in Lifecycle Analysis.

## 0.3.0

- Introduced possibility to have a component made of a mix of materials.
- Introduced component country of origin, to associate the emission factors for the materials of this component with this country rather than with the manufacturing country.

## 0.2.0

- Completed the model with additional emission factors, improved some emission factors, in particular adding more details on the sources.
- Introduced a solution to expand `PartialProductData` and fill some characteristics from a template. For example:
  - Assume we have sneaker from Brand A.
  - Brand A shared with us the average weight distribution of its sneakers and the outsole is 55%.
  - If we add a new product from Brand A but we don't know the weight of the outsole, specifying a template would enable us to use the average shared by the brand and use it for this product.
  - If we get the real measure for this product later, we can still fill the field, the template will then not be used (for this field at list).
- The `ProductData` schema was updated to `v0.2.0` to support partial data.

## 0.1.0

- Initial model version, fitted to support calculating the footprint the first products we submitted.
- The model was using `ProductData` in `v0.1.0` which was providing values for all fields in the schema.
