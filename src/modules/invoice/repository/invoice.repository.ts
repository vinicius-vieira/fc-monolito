import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/entity/Invoice-items.entity";
import Invoice from "../domain/entity/invoice.entity";
import Address from "../domain/entity/value-object/address.value-object";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemsModel from "./invoice-items.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(input: Invoice): Promise<Invoice> {
    const trans = new Invoice({
      id: input.id,
      name: input.name,
      document: input.document,
      address: input.address,
      items: input.items,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    await InvoiceModel.create(
      {
        id: input.id.id,
        name: input.name,
        document: input.document,
        city: input.address.city,
        complement: input.address.complement,
        number: input.address.number,
        state: input.address.state,
        street: input.address.street,
        zipCode: input.address.zipCode,
        items: input.items.map((i) => {
          return {
            id: i.id.id,
            name: i.name,
            price: i.price,
            invoiceId: input.id.id,
          };
        }),
        createdAt: input.createdAt,
        updatedAt: input.updatedAt,
      },
      {
        include: [InvoiceItemsModel],
      }
    );

    return trans;
  }

  async find(id: string): Promise<Invoice> {
    let invoiceModel;
    let invoiceDb;
    try {
      invoiceDb = await InvoiceModel.findOne({
        where: { id: id },
        include: { all: true, nested: true },
      });

      invoiceModel = invoiceDb.get({ plain: true }) as InvoiceModel;
    } catch (error) {
      throw new Error("Invoice not found");
    }
    return new Invoice({
      id: new Id(invoiceModel.id),
      name: invoiceModel.name,
      document: invoiceModel.document,
      address: new Address(
        invoiceModel.street,
        invoiceModel.number,
        invoiceModel.zipCode,
        invoiceModel.city,
        invoiceModel.state,
        invoiceModel.complement
      ),
      items: invoiceModel.items.map(
        (i) =>
          new InvoiceItems({ id: new Id(i.id), name: i.name, price: i.price })
      ),
      createdAt: invoiceModel.createdAt,
      updatedAt: invoiceModel.updatedAt,
    });
  }
}
