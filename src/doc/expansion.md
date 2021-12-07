# Expansion

Product data may be incomplete. This is supported by the `PartialpartialDataEntity` data structure, whose most properties are optional.

To compute the carbon footprint, all data points must be present (`partialDataEntity` has no optional fields). A partial product data may be completed using `ExpandPartialpartialData` operation.

Two different processes will complete missing data:

- expanding implicit missing values (e.g. using the manufacturing country for the material's country when not specified),
- expanding using a product template (e.g. determining the components' proportion based on the average product in the category),
- expanding with default values (e.g. completing the unaccounted for proportion of the product's mass with a default placeholder material).

## Algorithm

_NB: the order is important!_

### 1. Expand missing material country with manufacturing country

**Rule: after expansion, all `partialData.component[n].materialCountryId` fields have a non-blank value**

For each component, the material may be originating from a specific country. If no specific country is specified, the manufacturing country (`partialData.manufacturingCountryId`) is used.

**Nota bene**

- Since this is the first step, this means the template expansion (see below) will not replace a material country id expanded from the manufacturing country.
- If the partial data has no manufacturing country yet, the template's value is used.

### 2. Expanding from a template

Some other values are unknown for a given product because there is not enough data currently available. To complete these values, we use templates that we build to represent at best a standard model for the particular product category.

During expansion, any value missing from the product's data is then filled with the template's data.

For components:

- any component missing in the partial and present in the template is added using the value in the template,
- if `components.materials` is already present in the partial, it's left untouched (since it's already more accurate data than the template's), so it may remain missing values.

### 3. Expanding missing material proportions

Applies to: `partialData.components[n].materials[p].proportion`

**Rule: after expansion, `sum(partialData.components[n].materials[p].proportion, p in 0..materials.length-1)` is `0.0` or `1.0`**

If there is no information on the materials of a given component (sum is 0), it's left unchanged so that the data is completed by the template.

If the information is already complete (sum is 1), there is no change either.

Otherwise, for materials in a given component whose proportion is undefined, proportion is set to the same value so that the sum of all proportions is 1.0.

Examples:

- Component with materialA 30%, materialB ?, materialC ?: B and C proportions are set to 35% (100% - 30%) / 2.
- Component with materialA ?: A proportion is set to 100%.
- Component with materialA ?, materialB ?: A and B are set to 50%.

If all specified materials have proportion but the sum is not 1.0, the expansion adds a default material to complete (the default material is based on the product category, the component, etc.).

### 4. Expanding components with an "other" component for the remaining proportion

**Rule: after expansion, the sum of `partialData.components[n].proportion` is `1.0`**

If the sum of proportions of components is not 1.0, an "Other" component is added with a default emission factor and the remaining unidentified proportion.

### 5. Expanding `distributionMode`

**Rules**

- If present: leave unchanged.
- If missing:
  - If the manufacturing country is in Asia: set to `intercontinental/default`.
  - Otherwise: set to `intracontinental/default`.

NB: the `distributionMode` is voluntarily removed from the template so there is no risk of conflict with this business rule.
