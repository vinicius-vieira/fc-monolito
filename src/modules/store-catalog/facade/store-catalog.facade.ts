import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import FindAllStoreCatalogFacadeOutputDto from "./dto/store-catalog-facade.dto";
import StoreCatalogFacedeInterface from "./store-catalog-facade.interface";
import FindStoreCatalogFacadeInputDto from "./dto/store-catalog-facade.dto";
import FindStoreCatalogFacadeOutpuDto from "./dto/store-catalog-facade.dto";

export interface UseCaseProps {
  findAllUseCase: FindAllProductsUseCase;
  findUseCase: FindProductUseCase;
}

export default class StoreCatalogFacade implements StoreCatalogFacedeInterface {
  private _findAllProductsUseCase: FindAllProductsUseCase;
  private _findProductUseCase: FindProductUseCase;

  constructor(usecaseProps: UseCaseProps) {
    this._findAllProductsUseCase = usecaseProps.findAllUseCase;
    this._findProductUseCase = usecaseProps.findUseCase;
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return (await this._findAllProductsUseCase.execute()) as FindAllStoreCatalogFacadeOutputDto;
  }

  async find(
    input: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutpuDto> {
    return (await this._findProductUseCase.execute(
      input
    )) as FindStoreCatalogFacadeOutpuDto;
  }
}
