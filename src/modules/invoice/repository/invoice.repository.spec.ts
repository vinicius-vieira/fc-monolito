import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceModel from "./invoice.model";
import Invoice from "../domain/entity/invoice.entity";
import Address from "../domain/entity/value-object/address.value-object";
import InvoiceItems from "../domain/entity/Invoice-items.entity";
import InvoiceRepository from "./invoice.repository";
import InvoiceItemsModel from "./invoice-items.model";

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(() => {
    sequelize.close();
  });

  test("should create a invoice", async () => {
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

    const invoice = new Invoice(invProps);
    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invProps.id.id },
      include: { all: true, nested: true },
    });

    const invoiceModel = invoiceDb.get({ plain: true }) as InvoiceModel;

    expect(invProps.id.id).toEqual(invoiceModel.id);
    expect(invProps.name).toEqual(invoiceModel.name);
    expect(invProps.document).toEqual(invoiceModel.document);
    expect(invProps.address.street).toEqual(invoiceModel.street);
    expect(invProps.address.number).toEqual(invoiceModel.number);
    expect(invProps.address.zipCode).toEqual(invoiceModel.zipCode);
    expect(invProps.address.city).toEqual(invoiceModel.city);
    expect(invProps.address.state).toEqual(invoiceModel.state);
    expect(invProps.address.complement).toEqual(invoiceModel.complement);
    expect(invoiceModel.items).toBeDefined();
    expect(invoiceModel.items.length).toBe(2);
    expect(invProps.items[0].id.id).toEqual(invoiceModel.items[0].id);
    expect(invProps.items[0].name).toEqual(invoiceModel.items[0].name);
    expect(invProps.items[0].price).toEqual(invoiceModel.items[0].price);
    expect(invProps.items[1].id.id).toEqual(invoiceModel.items[1].id);
    expect(invProps.items[1].name).toEqual(invoiceModel.items[1].name);
    expect(invProps.items[1].price).toEqual(invoiceModel.items[1].price);
  });

  test("should find a invoice", async () => {
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

    const invoice = new Invoice(invProps);
    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.generate(invoice);

    const invoicedb = await invoiceRepository.find(invProps.id.id);

    expect(invProps.id.id).toEqual(invoicedb.id.id);
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
    expect(invProps.items[0].id.id).toEqual(invoicedb.items[0].id.id);
    expect(invProps.items[0].name).toEqual(invoicedb.items[0].name);
    expect(invProps.items[0].price).toEqual(invoicedb.items[0].price);
    expect(invProps.items[1].id.id).toEqual(invoicedb.items[1].id.id);
    expect(invProps.items[1].name).toEqual(invoicedb.items[1].name);
    expect(invProps.items[1].price).toEqual(invoicedb.items[1].price);
  });
});
