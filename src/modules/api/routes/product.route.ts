import express, { Request, Response } from "express";
import ProductAdmFacedeFactory from "../../product-adm/factory/product-adm.factory";
import ProductAdmFacadeInterface from "../../product-adm/facade/product-adm.facade.interface";
import AddProductAdmFacedeInputDto from "../../product-adm/facade/dto/add-product-adm-facade.dto";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const productAdmFacade: ProductAdmFacadeInterface =
    ProductAdmFacedeFactory.create();

  try {
    const addProductAdmFacedeInputDto = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.price,
      stock: req.body.quatity,
    } as AddProductAdmFacedeInputDto;

    const output = await productAdmFacade.addProduct(
      addProductAdmFacedeInputDto
    );
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
