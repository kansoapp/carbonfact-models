# Model versions

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
