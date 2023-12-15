import PlaceOrderUsecase from "./place-order.usecase";
import { PlaceOrderInputDto } from "./dto/place-order.dto";
import CheckStockFacadeOutputDto from "../../../product-adm/facade/dto/add-product-adm-facade.dto";
import StoreCatalogFacedeInterface from "../../../store-catalog/facade/store-catalog-facade.interface";
import Product from "../../domain/entity/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import PaymentFacadeInterface from "../../../payment/facade/payment.facade.interface";
import { InvoiceFacadeInterface } from "../../../invoice/facade/invoice.facade.interface";

const mockDate = new Date(2000, 1, 2);

describe("PlaceOrderUsacase unit test", () => {
  describe("validateProducts method test", () => {
    const mockClientFacade = {
      add: jest.fn(),
      find: jest.fn().mockResolvedValue(null),
    };
    const mockProductFacade = {
      addProduct: jest.fn(),
      checkStock: jest.fn(({ productId }: { productId: string }) =>
        Promise.resolve({
          productId,
          stock: productId === "1" ? 0 : 1,
        } as CheckStockFacadeOutputDto)
      ),
    };
    const mockCatalogFacade = {
      findAll: jest.fn(),
      find: jest.fn(),
    } as StoreCatalogFacedeInterface;

    const mockPaymentFacade = {
      process: jest.fn(),
    } as PaymentFacadeInterface;

    const mockInvoiceFacade = {
      generate: jest.fn().mockResolvedValue({ id: "1" }),
      find: jest.fn(),
    } as InvoiceFacadeInterface;

    it("should throw error if no product is out of stock", async () => {
      const placeOrderUsecase = new PlaceOrderUsecase(
        mockClientFacade,
        mockProductFacade,
        mockCatalogFacade,
        mockPaymentFacade,
        mockInvoiceFacade,
        null
      );

      let input: PlaceOrderInputDto = {
        clientId: "0",
        products: [{ productId: "1" }],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("Product 1 is not availabl in stock"));

      input = {
        clientId: "0",
        products: [{ productId: "0" }, { productId: "1" }],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("Product 1 is not availabl in stock"));
      expect(mockProductFacade.checkStock).toBeCalledTimes(3);

      input = {
        clientId: "0",
        products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("Product 1 is not availabl in stock"));
      expect(mockProductFacade.checkStock).toBeCalledTimes(5);
    });
  });

  describe("getProduct method", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(mockDate);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    const mockClientFacade = {
      add: jest.fn(),
      find: jest.fn().mockResolvedValue(null),
    };

    const mockProductFacade = {
      addProduct: jest.fn(),
      checkStock: jest.fn(({ productId }: { productId: string }) =>
        Promise.resolve({
          productId,
          stock: productId === "1" ? 0 : 1,
        } as CheckStockFacadeOutputDto)
      ),
    };

    let mockCatalogFacade = {
      findAll: jest.fn(),
      find: jest.fn().mockResolvedValue(null),
    } as StoreCatalogFacedeInterface;

    const mockPaymentFacade = {
      process: jest.fn(),
    } as PaymentFacadeInterface;

    const mockInvoiceFacade = {
      generate: jest.fn().mockResolvedValue({ id: "1" }),
      find: jest.fn(),
    } as InvoiceFacadeInterface;

    it("should throw error when product not found", async () => {
      const placeOrderUsecase = new PlaceOrderUsecase(
        mockClientFacade,
        mockProductFacade,
        mockCatalogFacade,
        mockPaymentFacade,
        mockInvoiceFacade,
        null
      );

      await expect(placeOrderUsecase["getProduct"]("0")).rejects.toThrow(
        new Error("Product not found")
      );
    });

    it("should return a product", async () => {
      mockCatalogFacade = {
        findAll: jest.fn(),
        find: jest.fn().mockResolvedValue({
          id: "0",
          name: "product 0",
          description: "product description",
          salesPrice: 0,
        }),
      } as StoreCatalogFacedeInterface;

      const placeOrderUsecase = new PlaceOrderUsecase(
        mockClientFacade,
        mockProductFacade,
        mockCatalogFacade,
        mockPaymentFacade,
        mockInvoiceFacade,
        null
      );

      await expect(placeOrderUsecase["getProduct"]("0")).resolves.toEqual(
        new Product({
          id: new Id("0"),
          name: "product 0",
          description: "product description",
          salesPrice: 0,
        })
      );
      expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("execute method", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(mockDate);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("should throw error when client not found", async () => {
      const mockClientFacade = {
        add: jest.fn(),
        find: jest.fn().mockResolvedValue(null),
      };

      const mockProductFacade = {
        checkStock: jest.fn(),
        addProduct: jest.fn(),
      };

      const mockCatalogFacade = {
        findAll: jest.fn(),
        find: jest.fn(),
      } as StoreCatalogFacedeInterface;

      const mockPaymentFacade = {
        process: jest.fn(),
      };

      const mockInvoiceFacade = {
        generate: jest.fn().mockResolvedValue({ id: "1" }),
        find: jest.fn(),
      } as InvoiceFacadeInterface;

      const placeOrderUsecase = new PlaceOrderUsecase(
        mockClientFacade,
        mockProductFacade,
        mockCatalogFacade,
        mockPaymentFacade,
        mockInvoiceFacade,
        null
      );

      const input: PlaceOrderInputDto = { clientId: "0", products: [] };

      await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
        new Error("Client not found")
      );
    });

    it("should throw error when products are not valid", async () => {
      const mockClientFacade = {
        add: jest.fn(),
        find: jest.fn().mockResolvedValue(true),
      };

      const mockProductFacade = {
        checkStock: jest.fn(),
        addProduct: jest.fn(),
      };

      const mockCatalogFacade = {
        findAll: jest.fn(),
        find: jest.fn(),
      } as StoreCatalogFacedeInterface;

      const mockPaymentFacade = {
        process: jest.fn(),
      };

      const mockInvoiceFacade = {
        generate: jest.fn().mockResolvedValue({ id: "1" }),
        find: jest.fn(),
      } as InvoiceFacadeInterface;

      const placeOrderUsecase = new PlaceOrderUsecase(
        mockClientFacade,
        mockProductFacade,
        mockCatalogFacade,
        mockPaymentFacade,
        mockInvoiceFacade,
        null
      );

      const mockValidateProduts = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUsecase, "validateProducts")
        //@ts-expect-error - not return never
        .mockRejectedValue(new Error("No products selected"));

      const input: PlaceOrderInputDto = { clientId: "0", products: [] };

      await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
        new Error("No products selected")
      );

      expect(mockValidateProduts).toHaveBeenCalledTimes(1);
    });

    describe("place an order", () => {
      const clientProps = {
        id: "1c",
        name: "Client 1c",
        document: "0000",
        email: "client@user.com",
        street: "some address",
        number: "1",
        complement: "",
        city: "some city",
        state: "some state",
        zipCode: "000",
      };

      const mockClientFacade = {
        add: jest.fn(),
        find: jest.fn().mockResolvedValue(clientProps),
      };

      const mockProductFacade = {
        checkStock: jest.fn(),
        addProduct: jest.fn(),
      };

      const mockCatalogFacade = {
        findAll: jest.fn(),
        find: jest.fn(),
      } as StoreCatalogFacedeInterface;

      let mockPaymentFacade = {
        process: jest.fn(),
      };

      const mockInvoiceFacade = {
        generate: jest.fn().mockResolvedValue({ id: "1" }),
        find: jest.fn(),
      } as InvoiceFacadeInterface;

      const mockCheckoutRepo = {
        addOrder: jest.fn(),
        findOrder: jest.fn(),
      };

      const products = {
        "1": new Product({
          id: new Id("1"),
          name: "Product 1",
          description: "Product 1 description",
          salesPrice: 40,
        }),
        "2": new Product({
          id: new Id("2"),
          name: "Product 2",
          description: "Product 2 description",
          salesPrice: 30,
        }),
      };

      const placeOrderUsecase = new PlaceOrderUsecase(
        mockClientFacade,
        mockProductFacade,
        mockCatalogFacade,
        mockPaymentFacade,
        mockInvoiceFacade,
        mockCheckoutRepo
      );

      const mockValidateProduts = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUsecase, "validateProducts")
        //@ts-expect-error - not return never
        .mockRejectedValue(null);

      const mockGetProduct = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUsecase, "getProduct")
        //@ts-expect-error - not return never
        .mockImplementation((productId: keyof typeof products) => {
          return products[productId];
        });

      it("should not be approved", async () => {
        mockPaymentFacade = {
          process: jest.fn().mockReturnValue({
            transactionId: "1t",
            orderId: "1o",
            amout: 100,
            status: "error",
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        };

        const input: PlaceOrderInputDto = {
          clientId: "1c",
          products: [{ productId: "1" }, { productId: "2" }],
        };

        let output = await placeOrderUsecase.execute(input);

        expect(output.invoiceId).toBeNull();
        expect(output.total).toBe(70);
        expect(output.products).toStrictEqual([
          { productId: "1" },
          { productId: "2" },
        ]);

        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" });

        expect(mockValidateProduts).toHaveBeenCalledTimes(1);
        expect(mockValidateProduts).toHaveBeenCalledWith(input);

        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepo).toHaveBeenCalledTimes(1);

        expect(mockPaymentFacade).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade).toHaveBeenCalledWith({
          orderId: output.id,
          amount: output.total,
        });

        expect(mockInvoiceFacade).toHaveBeenCalledTimes(0);
      });

      it("should be approved", async () => {
        mockPaymentFacade = {
          process: jest.fn().mockReturnValue({
            transactionId: "1t",
            orderId: "1o",
            amout: 100,
            status: "approved",
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        };

        const input: PlaceOrderInputDto = {
          clientId: "1c",
          products: [{ productId: "1" }, { productId: "2" }],
        };

        let output = await placeOrderUsecase.execute(input);

        expect(output.invoiceId).toBeNull();
        expect(output.total).toBe(70);
        expect(output.products).toStrictEqual([
          { productId: "1" },
          { productId: "2" },
        ]);

        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" });

        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(2);

        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({
          orderId: output.id,
          amount: output.total,
        });

        expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1);
      });
    });
  });
});
