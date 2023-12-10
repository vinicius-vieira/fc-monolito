export default interface AddClientAdmFacedeInputDto {
  name: string;
  email: string;
  address: string;
}

export default interface FindClientAdmFacadeInputDto {
  id: string;
}

export default interface FindClientAdmFacadeOutputDto {
  id: string;
  name: string;
  email: string;
  address: string;
}
