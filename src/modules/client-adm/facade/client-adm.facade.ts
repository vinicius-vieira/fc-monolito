import Client from "../domain/entity/client.entity";
import FindClientAdmFacadeOutputDto from "./dto/client-adm-facade.dto";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeInterface from "./client-adm.facade.interface";
import AddClientAdmFacedeInputDto from "./dto/client-adm-facade.dto";
import AddClientAdmFacadeOutputDto from "./dto/client-adm-facade.dto";
import FindClientAdmFacadeInputDto from "./dto/client-adm-facade.dto";

export interface ClientUseCaseProps {
  addUseCase: AddClientUseCase;
  findUseCase: FindClientUseCase;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addUseCase: AddClientUseCase;
  private _findUseCase: FindClientUseCase;

  constructor(clientUseCaseProps: ClientUseCaseProps) {
    this._addUseCase = clientUseCaseProps.addUseCase;
    this._findUseCase = clientUseCaseProps.findUseCase;
  }

  add(input: AddClientAdmFacedeInputDto): Promise<AddClientAdmFacadeOutputDto> {
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

    return this._addUseCase.execute(new Client(props));
  }

  async find(
    input: FindClientAdmFacadeInputDto
  ): Promise<FindClientAdmFacadeOutputDto> {
    return await this._findUseCase.execute(input);
  }
}
