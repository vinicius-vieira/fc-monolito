import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app).post("/clients").send({
      name: "req.body.name",
      email: "req.body.email",
      document: "req.body.document",
      street: "req.body.street",
      number: "req.body.number",
      complement: "req.body.complement",
      city: "req.body.city",
      state: "req.body.state",
      zipCode: "req.body.zipCode",
    });

    expect(response.status).toBe(200);

    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("req.body.name");
  });
});
