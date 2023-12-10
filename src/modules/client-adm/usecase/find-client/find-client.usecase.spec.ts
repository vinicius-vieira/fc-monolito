import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/entity/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
  id: new Id("1"),
  name: "Client 1",
  email: "cd@c.com",
  address: "rua 2, dd, a",
});

const MockReposytory = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
};

describe("Find Client Usecase unit test", () => {
  it("should find a client", async () => {
    const repository = MockReposytory();
    const usecase = new FindClientUseCase(repository);

    const result = await usecase.execute({ id: "1" });

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBe("1");
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
