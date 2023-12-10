import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacedeFactory from "../factory/invoice.facade.factory";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItemsModel from "../repository/invoice-items.model";
import Address from "../domain/entity/value-object/address.value-object";
import InvoiceItems from "../domain/entity/Invoice-items.entity";
import Invoice from "../domain/entity/invoice.entity";
import InvoiceRepository from "../repository/invoice.repository";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(() => {
    sequelize.close();
  });

  test("should find a invoice", async () => {
    const facade = InvoiceFacedeFactory.create();

    const invProps = {
      id: new Id("1"),
      name: "invoice 1",
      document: "1234",
      address: new Address(
        "street",
        "number",
        "zipCode",
        "city",
        "state",
        "complement"
      ),
      items: [
        new InvoiceItems({ id: new Id("1"), name: "item 1", price: 100 }),
        new InvoiceItems({ id: new Id("2"), name: "item 2", price: 200 }),
      ],
    };

    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.generate(new Invoice(invProps));

    const invoicedb = await facade.find(invProps.id);

    expect(invProps.id.id).toEqual(invoicedb.id);
    expect(invProps.name).toEqual(invoicedb.name);
    expect(invProps.document).toEqual(invoicedb.document);
    expect(invProps.address.street).toEqual(invoicedb.address.street);
    expect(invProps.address.number).toEqual(invoicedb.address.number);
    expect(invProps.address.zipCode).toEqual(invoicedb.address.zipCode);
    expect(invProps.address.city).toEqual(invoicedb.address.city);
    expect(invProps.address.state).toEqual(invoicedb.address.state);
    expect(invProps.address.complement).toEqual(invoicedb.address.complement);
    expect(invoicedb.items).toBeDefined();
    expect(invoicedb.items.length).toBe(2);
    expect(invProps.items[0].id.id).toEqual(invoicedb.items[0].id);
    expect(invProps.items[0].name).toEqual(invoicedb.items[0].name);
    expect(invProps.items[0].price).toEqual(invoicedb.items[0].price);
    expect(invProps.items[1].id.id).toEqual(invoicedb.items[1].id);
    expect(invProps.items[1].name).toEqual(invoicedb.items[1].name);
    expect(invProps.items[1].price).toEqual(invoicedb.items[1].price);
  });

  test("should generate a invoice", async () => {
    const facade = InvoiceFacedeFactory.create();

    const invProps = {
      name: "invoice 1",
      document: "1234",
      street: "rua aa",
      number: "334",
      zipCode: "12313",
      city: "city",
      state: "rj",
      complement: "",
      items: [
        { name: "item 1", price: 100 },
        { name: "item 2", price: 200 },
      ],
    };

    const invoicedb = await facade.generate(invProps);

    expect(invoicedb).toBeDefined();
    expect(invoicedb.id).toBeDefined();
    expect(invProps.name).toEqual(invoicedb.name);
    expect(invProps.document).toEqual(invoicedb.document);
    expect(invProps.street).toEqual(invoicedb.street);
    expect(invProps.number).toEqual(invoicedb.number);
    expect(invProps.zipCode).toEqual(invoicedb.zipCode);
    expect(invProps.city).toEqual(invoicedb.city);
    expect(invProps.state).toEqual(invoicedb.state);
    expect(invProps.complement).toEqual(invoicedb.complement);
    expect(invoicedb.items).toBeDefined();
    expect(invoicedb.items.length).toBe(2);
    expect(invoicedb.items[0].id).toBeDefined();
    expect(invProps.items[0].name).toEqual(invoicedb.items[0].name);
    expect(invProps.items[0].price).toEqual(invoicedb.items[0].price);
    expect(invoicedb.items[1].id).toBeDefined();
    expect(invProps.items[1].name).toEqual(invoicedb.items[1].name);
    expect(invProps.items[1].price).toEqual(invoicedb.items[1].price);
  });
});
