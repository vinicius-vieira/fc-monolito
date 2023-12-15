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
      document: input.document,
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
    };

    const client = new Client(props);
    await this.clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
