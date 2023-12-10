import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import AddProductAdmFacadeInputDto from "./dto/add-product-adm-facade.dto";
import ProductAdmFacedeInterface from "./product-adm.facade.interface";
import CheckStockFacadeInputDto from "./dto/add-product-adm-facade.dto";
import { AddProductInputDto } from "../usecase/add-product/dto/add-product.dto";
import CheckStockFacadeOutputDto from "./dto/add-product-adm-facade.dto";
import { CheckStockInputDto } from "../usecase/check-stock/dto/check-stock.dto";

export interface UseCasProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacede implements ProductAdmFacedeInterface {
  private _addProductUsecase: UseCaseInterface;
  private _checkStockProductUsecase: UseCaseInterface;

  constructor(usecaseProps: UseCasProps) {
    this._addProductUsecase = usecaseProps.addUseCase;
    this._checkStockProductUsecase = usecaseProps.stockUseCase;
  }

  addProduct(input: AddProductAdmFacadeInputDto): Promise<void> {
    const addProductInputDto = {
      id: input.id,
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    } as AddProductInputDto;

    return this._addProductUsecase.execute(input);
  }

  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    const product = {
      productId: input.productId,
    } as CheckStockInputDto;
    return this._checkStockProductUsecase.execute(product);
  }
}
