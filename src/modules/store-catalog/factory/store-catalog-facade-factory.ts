import StoreCatalogFacade from "../facade/store-catalog.facade";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import ProductRepository from "../repository/product.repository";
import StoreCatalogFacedeInterface from "../facade/store-catalog-facade.interface";

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacedeInterface {
    const productRepository = new ProductRepository();
    const findAllProductsUseCase = new FindAllProductsUseCase(
      productRepository
    );
    const findProductsUseCase = new FindProductUseCase(productRepository);
    const storeCatalogFacade = new StoreCatalogFacade({
      findAllUseCase: findAllProductsUseCase,
      findUseCase: findProductsUseCase,
    });
    return storeCatalogFacade;
  }
}
