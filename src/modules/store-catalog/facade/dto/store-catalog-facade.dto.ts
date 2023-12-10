export default interface FindAllStoreCatalogFacadeOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export default interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export default interface FindStoreCatalogFacadeOutpuDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}
