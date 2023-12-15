import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for invoice", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should get a invoice", async () => {
    const response = await request(app).post("/invoice/1").send();

    expect(response.status).toBe(200);

    expect(response.body.id).toBeDefined();
  });
});
