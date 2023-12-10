import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceItems from "../../domain/entity/Invoice-items.entity";
import Invoice from "../../domain/entity/invoice.entity";
import Address from "../../domain/entity/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceInputDto,
  GenerateInvoiceOutputDto,
} from "./dto/generate-invoice.dto";

export default class GenerateInvoicetUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: GenerateInvoiceInputDto
  ): Promise<GenerateInvoiceOutputDto> {
    const invoiceInput = new Invoice({
      name: input.name,
      document: input.document,
      address: new Address(
        input.street,
        input.number,
        input.zipCode,
        input.city,
        input.state,
        input.complement
      ),
      items: input.items.map((i) => {
        return new InvoiceItems({
          name: i.name,
          price: i.price,
        });
      }),
    });

    await this.invoiceRepository.generate(invoiceInput);

    const invoice = await this.invoiceRepository.find(invoiceInput.id.id);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      city: invoice.address.city,
      number: invoice.address.number.toString(),
      complement: invoice.address.complement,
      zipCode: invoice.address.zipCode,
      state: invoice.address.state,
      items: invoice.items.map((i) => {
        return {
          id: i.id.id,
          name: i.name,
          price: i.price,
        };
      }),
      total: invoice.total,
      createdAt: invoice.createdAt,
    } as GenerateInvoiceOutputDto;
  }
}
