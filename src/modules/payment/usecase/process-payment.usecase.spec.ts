import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/entity/transaction.entity";
import ProcessPaymentUseCase from "./process-payment.usecase";

describe("process payment usecase unit test", () => {
  it("shoud aprove a transaction", async () => {
    const transactionApproved = new Transaction({
      id: new Id("1"),
      orderId: "1",
      amount: 100,
      status: "approved",
    });

    const MockRepositoryApprove = () => {
      return {
        save: jest.fn().mockReturnValue(Promise.resolve(transactionApproved)),
      };
    };

    const paymentRepository = MockRepositoryApprove();
    const usecase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 100,
    };

    const result = await usecase.execute(input);

    expect(paymentRepository.save).toBeCalled();
    expect(result).toBeDefined();
    expect(result.transactionId).toBe(transactionApproved.id.id);
    expect(result.amount).toBe(transactionApproved.amount);
    expect(result.status).toBe(transactionApproved.status);
    expect(result.orderId).toBe(transactionApproved.orderId);
    expect(result.updatedAt).toBeDefined();
    expect(result.createdAt).toBeDefined();
  });

  it("shoud decline a transaction", async () => {
    const transactionDeclined = new Transaction({
      id: new Id("1"),
      orderId: "1",
      amount: 50,
      status: "declined",
    });

    const MockRepositoryDeclined = () => {
      return {
        save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined)),
      };
    };

    const paymentRepository = MockRepositoryDeclined();
    const usecase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 50,
    };

    const result = await usecase.execute(input);

    expect(paymentRepository.save).toBeCalled();
    expect(result).toBeDefined();
    expect(result.transactionId).toBe(transactionDeclined.id.id);
    expect(result.amount).toBe(transactionDeclined.amount);
    expect(result.status).toBe(transactionDeclined.status);
    expect(result.orderId).toBe(transactionDeclined.orderId);
    expect(result.updatedAt).toBeDefined();
    expect(result.createdAt).toBeDefined();
  });
});
