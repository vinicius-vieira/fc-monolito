import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import TransactionModel from "./transaction.model";
import Transaction from "../domain/entity/transaction.entity";
import TransactionRepository from "./transaction.repository";

describe("payment repository test", () => {
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
    const transactionProps = {
      id: new Id("1"),
      amount: 100.0,
      status: "approved",
      orderId: "1",
    };

    const transaction = new Transaction(transactionProps);
    const transactionRepository = new TransactionRepository();
    await transactionRepository.save(transaction);

    const transdb = await TransactionModel.findOne({
      where: { id: transactionProps.id.id },
      raw: true,
    });

    expect(transactionProps.id.id).toEqual(transdb.id);
    expect(transactionProps.amount).toEqual(transdb.amount);
    expect(transactionProps.status).toEqual(transdb.status);
    expect(transactionProps.orderId).toEqual(transdb.orderId);
  });
});
