import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  FindInvoiceUseCaseInputDto,
  FindInvoiceUseCaseOutputDto,
} from "./dto/find-invoice.dto";

export default class FindInvoicetUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: FindInvoiceUseCaseInputDto
  ): Promise<FindInvoiceUseCaseOutputDto> {
    const invoice = await this.invoiceRepository.find(input.id);
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        city: invoice.address.city,
        number: invoice.address.number.toString(),
        complement: invoice.address.complement,
        zipCode: invoice.address.zipCode,
        state: invoice.address.state,
      },
      items: invoice.items.map((i) => {
        return {
          id: i.id.id,
          name: i.name,
          price: i.price,
        };
      }),
      total: invoice.total,
      createdAt: invoice.createdAt,
    } as FindInvoiceUseCaseOutputDto;
  }
}
