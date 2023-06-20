import axios from "axios";
import { IProductRequestView } from "../models/IProductRequestView";
import { IProductResponseView } from "../models/IProductResponseView";

export class ProductService {
  private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL
    ? process.env.REACT_APP_EXPRESS_SERVER_URL
    : "";

  /**
   * @usage : Create a Product
   * @url : http://localhost:9000/api/products/
   * @body : title, description, imageUrl, brand, price, quantity, categoryId, subCategoryId
   * @method : POST
   * @access : PRIVATE
   */
  public static createProduct(product: IProductRequestView): Promise<{
    data: { status: string; msg: string; data: IProductResponseView };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/products/`;
    return axios.post(dataUrl, product);
  }

  /**
   * @usage : Update a Product
   * @url : http://localhost:9000/api/products/:productId
   * @body : title, description, imageUrl, brand, price, quantity, categoryId, subCategoryId
   * @method : PUT
   * @access : PRIVATE
   */
  public static updateProduct(
    product: IProductRequestView,
    productId: string
  ): Promise<{
    data: { status: string; msg: string; data: IProductResponseView };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/products/${productId}`;
    return axios.put(dataUrl, product);
  }

  /**
   * @usage : Get all Products
   * @url : http://localhost:9000/api/products/
   * @body : no-params
   * @method : GET
   * @access : PRIVATE
   */
  public static getAllProducts(): Promise<{
    data: { status: string; msg: string; data: IProductResponseView[] };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/products/`;
    return axios.get(dataUrl);
  }

  /**
   * @usage : Get a Product
   * @url : http://localhost:9000/api/products/:productId
   * @body : no-params
   * @method : GET
   * @access : PRIVATE
   */
  public static getProduct(productId: string): Promise<{
    data: { status: string; msg: string; data: IProductResponseView };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/products/${productId}`;
    return axios.get(dataUrl);
  }

  /**
   * @usage : Delete a Product
   * @url : http://localhost:9000/api/products/:productId
   * @body : no-params
   * @method : DELETE
   * @access : PRIVATE
   */
  public static deleteProduct(productId: string): Promise<{
    data: { status: string; msg: string; data: {} };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/products/${productId}`;
    return axios.delete(dataUrl);
  }

  /**
   * @usage : Get all products with category Id
   * @url : http://localhost:9000/api/products/categories/:categoryId
   * @body : no-params
   * @method : GET
   * @access : PRIVATE
   */
  public static getAllProductsWithCategoryId(
    categoryId: string
  ): Promise<{
    data: { status: string; msg: string; data: IProductResponseView[] };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/products/categories/${categoryId}`;
    return axios.get(dataUrl);
  }
}
