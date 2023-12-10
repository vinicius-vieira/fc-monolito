import EventHandlerInterface from "../../../../@shared/domain/event/handler/event-handler.interface";
import ProductCreatedEvent from "../product-created-event";

export default class SendEmailWhenProductCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(
      `E-mail enviado, Produto criado: ${event.enventData.id} - ${event.enventData.name}`
    );
  }
}
