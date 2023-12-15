import AddClientAdmFacedeInputDto from "./dto/client-adm-facade.dto";
import FindClientAdmFacadeInputDto from "./dto/client-adm-facade.dto";
import FindClientAdmFacadeOutputDto from "./dto/client-adm-facade.dto";
import AddClientAdmFacadeOutputDto from "./dto/client-adm-facade.dto";

export default interface ClientAdmFacadeInterface {
  add(input: AddClientAdmFacedeInputDto): Promise<AddClientAdmFacadeOutputDto>;

  find(
    input: FindClientAdmFacadeInputDto
  ): Promise<FindClientAdmFacadeOutputDto>;
}
