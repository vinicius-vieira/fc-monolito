import EventDispatcher from "../../../@shared/domain/event/event-dispatcher";
import ConsoleLogWhenStockChangedHandler from "./handler/console-log-when-stock-changed.handler";
import ProductChangeStockEvent from "./product-change-stock.event";

describe("Product changed stock notification", () => {
  it("should notify when product stock changed.", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new ConsoleLogWhenStockChangedHandler();
    const spyEventHandle = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductChangeStockEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductChangeStockEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["ProductChangeStockEvent"][0]
    ).toMatchObject(eventHandler);

    const productChangeStockEvent = new ProductChangeStockEvent({
      id: "1",
      name: "Cliente 1",
      stock: 5.0,
    });

    eventDispatcher.notify(productChangeStockEvent);
    expect(spyEventHandle).toHaveBeenCalled();
  });
});
