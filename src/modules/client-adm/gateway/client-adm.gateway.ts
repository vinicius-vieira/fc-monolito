import Client from "../domain/entity/client.entity";

export interface ClientAdmGatewayInterface {
  add(client: Client): Promise<void>;
  find(id: string): Promise<Client>;
}
