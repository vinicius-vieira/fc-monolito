import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoicetUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoicetUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacedeFactory {
  static create(): InvoiceFacade {
    const invoiceRepository = new InvoiceRepository();
    const generateInvoiceUseCase = new GenerateInvoicetUseCase(
      invoiceRepository
    );
    const findInvoiceUseCase = new FindInvoicetUseCase(invoiceRepository);
    const invoiceFacade = new InvoiceFacade(
      generateInvoiceUseCase,
      findInvoiceUseCase
    );

    return invoiceFacade;
  }
}
