import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./dto/place-order.dto";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import FindClientAdmFacadeInputDto from "../../../client-adm/facade/dto/client-adm-facade.dto";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import CheckStockFacadeInputDto from "../../../product-adm/facade/dto/add-product-adm-facade.dto";
import StoreCatalogFacedeInterface from "../../../store-catalog/facade/store-catalog-facade.interface";
import FindStoreCatalogFacadeInputDto from "../../../store-catalog/facade/dto/store-catalog-facade.dto";
import Product from "../../domain/entity/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/entity/client.entity";
import Order from "../../domain/entity/order.entity";
import PaymentFacadeInterface from "../../../payment/facade/payment.facade.interface";
import { InvoiceFacadeInterface } from "../../../invoice/facade/invoice.facade.interface";
import CheckoutGateway from "../../gateway/checkout.gateway";

export default class PlaceOrderUsecase implements UseCaseInterface {
  constructor(
    private clientFacade: ClientAdmFacadeInterface,
    private productFacade: ProductAdmFacadeInterface,
    private catalogFacade: StoreCatalogFacedeInterface,
    private paymentFacade: PaymentFacadeInterface,
    private invoiceFacade: InvoiceFacadeInterface,
    private checkoutRepo: CheckoutGateway
  ) {}

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this.clientFacade.find({
      id: input.clientId,
    } as FindClientAdmFacadeInputDto);

    if (!client) {
      throw new Error("Client not found");
    }

    await this.validateProducts(input);

    const products = await Promise.all(
      input.products.map((p) => this.getProduct(p.productId))
    );

    const myClient = new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
    });

    const order = new Order({
      client: myClient,
      products,
    });

    const payment = await this.paymentFacade.process({
      orderId: order.id.id,
      amount: order.total(),
    });

    const paymentApproved = payment.status == "approved";

    const invoice = paymentApproved
      ? await this.invoiceFacade.generate({
          name: client.name,
          document: client.document,
          street: client.street,
          number: client.number,
          complement: client.complement,
          city: client.city,
          state: client.state,
          zipCode: client.zipCode,
          items: products.map((p) => {
            return {
              id: p.id.id,
              name: p.name,
              price: p.salesPrice,
            };
          }),
        })
      : null;

    paymentApproved && order.approved();
    this.checkoutRepo.addOrder(order);

    return {
      id: order.id.id,
      invoiceId: paymentApproved ? invoice.id : null,
      status: order.status,
      total: order.total(),
      products: order.products.map((o) => {
        return {
          productId: o.id.id,
        };
      }),
    };
  }

  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if (!input.products || input.products.length === 0) {
      throw new Error("No products selected");
    }

    for (const p of input.products) {
      const product = await this.productFacade.checkStock({
        productId: p.productId,
      } as CheckStockFacadeInputDto);

      if (product.stock <= 0) {
        throw new Error(
          `Product ${product.productId} is not availabl in stock`
        );
      }
    }
  }

  private async getProduct(id: string): Promise<Product> {
    const catalogProduct = await this.catalogFacade.find({
      id: id,
    } as FindStoreCatalogFacadeInputDto);

    if (!catalogProduct) {
      throw new Error("Product not found");
    }

    const productProps = {
      id: new Id(catalogProduct.id),
      name: catalogProduct.name,
      description: catalogProduct.description,
      salesPrice: catalogProduct.salesPrice,
    };

    return new Product(productProps);
  }
}
