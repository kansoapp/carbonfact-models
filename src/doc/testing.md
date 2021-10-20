# Testing

To test the model and prevent regressions:

- Regularly add new end-to-end tests in `__tests/endToEndComputation.test.ts`
- When changing the model, compute the sum of footprints of all product data submissions and check it is the same as the one with the current version of the model.
