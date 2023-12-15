import { Sequelize, UpdatedAt } from "sequelize-typescript";
import OrderModel from "./order.model";

describe("OrderModel test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([OrderModel]);
    await sequelize.sync();
  });

  afterEach(() => {
    sequelize.close();
  });

  test("should create and find all orders", async () => {
    const orderProps1 = {
      id: "1o",
      status: "approved",
      clientId: "1c",
      products: [{ productId: "1p" }, { productId: "2p" }],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const orderProps2 = {
      id: "2o",
      status: "approved",
      clientId: "2c",
      products: [{ productId: "31p" }, { productId: "4p" }],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await OrderModel.create(orderProps1);

    await OrderModel.create(orderProps2);

    const orders = await OrderModel.findAll({ raw: true });

    expect(orders.length).toBe(2);
    expect(orders[0].id).toBe(orderProps1.id);
    expect(orders[0].status).toBe(orderProps1.status);
    expect(orders[0].clientId).toBe(orderProps1.clientId);

    expect(orders.length).toBe(2);
    expect(orders[1].id).toBe(orderProps2.id);
    expect(orders[1].status).toBe(orderProps2.status);
    expect(orders[1].clientId).toBe(orderProps2.clientId);
  });
});
