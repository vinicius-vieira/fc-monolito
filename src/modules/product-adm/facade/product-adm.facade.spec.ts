import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import AddProductAdmFacedeInputDto from "./dto/add-product-adm-facade.dto";
import ProductAdmFacedeFactory from "../factory/product-adm.factory";
import CheckStockFacadeInputDto from "./dto/add-product-adm-facade.dto";

describe("ProductAdmFacade test", () => {
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
    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 1.0,
      stock: 100,
    } as AddProductAdmFacedeInputDto;

    const productAdmFacade = ProductAdmFacedeFactory.create();
    productAdmFacade.addProduct(input);

    const productdb = await ProductModel.findOne({
      where: { id: input.id },
      raw: true,
    });

    expect(productdb).toBeDefined();
    expect(input.id).toEqual(productdb.id);
    expect(input.name).toEqual(productdb.name);
    expect(input.description).toEqual(productdb.description);
    expect(input.purchasePrice).toEqual(productdb.purchasePrice);
    expect(input.stock).toEqual(productdb.stock);
  });

  test("should checkstock of product", async () => {
    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 1.0,
      stock: 100,
    } as AddProductAdmFacedeInputDto;

    const productAdmFacade = ProductAdmFacedeFactory.create();
    await productAdmFacade.addProduct(input);

    const inputChekout = {
      productId: input.id,
    } as CheckStockFacadeInputDto;

    const result = await productAdmFacade.checkStock(inputChekout);

    expect(result.productId).toBe(input.id);
    expect(result.stock).toBe(input.stock);
  });
});
