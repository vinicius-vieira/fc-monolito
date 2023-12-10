export default interface FindAProductInputDto {
  id: string;
}

export default interface FindAProductOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}
