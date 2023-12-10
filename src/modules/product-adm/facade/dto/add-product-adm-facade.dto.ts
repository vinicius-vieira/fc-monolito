export default interface AddProductAdmFacedeInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export default interface CheckStockFacadeInputDto {
  productId: string;
}

export default interface CheckStockFacadeOutputDto {
  productId: string;
  stock: number;
}
