import axios from "axios";
import { IUserView } from "../models/IUserView";

export class UserService {
  private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL
    ? process.env.REACT_APP_EXPRESS_SERVER_URL
    : "";

  /**
   * @usage : Register a User
   * @url : http://localhost:9000/api/users/register
   * @body : username , email , password
   * @method : POST
   * @access : PUBLIC
   */
  public static registerUser(
    user: IUserView
  ): Promise<{ data: { status: string; msg: string; data: IUserView } }> {
    const dataUrl: string = `${this.serverUrl}/api/users/register`;
    return axios.post(dataUrl, user);
  }

  /**
   * @usage : Login a User
   * @url : http://localhost:9000/api/users/login
   * @body : email , password
   * @method : POST
   * @access : PUBLIC
   */
  public static loginUser(user: IUserView): Promise<{
    data: {
      status: string;
      msg: string;
      data: { user: IUserView; token: string };
    };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/users/login`;
    return axios.post(dataUrl, user);
  }

  /**
   *  @usage : get users Info
   *  @url : http://localhost:9000/api/users/me
   *  @method : GET
   *  @body : no-params
   *  @access : PRIVATE
   */
  public static getUserInfo(): Promise<{
    data: { status: string; msg: string; data: IUserView };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/users/me`;
    return axios.get(dataUrl);
  }

  /**
   * @usage : update profile Picture
   * @url : http://localhost:9000/api/users/profile
   * @body : imageUrl
   * @method : POST
   * @access : PRIVATE
   */

  public static updateProfilePicture(
    imageUrl: string
  ): Promise<{ data: { status: string; msg: string; data: IUserView } }> {
    const dataUrl: string = `${this.serverUrl}/api/users/profile`;
    return axios.post(dataUrl, { imageUrl });
  }

  /**
   * @usage : change the password
   * @url : http://localhost:9000/api/users/change-password
   * @body : password
   * @method : POST
   * @access : PRIVATE
   */
  public static changePassword(
    password: string
  ): Promise<{ data: { status: string; msg: string; data: IUserView } }> {
    const dataUrl: string = `${this.serverUrl}/api/users/change-password`;
    return axios.post(dataUrl, { password });
  }
}
