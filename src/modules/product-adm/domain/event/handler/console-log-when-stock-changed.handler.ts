import EventHandlerInterface from "../../../../@shared/domain/event/handler/event-handler.interface";
import ProductChangeStockEvent from "../product-change-stock.event";

export default class ConsoleLogWhenStockChangedHandler
  implements EventHandlerInterface<ProductChangeStockEvent>
{
  handle(event: ProductChangeStockEvent): void {
    console.log(
      `Estoque do produto: ${event.enventData.id} - ${event.enventData.name}, estoque alterado para: {event.enventData.stock}`
    );
  }
}
