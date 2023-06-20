import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthUtil } from "../../util/AuthUtil";
import { CartService } from "../../modules/carts/services/CartService";
import { ICartResponseView } from "../../modules/carts/models/ICartResponseView";
import { ICartRequestView } from "../../modules/carts/models/ICartRequestView";

export const createCartAction: any = createAsyncThunk(
  "users/createCartAction",
  async (
    payload: { cart: ICartRequestView },
    { rejectWithValue }
  ): Promise<
    { status: string; msg: string; data: ICartResponseView } | any
  > => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { cart } = payload;
        const response = await CartService.createCart(cart);
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

export const getCartInfoAction: any = createAsyncThunk(
  "users/getCartInfoAction",
  async (
    payload: {},
    { rejectWithValue }
  ): Promise<
    { status: string; msg: string; data: ICartResponseView | null } | any
  > => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const response = await CartService.getCartInfo();
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
