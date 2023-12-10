import Transaction from "../domain/entity/transaction.entity";
import PaymentGateway from "../gateway/payment.gateway";
import TransactionModel from "./transaction.model";

export default class TransactionRepository implements PaymentGateway {
  async save(input: Transaction): Promise<Transaction> {
    const trans = new Transaction({
      id: input.id,
      orderId: input.orderId,
      status: input.status,
      amount: input.amount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    await TransactionModel.create({
      id: input.id.id,
      orderId: input.orderId,
      status: input.status,
      amount: input.amount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    return trans;
  }
}
