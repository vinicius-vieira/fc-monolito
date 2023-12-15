import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "../facade/client-adm.facade";
import ClientAdmFacadeInterface from "../facade/client-adm.facade.interface";

export default class ClientAdmFacedeFactory {
  static create(): ClientAdmFacadeInterface {
    const clientRepository = new ClientRepository();
    const addClientUseCase = new AddClientUseCase(clientRepository);
    const findClienttUseCase = new FindClientUseCase(clientRepository);
    const clientAdmFacade = new ClientAdmFacade({
      addUseCase: addClientUseCase,
      findUseCase: findClienttUseCase,
    });
    return clientAdmFacade;
  }
}
