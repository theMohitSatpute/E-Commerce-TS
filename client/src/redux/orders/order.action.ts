import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthUtil } from "../../util/AuthUtil";
import { IOrderRequestView } from "../../modules/orders/models/IOrderRequestView";
import { OrderService } from "../../modules/orders/services/OrderService";
import { IOrderResponseView } from "../../modules/orders/models/IOrderResponseView";

export const placeOrderAction: any = createAsyncThunk(
  "users/placeOrderAction",
  async (
    payload: { order: IOrderRequestView },
    { rejectWithValue }
  ): Promise<
    { status: string; msg: string; data: IOrderResponseView } | any
  > => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { order } = payload;
        const response = await OrderService.placeOrder(order);
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

export const getAllOrdersAction: any = createAsyncThunk(
  "users/getAllOrdersAction",
  async (
    payload: {},
    { rejectWithValue }
  ): Promise<
    { status: string; msg: string; data: IOrderResponseView[] } | any
  > => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const response = await OrderService.getAllOrders();
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

export const getMyOrdersAction: any = createAsyncThunk(
  "users/getMyOrdersAction",
  async (
    payload: {},
    { rejectWithValue }
  ): Promise<
    { status: string; msg: string; data: IOrderResponseView[] } | any
  > => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const response = await OrderService.getMyOrders();
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

export const updateOrderStatusAction: any = createAsyncThunk(
  "users/updateOrderStatusAction",
  async (
    payload: { orderStatus: string; orderId: string },
    { rejectWithValue }
  ): Promise<
    { status: string; msg: string; data: IOrderResponseView } | any
  > => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { orderStatus, orderId } = payload;
        const response = await OrderService.updateOrderStatus(
          orderStatus,
          orderId
        );
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
