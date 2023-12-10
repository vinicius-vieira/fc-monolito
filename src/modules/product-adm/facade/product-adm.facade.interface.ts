import AddProductAdmFacedeInputDto from "./dto/add-product-adm-facade.dto";
import CheckStockFacadeInputDto from "./dto/add-product-adm-facade.dto";
import CheckStockFacadeOutputDto from "./dto/add-product-adm-facade.dto";

export default interface ProductAdmFacedeInterface {
  addProduct(input: AddProductAdmFacedeInputDto): Promise<void>;
  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto>;
}
