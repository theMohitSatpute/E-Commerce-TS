import {
  createSlice,
  isRejectedWithValue,
  SerializedError,
} from "@reduxjs/toolkit";
import {
  ICartProduct,
  ICartResponseView,
  ICartStorageType,
  UserObj,
} from "../../modules/carts/models/ICartResponseView";
import { ToastUtil } from "../../util/ToastUtil";
import * as cartActions from "./cart.action";
import { CartReduxHelper } from "./cartReduxHelper";

export const cartFeatureKey = "cartFeature";

export interface InitialState {
  loading: boolean;
  errorMessage: SerializedError;
  cart: ICartStorageType;
}

const initialState: InitialState = {
  loading: false,
  errorMessage: {} as SerializedError,
  cart: {
    _id: "",
    products: [] as ICartProduct[],
    total: "",
    tax: "",
    grandTotal: "",
    userObj: {} as UserObj,
    createdAt: "",
    updatedAt: "",
  } as ICartStorageType,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    addToCartAction: (state, action) => {
      state.cart = CartReduxHelper.addToCartItem(state.cart, action.payload);
    },
    incrementQuantityAction: (state, action) => {
      state.cart = CartReduxHelper.incrementQtyOfCartItem(
        state.cart,
        action.payload
      );
    },
    decrementQuantityAction: (state, action) => {
      state.cart = CartReduxHelper.decrementQtyOfCartItem(
        state.cart,
        action.payload
      );
    },
    deleteCartItemAction: (state, action) => {
      state.cart = CartReduxHelper.deleteCartItem(state.cart, action.payload);
      ToastUtil.displaySuccessMessage("Item is Deleted from Cart");
    },
    clearCartAction: (state, action) => {
      state.cart = {
        _id: "",
        products: [] as ICartProduct[],
        total: "",
        tax: "",
        grandTotal: "",
        userObj: {} as UserObj,
        createdAt: "",
        updatedAt: "",
      } as ICartStorageType;
    },
  },
  extraReducers: (builder) => {
    // createCartAction
    builder
      .addCase(cartActions.createCartAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(cartActions.createCartAction.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = CartReduxHelper.convertFromServerCartToClientCart(
          action.payload.data
        );
        ToastUtil.displaySuccessMessage(action.payload.msg);
      })
      .addCase(cartActions.createCartAction.rejected, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("Create Cart is Failed");
        }
      });

    // getCartInfoAction
    builder
      .addCase(cartActions.getCartInfoAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(cartActions.getCartInfoAction.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.cart = CartReduxHelper.convertFromServerCartToClientCart(
            action.payload.data
          );
        }
      })
      .addCase(cartActions.getCartInfoAction.rejected, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("Get Cart Info is Failed");
        }
      });
  },
});

export const {
  addToCartAction,
  incrementQuantityAction,
  decrementQuantityAction,
  deleteCartItemAction,
  clearCartAction,
} = cartSlice.actions;
