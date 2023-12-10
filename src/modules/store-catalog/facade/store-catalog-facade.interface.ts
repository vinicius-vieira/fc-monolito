import FindAllStoreCatalogFacadeOutputDto from "./dto/store-catalog-facade.dto";
import FindStoreCatalogFacadeOutpuDto from "./dto/store-catalog-facade.dto";
import FindStoreCatalogFacadeInputDto from "./dto/store-catalog-facade.dto";

export default interface StoreCatalogFacedeInterface {
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
  find(
    input: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutpuDto>;
}
