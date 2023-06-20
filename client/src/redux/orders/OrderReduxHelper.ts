import {
  IOrderProduct,
  IOrderResponseView,
  IOrderStorageType,
  OrderResponseProduct,
} from "../../modules/orders/models/IOrderResponseView";

export class OrderReduxHelper {
  public static convertFromServerOrderToClientOrder(
    order: IOrderResponseView
  ): IOrderStorageType {
    const products: IOrderProduct[] = this.convertOrderProducts(order.products);
    return {
      ...order,
      products: products,
    } as IOrderStorageType;
  }

  public static convertOrderProducts(
    products: OrderResponseProduct[]
  ): IOrderProduct[] {
    return products.map((product) => {
      if (product.productObj) {
        return {
          _id: product.productObj._id,
          title: product.productObj.title,
          count: product.count,
          description: product.productObj.description,
          imageUrl: product.productObj.imageUrl,
          brand: product.productObj.brand,
          price: product.productObj.price,
          quantity: product.productObj.quantity,
          sold: product.productObj.sold,
          userObj: product.productObj.userObj,
          categoryObj: product.productObj.userObj,
          subCategoryObj: product.productObj.subCategoryObj,
          createdAt: product.productObj.createdAt,
          updatedAt: product.productObj.updatedAt,
        };
      } else {
        return {} as IOrderProduct;
      }
    });
  }

  public static convertFromServerOrderToClientOrderList(
    orders: IOrderResponseView[]
  ): IOrderStorageType[] {
    return orders.map((serverOrder) => {
      return {
        _id: serverOrder._id,
        products: this.convertOrderProducts(serverOrder.products),
        total: serverOrder.total,
        tax: serverOrder.tax,
        grandTotal: serverOrder.grandTotal,
        paymentType: serverOrder.paymentType,
        orderStatus: serverOrder.orderStatus,
        orderBy: serverOrder.orderBy,
        createdAt: serverOrder.createdAt,
        updatedAt: serverOrder.updatedAt,
        __v: serverOrder.__v,
      };
    });
  }

  public static getOrderStatusList(): string[] {
    return [
      "Order Placed",
      "Processing",
      "Dispatched",
      "Delivered",
      "Cancelled",
      "Completed",
    ];
  }
}
