import { where } from "sequelize";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/entity/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll({
      raw: true,
    });
    return products.map(
      (p) =>
        new Product({
          id: new Id(p.id),
          name: p.name,
          description: p.description,
          salePrice: p.salesPrice,
        })
    );
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findByPk(id, { raw: true });

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salePrice: product.salesPrice,
    });
  }
}
