import {
  SerializedError,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { IProductResponseView } from "../../modules/products/models/IProductResponseView";
import * as productAction from "./product.action";
import { ToastUtil } from "../../util/ToastUtil";

export const productFeatureKey = "productFeature";

export interface InitialState {
  loading: boolean;
  errorMessage: SerializedError;
  product: IProductResponseView;
  products: IProductResponseView[];
}
const initialState: InitialState = {
  loading: false,
  errorMessage: {} as SerializedError,
  product: {} as IProductResponseView,
  products: {} as IProductResponseView[],
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create Product
    builder.addCase(
      productAction.createProductAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      productAction.createProductAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        ToastUtil.displaySuccessMessage(action.payload.msg);
      }
    );
    builder.addCase(
      productAction.createProductAction.rejected,
      (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("create product is Failed");
        }
      }
    );
    // update Product
    builder.addCase(
      productAction.updateProductAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      productAction.updateProductAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        ToastUtil.displaySuccessMessage(action.payload.msg);
      }
    );
    builder.addCase(
      productAction.updateProductAction.rejected,
      (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("update product is Failed");
        }
      }
    );
    // get all Products
    builder.addCase(
      productAction.getAllProductsAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      productAction.getAllProductsAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      }
    );
    builder.addCase(
      productAction.getAllProductsAction.rejected,
      (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("get all product is Failed");
        }
      }
    );
    // get Products
    builder.addCase(productAction.getProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      productAction.getProductAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      }
    );
    builder.addCase(
      productAction.getProductAction.rejected,
      (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("get product is Failed");
        }
      }
    );
    // delete Product
    builder.addCase(
      productAction.deleteProductAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      productAction.deleteProductAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        ToastUtil.displayInfoMessage(action.payload.msg);
      }
    );
    builder.addCase(
      productAction.deleteProductAction.rejected,
      (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("delete product is Failed");
        }
      }
    );
    // getAllProductsWithCategoryIdAction
    builder
      .addCase(
        productAction.getAllProductsWithCategoryIdAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        productAction.getAllProductsWithCategoryIdAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.products = action.payload.data;
        }
      )
      .addCase(
        productAction.getAllProductsWithCategoryIdAction.rejected,
        (state, action) => {
          state.loading = false;
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.payload;
            ToastUtil.displayErrorMessage(
              "Get Products with Category is Failed"
            );
          }
        }
      );
  },
});
