import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Product from "../../domain/entity/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./dto/add-product.dto";

export default class AddProductUseCase implements UseCaseInterface {
  private _productRepository: ProductGateway;

  constructor(repo: ProductGateway) {
    this._productRepository = repo;
  }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    };

    const product = new Product(props);
    await this._productRepository.add(product);

    return {
      id: product.id.id,
      name: product.getName(),
      description: product.getDescription(),
      purchasePrice: product.getPurchasePrice(),
      stock: product.getStock(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
