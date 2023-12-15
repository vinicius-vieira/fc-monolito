import PlaceOrderUsecase from "../usecase/place-order/place-order.usecase";
import CheckoutFacadeInterface from "./checkout.facade.interface";
import {
  CheckoutFacadeInputDto,
  CheckoutFacadeOutputDto,
} from "./dto/checkout.facade.dto";

export interface PlaceOrderUseCaseProps {
  placeOrderUseCase: PlaceOrderUsecase;
}

export default class CheckoutFacade implements CheckoutFacadeInterface {
  private _placeOrderUseCase: PlaceOrderUsecase;

  constructor(placeOrderUseCase: PlaceOrderUsecase) {
    this._placeOrderUseCase = placeOrderUseCase;
  }

  placeOrder(input: CheckoutFacadeInputDto): Promise<CheckoutFacadeOutputDto> {
    return this._placeOrderUseCase.execute(input);
  }
}
