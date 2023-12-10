import { Sequelize } from "sequelize-typescript";
import ProductRepository from "./product.repository";
import ProductModel from "./product.model";
import Product from "../domain/entity/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(() => {
    sequelize.close();
  });

  test("should create a product", async () => {
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 1.0,
      stock: 100,
    };

    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productdb = await ProductModel.findOne({
      where: { id: productProps.id.id },
      raw: true,
    });

    expect(productProps.id.id).toEqual(productdb.id);
    expect(productProps.name).toEqual(productdb.name);
    expect(productProps.description).toEqual(productdb.description);
    expect(productProps.purchasePrice).toEqual(productdb.purchasePrice);
    expect(productProps.stock).toEqual(productdb.stock);
  });

  test("should find a product by id", async () => {
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 1.0,
      stock: 100,
    };

    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productdb = await productRepository.find(productProps.id.id);

    expect(productProps.id).toEqual(productdb.id);
    expect(productProps.name).toEqual(productdb.getName());
    expect(productProps.description).toEqual(productdb.getDescription());
    expect(productProps.purchasePrice).toEqual(productdb.getPurchasePrice());
    expect(productProps.stock).toEqual(productdb.getStock());
  });
});
