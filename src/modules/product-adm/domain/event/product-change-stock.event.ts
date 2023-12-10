import EventInterface from "../../../@shared/domain/event/event.interface";

export default class ProductChangeStockEvent implements EventInterface {
  dataTimeOcurred: Date;
  enventData: any;

  constructor(eventData: any) {
    this.dataTimeOcurred = new Date();
    this.enventData = eventData;
  }
}
