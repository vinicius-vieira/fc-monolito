import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/entity/client.entity";
import { ClientAdmGatewayInterface } from "../gateway/client-adm.gateway";
import ClientModel from "./client.model";

export default class ClientRepository implements ClientAdmGatewayInterface {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async find(id: string): Promise<Client> {
    let clientModel;
    try {
      clientModel = await ClientModel.findOne({
        where: { id },
        raw: true,
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Client not found");
    }
    return new Client({
      id: new Id(clientModel.id),
      name: clientModel.name,
      email: clientModel.email,
      address: clientModel.address,
      createdAt: clientModel.createdAt,
      updatedAt: clientModel.updatedAt,
    });
  }
}
