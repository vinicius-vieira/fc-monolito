import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/entity/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product1 = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  salePrice: 100,
});

const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  description: "Product 2 description",
  salePrice: 100,
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product1)),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("FindAllProducts tests", () => {
  it("should find all products", async () => {
    const productRepository = MockRepository();
    const findAllUseCase = new FindAllProductsUseCase(productRepository);
    const result = await findAllUseCase.execute();

    expect(productRepository.findAll).toBeCalled();
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(product1.id.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].description).toBe(product1.description);
    expect(result.products[0].salesPrice).toBe(product1.salesPrice);
  });
});
