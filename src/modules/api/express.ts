import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productRoute } from "./routes/product.route";
import { clientRoute } from "./routes/client.route";
import { checkouRoute } from "./routes/checkout.route";
import { invoiceRoute } from "./routes/invoice.route";
import InvoiceModel from "../invoice/repository/invoice.model";
import ClientModel from "../client-adm/repository/client.model";
import InvoiceItemsModel from "../invoice/repository/invoice-items.model";
import TransactionModel from "../payment/repository/transaction.model";
import ProductModel from "../product-adm/repository/product.model";
import CatalogProductModel from "../store-catalog/repository/catalog-product.model";
import OrderModel from "../checkout/repository/order.model";

export const app: Express = express();

app.use(express.json());
app.use("/clients", clientRoute);
app.use("/products", productRoute);
app.use("/checkout", checkouRoute);
app.use("/invoice/:id", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true },
  });

  await sequelize.addModels([
    ClientModel,
    InvoiceModel,
    InvoiceItemsModel,
    TransactionModel,
    ProductModel,
    CatalogProductModel,
    OrderModel,
  ]);
  await sequelize.sync();
}

setupDb();
