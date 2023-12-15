import express, { Request, Response } from "express";
import ClientAdmFacadeInterface from "../../client-adm/facade/client-adm.facade.interface";
import ClientAdmFacedeFactory from "../../client-adm/factory/client-adm.facade.factory";
import AddClientAdmFacedeInputDto from "../../client-adm/facade/dto/client-adm-facade.dto";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
  const clientAdmFacade: ClientAdmFacadeInterface =
    ClientAdmFacedeFactory.create();

  try {
    const addClientAdmFacedeInputDto = {
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    } as AddClientAdmFacedeInputDto;

    const output = await clientAdmFacade.add(addClientAdmFacedeInputDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
