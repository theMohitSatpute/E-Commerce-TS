import axios from "axios";
import { ICategoryView } from "../models/ICategoriesView";
import { ISubCategoryView } from "../models/ISubCategoryView";

export class CategoryService {
  private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL
    ? process.env.REACT_APP_EXPRESS_SERVER_URL
    : "";

  /**
   * @usage : Create a Category
   * @url : http://localhost:9000/api/categories/
   * @body : name, description
   * @method : POST
   * @access : PRIVATE
   */
  public static createCategory(
    category: ICategoryView
  ): Promise<{ data: { status: string; msg: string; data: ICategoryView } }> {
    const dataUrl: string = `${this.serverUrl}/api/categories/`;
    return axios.post(dataUrl, category);
  }

  /**
   * @usage : Create a Sub Category
   * @url : http://localhost:9000/api/categories/:categoryId
   * @body : name, description
   * @method : POST
   * @access : PRIVATE
   */
  public static createSubCategory(
    subCategory: ISubCategoryView,
    categoryId: string
  ): Promise<{
    data: {
      status: string;
      msg: string;
      data: ISubCategoryView;
    };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/categories/${categoryId}`;
    return axios.post(dataUrl, subCategory);
  }

  /**
   * @usage : Get all categories
   * @url : http://localhost:9000/api/categories/
   * @body : no-params
   * @method : GET
   * @access : PRIVATE
   */
  public static getAllcategories(): Promise<{
    data: {
      status: string;
      msg: string;
      data: ICategoryView[];
    };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/categories/`;
    return axios.get(dataUrl);
  }
}
