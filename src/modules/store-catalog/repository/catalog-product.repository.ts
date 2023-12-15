import { where } from "sequelize";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/entity/product.entity";
import CatalgoProductGateway from "../gateway/catalog-product.gateway";
import CatalogProductModel from "./catalog-product.model";

export default class CatalogProductRepository implements CatalgoProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await CatalogProductModel.findAll({
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
    const product = await CatalogProductModel.findByPk(id, { raw: true });

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salePrice: product.salesPrice,
    });
  }
}
