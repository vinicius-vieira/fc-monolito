import Product from "../../../product-adm/domain/entity/product.entity";
import SendEmailWhenProductCreatedHandler from "../../../product-adm/domain/event/handler/send-email-when-product-created.handler";
import ProductCreatedEvent from "../../../product-adm/domain/event/product-created-event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregiter an event handle", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unRegister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregiter all event handle", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unRegiterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();
    const spyEventHandle = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const product = new Product({
      name: "Produto 1",
      description: "Product 1 description",
      purchasePrice: 10.01,
      stock: 10.0,
    });

    const productCreatedEvent = new ProductCreatedEvent(product);

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandle).toHaveBeenCalled();
  });
});
