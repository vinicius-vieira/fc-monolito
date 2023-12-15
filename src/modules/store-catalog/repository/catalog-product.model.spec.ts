import { Sequelize } from "sequelize-typescript";
import CatalogProductRepository from "./catalog-product.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import CatalogProductModel from "./catalog-product.model";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CatalogProductModel]);
    await sequelize.sync();
  });

  afterEach(() => {
    sequelize.close();
  });

  test("should find all products", async () => {
    const productProps1 = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 1.0,
    };

    const productProps2 = {
      id: "2",
      name: "Product 2",
      description: "Product 2 description",
      salesPrice: 2.0,
    };

    await CatalogProductModel.create(productProps1);

    await CatalogProductModel.create(productProps2);

    const productRepository = new CatalogProductRepository();

    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id.id).toBe(productProps1.id);
    expect(products[0].name).toBe(productProps1.name);
    expect(products[0].description).toBe(productProps1.description);
    expect(products[0].salesPrice).toBe(productProps1.salesPrice);

    expect(products[1].id.id).toBe(productProps2.id);
    expect(products[1].name).toBe(productProps2.name);
    expect(products[1].description).toBe(productProps2.description);
    expect(products[1].salesPrice).toBe(productProps2.salesPrice);
  });

  test("should find all products", async () => {
    const productProps1 = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 1.0,
    };

    const productProps2 = {
      id: "2",
      name: "Product 2",
      description: "Product 2 description",
      salesPrice: 2.0,
    };

    await CatalogProductModel.create(productProps1);

    await CatalogProductModel.create(productProps2);

    const productRepository = new CatalogProductRepository();

    const product = await productRepository.find(productProps1.id);

    expect(product.id.id).toBe(productProps1.id);
    expect(product.name).toBe(productProps1.name);
    expect(product.description).toBe(productProps1.description);
    expect(product.salesPrice).toBe(productProps1.salesPrice);
  });
});
