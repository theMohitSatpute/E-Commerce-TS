import axios from "axios";
import { IOrderRequestView } from "../models/IOrderRequestView";
import { IOrderResponseView } from "../models/IOrderResponseView";

export class OrderService {
  private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL
    ? process.env.REACT_APP_EXPRESS_SERVER_URL
    : "";

  /**
   * @usage : place an order
   * @url : http://localhost:9000/api/orders/place
   * @body : products[{product, count,price}],total,tax,grandTotal,paymentType
   * @method : POST
   * @access : PRIVATE
   */
  public static placeOrder(
    order: IOrderRequestView
  ): Promise<{
    data: { status: string; msg: string; data: IOrderResponseView };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/orders/place`;
    return axios.post(dataUrl, order);
  }

  /**
   * @usage : get all orders
   * @url : http://localhost:9000/api/orders/all
   * @body : no-params
   * @method : GET
   * @access : PRIVATE
   */
  public static getAllOrders(): Promise<{
    data: { status: string; msg: string; data: IOrderResponseView[] };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/orders/all`;
    return axios.get(dataUrl);
  }

  /**
   * @usage : get my orders
   * @url : http://localhost:9000/api/orders/me
   * @body : no-params
   * @method : GET
   * @access : PRIVATE
   */
  public static getMyOrders(): Promise<{
    data: { status: string; msg: string; data: IOrderResponseView[] };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/orders/me`;
    return axios.get(dataUrl);
  }

  /**
   * @usage : update order status
   * @url : http://localhost:9000/api/orders/:orderId
   * @body : orderStatus
   * @method : POST
   * @access : PRIVATE
   */
  public static updateOrderStatus(
    orderStatus: string,
    orderId: string
  ): Promise<{
    data: { status: string; msg: string; data: IOrderResponseView };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/orders/${orderId}`;
    return axios.post(dataUrl, { orderStatus });
  }
}
