import {
  ICartProduct,
  ICartResponseView,
  ICartStorageType,
} from "../../modules/carts/models/ICartResponseView";
import { IProductResponseView } from "../../modules/products/models/IProductResponseView";
import { ToastUtil } from "../../util/ToastUtil";

interface ProductPayload {
  product: IProductResponseView;
  count: number;
}

export class CartReduxHelper {
  public static PRODUCT_TAX = 5.0;

  public static calculateTotal(products: ICartProduct[]): number {
    let total: number = 0;
    for (let product of products) {
      total += Number(product.count) * Number(product.price);
    }
    return total;
  }

  public static calculateTax(products: ICartProduct[]): number {
    return (this.calculateTotal(products) / 100) * this.PRODUCT_TAX;
  }

  public static calculateGrandTotal(products: ICartProduct[]): number {
    return this.calculateTax(products) + this.calculateTotal(products);
  }

  public static addToCartItem(
    cart: ICartStorageType,
    payload: ProductPayload
  ): ICartStorageType {
    const { product, count } = payload;
    let newCart = cart;
    const isExists = cart.products.find(
      (cartProduct) => cartProduct._id === product._id
    );
    if (isExists) {
      ToastUtil.displayErrorMessage("Item is already in Cart");
    } else {
      newCart = {
        ...cart,
        products: [
          ...cart.products,
          {
            ...product,
            count: count,
            userObj: product.userObj._id,
            categoryObj: product.categoryObj._id,
            subCategoryObj: product.subCategoryObj._id,
          },
        ],
      };
      ToastUtil.displaySuccessMessage("Item is added to Cart");
    }
    return newCart;
  }

  public static convertFromServerCartToClientCart(
    cart: ICartResponseView
  ): ICartStorageType {
    const products: ICartProduct[] = cart.products.map((product) => {
      return {
        _id: product.productObj._id,
        title: product.productObj.title,
        count: product.count,
        description: product.productObj.description,
        imageUrl: product.productObj.imageUrl,
        brand: product.productObj.brand,
        price: product.price,
        quantity: product.productObj.quantity,
        sold: product.productObj.sold,
        userObj: product.productObj.userObj,
        categoryObj: product.productObj.userObj,
        subCategoryObj: product.productObj.subCategoryObj,
        createdAt: product.productObj.createdAt,
        updatedAt: product.productObj.updatedAt,
      };
    });
    return {
      ...cart,
      products: products,
    } as ICartStorageType;
  }

  public static incrementQtyOfCartItem(
    cart: ICartStorageType,
    payload: { productId: string }
  ): ICartStorageType {
    return {
      ...cart,
      products: cart.products.map((product) => {
        if (product._id === payload.productId) {
          return {
            ...product,
            count: product.count + 1,
          };
        }
        return product;
      }),
    };
  }

  public static decrementQtyOfCartItem(
    cart: ICartStorageType,
    payload: { productId: string }
  ): ICartStorageType {
    return {
      ...cart,
      products: cart.products.map((product) => {
        if (product._id === payload.productId) {
          return {
            ...product,
            count: product.count - 1 > 0 ? product.count - 1 : 1,
          };
        }
        return product;
      }),
    };
  }

  public static deleteCartItem(
    cart: ICartStorageType,
    payload: { productId: string }
  ): ICartStorageType {
    return {
      ...cart,
      products: cart.products.filter(
        (product) => product._id !== payload.productId
      ),
    };
  }
}
