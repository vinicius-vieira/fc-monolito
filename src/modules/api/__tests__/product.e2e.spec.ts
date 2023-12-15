import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/products").send({
      name: "Product 1",
      description: "Desc Produc 1",
      purchasePrice: 1.0,
      stock: 10,
    });

    expect(response.status).toBe(200);

    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("Product 1");
    expect(response.body.purchasePrice).toBeGreaterThanOrEqual(1.0);
    expect(response.body.description).toBe("Desc Produc 1");
    expect(response.body.stock).toBeGreaterThanOrEqual(10);
  });
});
