import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/entity/client.entity";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(() => {
    sequelize.close();
  });

  test("should create a client", async () => {
    const clientProps = {
      id: new Id("1"),
      name: "Client 1",
      email: "dfd@d.com",
      address: "aers",
    };

    const client = new Client(clientProps);
    const clientRepository = new ClientRepository();
    await clientRepository.add(client);

    const clientdb = await ClientModel.findOne({
      where: { id: clientProps.id.id },
      raw: true,
    });

    expect(clientProps.id.id).toEqual(clientdb.id);
    expect(clientProps.name).toEqual(clientdb.name);
    expect(clientProps.email).toEqual(clientdb.email);
    expect(clientProps.address).toEqual(clientdb.address);
  });

  test("should find a client by id", async () => {
    const clientProps = {
      id: "1",
      name: "Client 1",
      email: "dfd@d.com",
      address: "aers",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ClientModel.create(clientProps);
    const clientRepository = new ClientRepository();
    const clientdb = await clientRepository.find(clientProps.id);

    expect(clientProps.id).toEqual(clientdb.id.id);
    expect(clientProps.name).toEqual(clientdb.name);
    expect(clientProps.email).toEqual(clientdb.email);
    expect(clientProps.address).toEqual(clientdb.address);
    expect(clientProps.createdAt.toLocaleString()).toStrictEqual(
      clientdb.createdAt.toLocaleString()
    );
    expect(clientProps.updatedAt.toLocaleString()).toStrictEqual(
      clientdb.updatedAt.toLocaleString()
    );
  });
});
