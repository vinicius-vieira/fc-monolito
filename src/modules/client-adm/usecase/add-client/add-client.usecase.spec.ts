import AddClientUseCase from "./add-client.usecase";

const MockReposytory = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Client Usecase unit test", () => {
  it("should add a client", async () => {
    const repository = MockReposytory();
    const usecase = new AddClientUseCase(repository);

    const input = {
      name: "Cleint 1",
      email: "em@am.com",
      document: "0000",
      street: "some address",
      number: "1",
      complement: "",
      city: "some city",
      state: "some state",
      zipCode: "000",
    };

    const result = await usecase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.street).toEqual(input.street);
  });
});
