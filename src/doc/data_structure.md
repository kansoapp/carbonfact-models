# Data structure

## Data entities

Must only contain data that is independent from the model or engine implementation details.

For example, `productCategoryId` and `templateId` are not intrinsec data points for a product, rather metadata we associate to match our model implementation. That's why they're not within the data entity structure but transported along it to provide context.
