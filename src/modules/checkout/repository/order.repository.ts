import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/entity/client.entity";
import Order from "../domain/entity/order.entity";
import Product from "../domain/entity/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderModel from "./order.model";

export default class OrderRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id.id,
      status: order.status,
      clientId: order.client.id.id,
      products: order.products.map((p) => {
        productId: p.id.id;
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findOrder(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        raw: true,
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const order = new Order({
      id: new Id(orderModel.id),
      status: orderModel.status,
      client: new Client({
        id: new Id(orderModel.id),
        name: "",
        email: "",
        document: "",
        street: "",
        number: "",
        complement: "",
        city: "",
        state: "",
        zipCode: "",
      }),
      products: orderModel.products.map((p) => {
        return new Product({
          id: new Id(p),
          name: "",
          description: "",
          salesPrice: 0.0,
        });
      }),
    });

    return order;
  }
}
