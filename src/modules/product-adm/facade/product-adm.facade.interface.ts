import AddProductAdmFacadeInputDto from "./dto/add-product-adm-facade.dto";
import CheckStockFacadeInputDto from "./dto/add-product-adm-facade.dto";
import CheckStockFacadeOutputDto from "./dto/add-product-adm-facade.dto";

export default interface ProductAdmFacadeInterface {
  addProduct(input: AddProductAdmFacadeInputDto): Promise<void>;
  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto>;
}
