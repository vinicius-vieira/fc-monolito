import { Sequelize } from "sequelize-typescript";
import CatalogProductModel from "../repository/catalog-product.model";
import StoreCatalogFacadeFactory from "../factory/store-catalog-facade-factory";
import FindStoreCatalogFacadeInputDto from "./dto/store-catalog-facade.dto";

describe("StoreCatalogFacade test", () => {
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

  test("should find a product", async () => {
    const facade = StoreCatalogFacadeFactory.create();
    const product = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 1.0,
    };

    await CatalogProductModel.create(product);

    const result = await facade.find({
      id: product.id,
    } as FindStoreCatalogFacadeInputDto);

    expect(product.id).toEqual(result.id);
    expect(product.name).toEqual(result.name);
    expect(product.description).toEqual(result.description);
    expect(product.salesPrice).toEqual(result.salesPrice);
  });

  test("should find all products", async () => {
    const facade = StoreCatalogFacadeFactory.create();
    const product = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 1.0,
    };

    const product2 = {
      id: "2",
      name: "Product 2",
      description: "Product 2 description",
      salesPrice: 1.0,
    };

    await CatalogProductModel.create(product);
    await CatalogProductModel.create(product2);

    const result = await facade.findAll();

    expect(result.products.length).toBe(2);

    expect(product.id).toEqual(result.products[0].id);
    expect(product.name).toEqual(result.products[0].name);
    expect(product.description).toEqual(result.products[0].description);
    expect(product.salesPrice).toEqual(result.products[0].salesPrice);

    expect(product2.id).toEqual(result.products[1].id);
    expect(product2.name).toEqual(result.products[1].name);
    expect(product2.description).toEqual(result.products[1].description);
    expect(product2.salesPrice).toEqual(result.products[1].salesPrice);
  });
});
