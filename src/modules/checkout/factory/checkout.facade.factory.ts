import ClientAdmFacedeFactory from "../../client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/product-adm.factory";
import CheckoutFacadeInterface from "../facade/checkout.facade.interface";
import PlaceOrderUsecase from "../usecase/place-order/place-order.usecase";
import StoreCatalogFacadeInterface from "../../store-catalog/facade/store-catalog-facade.interface";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/store-catalog-facade-factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import InvoiceFacedeFactory from "../../invoice/factory/invoice.facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import OrderRepository from "../repository/order.repository";

export default class CheckoutFacadeFactory {
  static create(): CheckoutFacadeInterface {
    const placeOrderUseCase = new PlaceOrderUsecase(
      ClientAdmFacedeFactory.create(),
      ProductAdmFacadeFactory.create(),
      StoreCatalogFacadeFactory.create(),
      PaymentFacadeFactory.create(),
      InvoiceFacedeFactory.create(),
      new OrderRepository()
    );

    return new CheckoutFacade(placeOrderUseCase);
  }
}
