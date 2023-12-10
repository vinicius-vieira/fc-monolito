import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/entity/product.entity";
import FindAProductInputDto from "./dto/find-product.dto";
import FindProductUseCase from "./find-product.usecase";

const product1 = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  salePrice: 100,
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product1)),
    findAll: jest.fn(),
  };
};

describe("FindProductUseCase tests", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);
    const result = await findProductUseCase.execute({
      id: product1.id.id,
    } as FindAProductInputDto);

    expect(productRepository.find).toBeCalled();
    expect(result.id).toBe(product1.id.id);
    expect(result.name).toBe(product1.name);
    expect(result.description).toBe(product1.description);
    expect(result.salesPrice).toBe(product1.salesPrice);
  });
});
