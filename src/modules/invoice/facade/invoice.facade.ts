import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import FindInvoicetUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoicetUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import {
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
} from "./dto/invoice.facade.dto";
import { InvoiceFacadeInterface } from "./invoice.facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {
  constructor(
    private generateUserCase: GenerateInvoicetUseCase,
    private findUserCase: FindInvoicetUseCase
  ) {}

  async generate(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this.generateUserCase.execute(input);
  }

  async find(
    input: FindInvoiceFacadeInputDto
  ): Promise<FindInvoiceFacadeOutputDto> {
    return await this.findUserCase.execute(input);
  }
}
