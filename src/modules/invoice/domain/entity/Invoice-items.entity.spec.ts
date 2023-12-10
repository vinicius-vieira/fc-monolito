import InvoiceItems from "./Invoice-items.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

describe("Invoice item entity unit test", () => {
  it("shoud create a invoice item without a id", () => {
    const invoiceItems = new InvoiceItems({
      name: "item 1",
      price: 100,
    });

    expect(invoiceItems).toBeDefined();
    expect(invoiceItems.id).toBeDefined();
    expect(invoiceItems.name).toBe("item 1");
    expect(invoiceItems.price).toBe(100);
    expect(invoiceItems.hasErrors()).toBe(false);
  });

  it("shoud create a invoice item with a id", () => {
    const invoiceItems = new InvoiceItems({
      id: new Id("1"),
      name: "item 1",
      price: 100,
    });

    expect(invoiceItems).toBeDefined();
    expect(invoiceItems.id.id).toBe("1");
    expect(invoiceItems.name).toBe("item 1");
    expect(invoiceItems.price).toBe(100);
    expect(invoiceItems.hasErrors()).toBe(false);
  });

  it("shoud create a invoice with erros when price is letter than 0 and name not have more then 3 characters", () => {
    const invoiceItems = new InvoiceItems({
      name: "it",
      price: -1,
    });

    expect(invoiceItems).toBeDefined();
    expect(invoiceItems.id).toBeDefined();
    expect(invoiceItems.name).toBe("it");
    expect(invoiceItems.price).toBe(-1);
    expect(invoiceItems.hasErrors()).toBe(true);
    expect(invoiceItems.getErros().length).toBe(2);
    expect(invoiceItems.getErros()[0].message).toBe(
      "Preço inválido, dever ser maior que 0"
    );
    expect(invoiceItems.getErros()[1].message).toBe(
      "Nome inválido, deve ter no mínimo 3 caracteres"
    );
  });

  it("shoud create a invoice with erro when price is letter than 0", () => {
    const invoiceItems = new InvoiceItems({
      name: "item 1",
      price: -1,
    });

    expect(invoiceItems).toBeDefined();
    expect(invoiceItems.id).toBeDefined();
    expect(invoiceItems.name).toBe("item 1");
    expect(invoiceItems.price).toBe(-1);
    expect(invoiceItems.hasErrors()).toBe(true);
    expect(invoiceItems.getErros().length).toBe(1);
    expect(invoiceItems.getErros()[0].message).toBe(
      "Preço inválido, dever ser maior que 0"
    );
  });

  it("shoud create a invoice with erro when name not have more then 3 characters", () => {
    const invoiceItems = new InvoiceItems({
      id: new Id("1"),
      name: "it",
      price: 10,
    });

    expect(invoiceItems).toBeDefined();
    expect(invoiceItems.id.id).toBe("1");
    expect(invoiceItems.name).toBe("it");
    expect(invoiceItems.price).toBe(10);
    expect(invoiceItems.hasErrors()).toBe(true);
    expect(invoiceItems.getErros().length).toBe(1);
    expect(invoiceItems.getErros()[0].message).toBe(
      "Nome inválido, deve ter no mínimo 3 caracteres"
    );
  });
});
