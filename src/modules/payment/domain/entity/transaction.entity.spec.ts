import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "./transaction.entity";

describe("client entity unit test", () => {
  it("shoud create a transaction", () => {
    const transaction = new Transaction({
      id: new Id("1"),
      amount: 10,
      orderId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(transaction).toBeDefined();
    expect(transaction.hasErrors()).toBe(false);
    expect(transaction.id.id).toBe("1");
    expect(transaction.amount).toBe(10);
    expect(transaction.orderId).toBe("1");
    expect(transaction.createdAt).toBeDefined();
    expect(transaction.updatedAt).toBeDefined();
  });

  it("shoud create a invalid transaction when amount letter then 0", () => {
    const transaction = new Transaction({
      id: new Id("1"),
      amount: -10,
      orderId: "1",
    });

    expect(transaction).toBeDefined();
    expect(transaction.hasErrors()).toBe(true);
    expect(transaction.getErros().length).toBe(1);
    expect(transaction.getErros()[0].message).toBe(
      "Total inválido, deve ser maior que 0."
    );
  });

  it("shoud approve transaction when amount is letter then 100", () => {
    const transaction = new Transaction({
      id: new Id("1"),
      amount: 10,
      orderId: "1",
    });

    expect(transaction).toBeDefined();
    expect(transaction.hasErrors()).toBe(false);

    transaction.process();

    expect(transaction.status).toBe("declined");
    expect(transaction.hasErrors()).toBe(true);
    expect(transaction.getErros().length).toBe(1);
    expect(transaction.getErros()[0].message).toBe(
      "Apenas transação com valor maior que 100.0 será aprovada"
    );
  });

  it("shoud approve transaction when amount is greatter then 100", () => {
    const transaction = new Transaction({
      id: new Id("1"),
      amount: 220,
      orderId: "1",
    });

    expect(transaction).toBeDefined();
    expect(transaction.hasErrors()).toBe(false);

    transaction.process();

    expect(transaction.status).toBe("approved");
    expect(transaction.hasErrors()).toBe(false);
  });
});
