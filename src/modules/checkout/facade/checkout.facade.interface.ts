import {
  CheckoutFacadeInputDto,
  CheckoutFacadeOutputDto,
} from "./dto/checkout.facade.dto";

export default interface CheckoutFacadeInterface {
  placeOrder(input: CheckoutFacadeInputDto): Promise<CheckoutFacadeOutputDto>;
}
