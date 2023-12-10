import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import { ClientAdmGatewayInterface } from "../../gateway/client-adm.gateway";
import {
  FindClientInputDto,
  FindClientOutputDto,
} from "./dto/find-client.usecase.dto";

export default class FindClientUseCase implements UseCaseInterface {
  constructor(private clientRepository: ClientAdmGatewayInterface) {}

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const client = await this.clientRepository.find(input.id);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    } as FindClientOutputDto;
  }
}
