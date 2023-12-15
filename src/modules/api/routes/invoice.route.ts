import express, { Request, Response } from "express";
import { InvoiceFacadeInterface } from "../../invoice/facade/invoice.facade.interface";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.get("/", async (req: Request, res: Response) => {
  const invoiceFacade: InvoiceFacadeInterface = InvoiceFacadeFactory.create();

  try {
    const output = await invoiceFacade.find({ id: req.params.id });
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
