import {
  productFootprintTotal,
  ProductFootprintEntity,
} from "./ProductFootprintEntity";

test("footprintTotal is the sum of the footprint's parts", () => {
  const entity: ProductFootprintEntity = {
    materials: 1.1,
    manufacturing: 1.2,
    distribution: 1.3,
    use: 1.4,
    endOfLife: 1.5,
  };
  expect(productFootprintTotal(entity)).toBeCloseTo(6.5);
});
