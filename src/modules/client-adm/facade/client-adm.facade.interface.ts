import AddClientAdmFacedeInputDto from "./dto/client-adm-facade.dto";
import FindClientAdmFacadeInputDto from "./dto/client-adm-facade.dto";
import FindClientAdmFacadeOutputDto from "./dto/client-adm-facade.dto";

export default interface ClientAdmFacadeInterface {
  add(input: AddClientAdmFacedeInputDto): Promise<void>;
  find(
    input: FindClientAdmFacadeInputDto
  ): Promise<FindClientAdmFacadeOutputDto>;
}
