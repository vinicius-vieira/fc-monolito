import {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto,
} from "./dto/payment.facade.dto";

export default interface PaymentFacadeInterface {
  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>;
}
