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
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
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
      document: clientModel.document,
      street: clientModel.street,
      number: clientModel.number,
      complement: clientModel.complement,
      city: clientModel.city,
      state: clientModel.state,
      zipCode: clientModel.zipCode,
      createdAt: clientModel.createdAt,
      updatedAt: clientModel.updatedAt,
    });
  }
}
