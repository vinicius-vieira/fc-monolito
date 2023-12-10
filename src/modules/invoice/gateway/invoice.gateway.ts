import Invoice from "../domain/entity/invoice.entity";

export default interface InvoiceGateway {
  generate(invoice: Invoice): Promise<Invoice>;
  find(id: string): Promise<Invoice>;
}
