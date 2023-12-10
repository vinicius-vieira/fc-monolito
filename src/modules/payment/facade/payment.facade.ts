import ProcessPaymentUseCase from "../usecase/process-payment.usecase";
import {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto,
} from "./dto/payment.facade.dto";
import PaymentFacadeInterface from "./payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private processPaymentUseCase: ProcessPaymentUseCase) {}

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.processPaymentUseCase.execute(input);
  }
}
