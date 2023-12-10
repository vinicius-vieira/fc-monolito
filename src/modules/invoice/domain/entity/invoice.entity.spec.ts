import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "./Invoice-items.entity";
import Invoice from "./invoice.entity";
import Address from "./value-object/address.value-object";

describe("Invoice Entity unit test", () => {
  it("should create a invoice without id", () => {
    const invoice = new Invoice({
      name: "invoice 1",
      document: "12366",
      address: new Address("rua a", "1", "11111111", "AA", "RJ", "casa 1"),
      items: [new InvoiceItems({ name: "product 1", price: 15 })],
    });
    expect(invoice).toBeDefined();
    expect(invoice.hasErrors()).toBe(false);
    expect(invoice.id).toBeDefined();
    expect(invoice.name).toBe("invoice 1");
    expect(invoice.document).toBe("12366");
    expect(invoice.address).toBeDefined();
    expect(invoice.address.city).toBe("AA");
    expect(invoice.address.street).toBe("rua a");
    expect(invoice.address.number).toBe("1");
    expect(invoice.address.zipCode).toBe("11111111");
    expect(invoice.items).toBeDefined();
    expect(invoice.items.length).toBe(1);
    expect(invoice.total).toBe(15);
  });

  it("should create a invoice with id", () => {
    const invoice = new Invoice({
      id: new Id("1"),
      name: "invoice 1",
      document: "12366",
      address: new Address("rua a", "1", "11111111", "AA", "RJ", undefined),
      items: [
        new InvoiceItems({ name: "product 1", price: 15 }),
        new InvoiceItems({ name: "product 2", price: 15 }),
      ],
    });

    expect(invoice).toBeDefined();
    expect(invoice.hasErrors()).toBe(false);
    expect(invoice.id.id).toBe("1");
    expect(invoice.name).toBe("invoice 1");
    expect(invoice.document).toBe("12366");
    expect(invoice.address).toBeDefined();
    expect(invoice.address.city).toBe("AA");
    expect(invoice.address.street).toBe("rua a");
    expect(invoice.address.number).toBe("1");
    expect(invoice.address.zipCode).toBe("11111111");
    expect(invoice.items).toBeDefined();
    expect(invoice.items.length).toBe(2);
    expect(invoice.total).toBe(30);
  });

  it("should create a invoice with erro when have invalid parameters.", () => {
    const invoice = new Invoice({
      name: "in",
      document: "1",
      address: undefined,
      items: [new InvoiceItems({ name: "product 1", price: -15 })],
    });

    expect(invoice).toBeDefined();
    expect(invoice.id).toBeDefined();
    expect(invoice.hasErrors()).toBe(true);
    expect(invoice.getErros().length).toBe(4);
  });
});
