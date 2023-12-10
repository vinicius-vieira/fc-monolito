import Client from "../domain/entity/client.entity";
import AddClientAdmFacedeInputDto from "./dto/client-adm-facade.dto";
import FindClientAdmFacadeInputDto from "./dto/client-adm-facade.dto";
import FindClientAdmFacadeOutputDto from "./dto/client-adm-facade.dto";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import { AddClientOutputDto } from "../usecase/add-client/dto/add-cliente.usecase.dto";

export interface ClientUseCaseProps {
  addUseCase: AddClientUseCase;
  findUseCase: FindClientUseCase;
}

export default class ClientAdmFacade {
  private _addUseCase: AddClientUseCase;
  private _findUseCase: FindClientUseCase;

  constructor(clientUseCaseProps: ClientUseCaseProps) {
    this._addUseCase = clientUseCaseProps.addUseCase;
    this._findUseCase = clientUseCaseProps.findUseCase;
  }

  add(input: AddClientAdmFacedeInputDto): Promise<AddClientOutputDto> {
    const props = {
      name: input.name,
      email: input.email,
      address: input.address,
    };

    return this._addUseCase.execute(new Client(props));
  }

  async find(
    input: FindClientAdmFacadeInputDto
  ): Promise<FindClientAdmFacadeOutputDto> {
    return await this._findUseCase.execute(input);
  }
}
