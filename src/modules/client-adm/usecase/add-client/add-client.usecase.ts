import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Client from "../../domain/entity/client.entity";
import { ClientAdmGatewayInterface } from "../../gateway/client-adm.gateway";
import {
  AddClientInputDto,
  AddClientOutputDto,
} from "./dto/add-cliente.usecase.dto";

export default class AddClientUseCase implements UseCaseInterface {
  constructor(private clientRepository: ClientAdmGatewayInterface) {}

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      name: input.name,
      email: input.email,
      address: input.address,
    };

    const client = new Client(props);
    await this.clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
