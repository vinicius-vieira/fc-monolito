import EventDispatcher from "../../../@shared/domain/event/event-dispatcher";
import ConsoleLogWhenStockChangedHandler from "./handler/console-log-when-stock-changed.handler";
import ProductCreatedEvent from "./product-created-event";

describe("Product created notification", () => {
  it("should notify when product is created.", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new ConsoleLogWhenStockChangedHandler();
    const spyEventHandle = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      stock: 5.0,
    });

    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandle).toHaveBeenCalled();
  });
});
