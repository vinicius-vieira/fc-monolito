import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for checkout", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a checkout", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1c",
        products: [{ productId: "1p" }],
      });

    expect(response.status).toBe(200);

    expect(response.body.id).toBeDefined();
    expect(response.body.products).toBeDefined();
  });
});
