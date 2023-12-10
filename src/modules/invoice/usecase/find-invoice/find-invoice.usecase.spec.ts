import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/entity/Invoice-items.entity";
import Invoice from "../../domain/entity/invoice.entity";
import Address from "../../domain/entity/value-object/address.value-object";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id("1"),
  name: "invoice 1",
  document: "1233",
  address: new Address(
    "street",
    "number",
    "zipCode",
    "city",
    "state",
    "complement"
  ),
  items: [
    new InvoiceItems({
      name: "p 1",
      price: 10,
    }),
    new InvoiceItems({
      name: "p 2",
      price: 15,
    }),
  ],
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn(),
  };
};

describe("FindInvoiceUseCase tests", () => {
  it("should find a invoice", async () => {
    const invoiceRepository = MockRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
    const result = await findInvoiceUseCase.execute({
      id: invoice.id.id,
    });

    expect(invoiceRepository.find).toBeCalled();
    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address).toBeDefined();
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.items).toBeDefined();
    expect(result.items[0].id).toBeDefined();
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.total).toBe(invoice.total);
  });
});
