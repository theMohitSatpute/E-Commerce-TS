import axios from "axios";
import { IAddressView } from "../models/IAddressView";

export class AddressService {
  private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL
    ? process.env.REACT_APP_EXPRESS_SERVER_URL
    : "";

  /**
   * @usage : Create New Address
   * @url : http://localhost:9000/api/addresses/new
   * @body : mobile,flat,landmark,street,city,state,country,pinCode
   * @method : POST
   * @access : PRIVATE
   */
  public static createAddress(
    address: IAddressView
  ): Promise<{ data: { status: string; msg: string; data: IAddressView } }> {
    const dataUrl: string = `${this.serverUrl}/api/addresses/new`;
    return axios.post(dataUrl, address);
  }

  /**
   * @usage : Update Address
   * @url : http://localhost:9000/api/addresses/:addressId
   * @body : mobile,address,landmark,street,city,state,country,pinCode
   * @method : PUT
   * @access : PRIVATE
   */
  public static updateAddress(
    address: IAddressView,
    addressId: string
  ): Promise<{
    data: {
      status: string;
      msg: string;
      data: IAddressView;
    };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/addresses/${addressId}`;
    return axios.put(dataUrl, address);
  }

  /**
   * @usage : Get Address
   * @url : http://localhost:9000/api/addresses/me
   * @body : no-params
   * @method : GET
   * @access : PRIVATE
   */
  public static getMyAddress(): Promise<{
    data: {
      status: string;
      msg: string;
      data: IAddressView | {};
    };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/addresses/me`;
    return axios.get(dataUrl);
  }

  /**
   * @usage : Delete Address
   * @url : http://localhost:9000/api/addresses/:addressId
   * @body : no-params
   * @method : DELETE
   * @access : PRIVATE
   */
  public static deleteAddress(addressId: string): Promise<{
    data: {
      status: string;
      msg: string;
      data: {};
    };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/addresses/${addressId}`;
    return axios.delete(dataUrl);
  }
}
