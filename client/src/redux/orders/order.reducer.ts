import {
  createSlice,
  isRejectedWithValue,
  SerializedError,
} from "@reduxjs/toolkit";
import { ToastUtil } from "../../util/ToastUtil";
import * as orderActions from "./order.action";
import { IOrderStorageType } from "../../modules/orders/models/IOrderResponseView";
import { OrderReduxHelper } from "./OrderReduxHelper";

export const orderFeatureKey = "orderFeature";

export interface InitialState {
  loading: boolean;
  errorMessage: SerializedError;
  order: IOrderStorageType;
  orders: IOrderStorageType[];
}

const initialState: InitialState = {
  loading: false,
  errorMessage: {} as SerializedError,
  order: {} as IOrderStorageType,
  orders: [] as IOrderStorageType[],
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // placeOrderAction
    builder
      .addCase(orderActions.placeOrderAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(orderActions.placeOrderAction.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.order = OrderReduxHelper.convertFromServerOrderToClientOrder(
            action.payload.data
          );
        }
        ToastUtil.displaySuccessMessage(action.payload.msg);
      })
      .addCase(orderActions.placeOrderAction, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("Place Order is Failed");
        }
      });

    // getAllOrdersAction
    builder
      .addCase(orderActions.getAllOrdersAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(orderActions.getAllOrdersAction.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.orders =
            OrderReduxHelper.convertFromServerOrderToClientOrderList(
              action.payload.data
            );
        }
      })
      .addCase(orderActions.getAllOrdersAction.rejected, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("Get All Orders is Failed");
        }
      });

    // getMyOrdersAction
    builder
      .addCase(orderActions.getMyOrdersAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(orderActions.getMyOrdersAction.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.orders =
            OrderReduxHelper.convertFromServerOrderToClientOrderList(
              action.payload.data
            );
        }
      })
      .addCase(orderActions.getMyOrdersAction.rejected, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("Get My Orders is Failed");
        }
      });

    // updateOrderStatusAction
    builder
      .addCase(
        orderActions.updateOrderStatusAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        orderActions.updateOrderStatusAction.fulfilled,
        (state, action) => {
          state.loading = false;
          if (action.payload.data) {
            state.order = OrderReduxHelper.convertFromServerOrderToClientOrder(
              action.payload.data
            );
          }
          ToastUtil.displaySuccessMessage(action.payload.msg);
        }
      )
      .addCase(
        orderActions.updateOrderStatusAction.rejected,
        (state, action) => {
          state.loading = false;
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.payload;
            ToastUtil.displayErrorMessage("Update Order Status is Failed");
          }
        }
      );
  },
});
