import axios from "axios";
import { ICartResponseView } from "../models/ICartResponseView";
import { ICartRequestView } from "../models/ICartRequestView";
import { ICategoryView } from "../../categories/models/ICategoriesView";

export class CartService {
  static createCategory(category: ICategoryView) {
    throw new Error("Method not implemented.");
  }
  private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL
    ? process.env.REACT_APP_EXPRESS_SERVER_URL
    : "";

  /**
   * @usage : create a Cart
   * @url : http://localhost:9000/api/carts/
   * @body :products[{product, count,price}],total,tax,grandTotal
   * @method : POST
   * @access : PRIVATE
   */
  public static createCart(cart: ICartRequestView): Promise<{
    data: { status: string; msg: string; data: ICartResponseView };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/carts/`;
    return axios.post(dataUrl, cart);
  }

  /**
   * @usage : get Cart Info
   * @url : http://localhost:9000/api/carts/me
   * @body : no-params
   * @method : GET
   * @access : PRIVATE
   */
  public static getCartInfo(): Promise<{
    data: { status: string; msg: string; data: ICartResponseView };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/carts/me`;
    return axios.get(dataUrl);
  }
}
