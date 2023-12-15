import express, { Request, Response } from "express";

import { CheckoutFacadeInputDto } from "../../checkout/facade/dto/checkout.facade.dto";
import CheckoutFacadeInterface from "../../checkout/facade/checkout.facade.interface";
import CheckoutFacadeFactory from "../../checkout/factory/checkout.facade.factory";

export const checkouRoute = express.Router();

checkouRoute.post("/", async (req: Request, res: Response) => {
  const checoutFacade: CheckoutFacadeInterface = CheckoutFacadeFactory.create();

  try {
    const checkouInputDto = {
      clientId: req.body.clientId,
      products: req.body.products,
    } as CheckoutFacadeInputDto;

    const output = await checoutFacade.placeOrder(checkouInputDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
