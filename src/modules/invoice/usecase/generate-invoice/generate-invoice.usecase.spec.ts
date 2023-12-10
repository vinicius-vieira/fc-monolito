import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/entity/Invoice-items.entity";
import Invoice from "../../domain/entity/invoice.entity";
import Address from "../../domain/entity/value-object/address.value-object";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

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
      id: new Id("1"),
      name: "p 1",
      price: 10,
    }),
    new InvoiceItems({
      id: new Id("2"),
      name: "p 2",
      price: 15,
    }),
  ],
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("GenerateInvoiceUseCase tests", () => {
  it("should generate a invoice", async () => {
    const invoiceRepository = MockRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(
      invoiceRepository
    );
    const result = await generateInvoiceUseCase.execute({
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: [
        {
          name: invoice.items[0].name,
          price: invoice.items[0].price,
        },
      ],
    });

    expect(invoiceRepository.generate).toBeCalled();
    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.street).toBe(invoice.address.street);
    expect(result.items).toBeDefined();
    expect(result.items[0].id).toBeDefined();
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.total).toBe(invoice.total);
  });
});
