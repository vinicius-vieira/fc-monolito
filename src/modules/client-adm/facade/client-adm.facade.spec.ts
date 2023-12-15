import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import AddClientAdmFacedeInputDto from "./dto/client-adm-facade.dto";
import ClientAdmFacedeFactory from "../factory/client-adm.facade.factory";
import FindClientAdmFacadeInputDto from "./dto/client-adm-facade.dto";

describe("ClientAdmFacade test", () => {
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
    const input = {
      name: "Client 1",
      email: "dfd@d.com",
      document: "0000",
      street: "some address",
      number: "1",
      complement: "",
      city: "some city",
      state: "some state",
      zipCode: "000",
    } as AddClientAdmFacedeInputDto;

    const clientAdmFacade = ClientAdmFacedeFactory.create();
    const client = await clientAdmFacade.add(input);

    const clientdb = await ClientModel.findOne({
      where: { id: client.id },
      raw: true,
    });

    expect(clientdb).toBeDefined();
    expect(input.name).toEqual(clientdb.name);
    expect(input.email).toEqual(clientdb.email);
    expect(input.street).toEqual(clientdb.street);
  });

  test("should find a client", async () => {
    const input = {
      name: "Client 1",
      email: "dfd@d.com",
      document: "0000",
      street: "some address",
      number: "1",
      complement: "",
      city: "some city",
      state: "some state",
      zipCode: "000",
    } as AddClientAdmFacedeInputDto;

    const clientAdmFacade = ClientAdmFacedeFactory.create();
    const client = await clientAdmFacade.add(input);

    const findInput = {
      id: client.id,
    } as FindClientAdmFacadeInputDto;

    const result = await clientAdmFacade.find(findInput);

    expect(result.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.street).toEqual(client.street);
  });
});
