import {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
} from "./dto/invoice.facade.dto";

export interface InvoiceFacadeInterface {
  generate(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto>;

  find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
}
