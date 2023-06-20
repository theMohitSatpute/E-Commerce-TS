import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserView } from "../../modules/users/models/IUserView";
import { UserService } from "../../modules/users/services/UserService";
import { IAddressView } from "../../modules/addresses/models/IAddressView";
import { AddressService } from "../../modules/addresses/services/AddressService";
import { AuthUtil } from "../../util/AuthUtil";

export const registerUserAction: any = createAsyncThunk(
  "users/registerUserAction",
  async (
    payload: { user: IUserView },
    { rejectWithValue }
  ): Promise<{ status: string; msg: string; data: IUserView } | any> => {
    try {
      const { user } = payload;
      const response = await UserService.registerUser(user);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const loginUserAction: any = createAsyncThunk(
  "users/loginUserAction",
  async (
    payload: { user: IUserView },
    { rejectWithValue }
  ): Promise<
    | { status: string; msg: string; data: { user: IUserView; token: string } }
    | any
  > => {
    try {
      const { user } = payload;
      const response = await UserService.loginUser(user);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const getUserInfoAction: any = createAsyncThunk(
  "users/getUserInfoAction",
  async (
    payload: {},
    { rejectWithValue }
  ): Promise<{ status: string; msg: string; data: IUserView } | any> => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const response = await UserService.getUserInfo();
        return response.data;
      }
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const updateProfilePictureAction: any = createAsyncThunk(
  "users/updateProfilePictureAction",
  async (
    payload: { imageUrl: string },
    { rejectWithValue }
  ): Promise<{ status: string; msg: string; data: IUserView } | any> => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { imageUrl } = payload;
        const response = await UserService.updateProfilePicture(imageUrl);
        return response.data;
      }
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const changePasswordAction: any = createAsyncThunk(
  "users/changePasswordAction",
  async (
    payload: { password: string },
    { rejectWithValue }
  ): Promise<{ status: string; msg: string; data: IUserView } | any> => {
    try {
      const { password } = payload;
      const response = await UserService.changePassword(password);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const createAddressAction: any = createAsyncThunk(
  "users/createAddressAction",
  async (
    payload: { address: IAddressView },
    { rejectWithValue }
  ): Promise<{ status: string; msg: string; data: IAddressView } | any> => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { address } = payload;
        const response = await AddressService.createAddress(address);
        return response.data;
      }
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const updateAddressAction: any = createAsyncThunk(
  "users/updateAddressAction",
  async (
    payload: { address: IAddressView; addressId: string },
    { rejectWithValue }
  ): Promise<{ status: string; msg: string; data: IAddressView } | any> => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { address, addressId } = payload;
        const response = await AddressService.updateAddress(address, addressId);
        return response.data;
      }
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const getMyAddressAction: any = createAsyncThunk(
  "users/getMyAddressAction",
  async (
    payload: {},
    { rejectWithValue }
  ): Promise<
    { status: string; msg: string; data: IAddressView | {} } | any
  > => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const response = await AddressService.getMyAddress();
        return response.data;
      }
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const deleteAddressAction: any = createAsyncThunk(
  "users/deleteAddressAction",
  async (
    payload: { addressId: string },
    { rejectWithValue }
  ): Promise<{ status: string; msg: string; data: {} } | any> => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { addressId } = payload;
        const response = await AddressService.deleteAddress(addressId);
        return response.data;
      }
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);
