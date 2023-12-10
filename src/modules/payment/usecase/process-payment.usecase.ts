import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import {
  ProcessPaymentInputDto,
  ProcessPaymentOutputDto,
} from "./dto/process-payment.dto";
import Transaction from "../domain/entity/transaction.entity";
import PaymentGateway from "../gateway/payment.gateway";

export default class ProcessPaymentUseCase implements UseCaseInterface {
  constructor(private transactionRepository: PaymentGateway) {}

  async execute(
    input: ProcessPaymentInputDto
  ): Promise<ProcessPaymentOutputDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });

    transaction.process();
    // TODO teria q validar depois...

    const transactiondb = await this.transactionRepository.save(transaction);

    return {
      transactionId: transactiondb.id.id,
      orderId: transactiondb.orderId,
      amount: transactiondb.amount,
      status: transactiondb.status,
      createdAt: transactiondb.createdAt,
      updatedAt: transactiondb.updatedAt,
    };
  }
}
