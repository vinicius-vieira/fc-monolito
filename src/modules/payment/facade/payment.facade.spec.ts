import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import PaymentFacade from "./payment.facade";
import PaymentFacadeFactory from "../factory/payment.facade.factory";

describe("Payment Facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(() => {
    sequelize.close();
  });

  test("should create a transaction", async () => {
    const input = {
      orderId: "1",
      amount: 100,
    };

    const productAdmFacade = PaymentFacadeFactory.create();
    const transResult = await productAdmFacade.process(input);

    expect(transResult).toBeDefined();
    expect(transResult.transactionId).toBeDefined();
    expect(transResult.orderId).toEqual(input.orderId);
    expect(transResult.amount).toEqual(input.amount);
    expect(transResult.status).toEqual("approved");
    expect(transResult.createdAt).toBeDefined();
    expect(transResult.updatedAt).toBeDefined();
  });
});
