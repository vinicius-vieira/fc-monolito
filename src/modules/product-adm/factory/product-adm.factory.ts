import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "../facade/product-adm.facade";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacedeFactory {
  static create(): ProductAdmFacade {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkoutUseCase = new CheckStockUseCase(productRepository);
    const productAdmFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUseCase: checkoutUseCase,
    });
    return productAdmFacade;
  }
}
