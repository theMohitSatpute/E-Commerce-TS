import {
  SerializedError,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { ICategoryView } from "../../modules/categories/models/ICategoriesView";
import { ISubCategoryView } from "../../modules/categories/models/ISubCategoryView";
import * as categoryAction from "./category.action";
import { ToastUtil } from "../../util/ToastUtil";

export const categoryFeatureKey = "categoryFeature";

export interface InitialState {
  loading: boolean;
  errorMessage: SerializedError;
  category: ICategoryView;
  subCategory: ISubCategoryView;
  categories: ICategoryView[];
}

const initialState: InitialState = {
  loading: false,
  errorMessage: {} as SerializedError,
  category: {} as ICategoryView,
  subCategory: {} as ISubCategoryView,
  categories: {} as ICategoryView[],
};

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create category
    builder.addCase(
      categoryAction.createCategoryAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      categoryAction.createCategoryAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
        ToastUtil.displaySuccessMessage(action.payload.msg);
      }
    );
    builder.addCase(
      categoryAction.createCategoryAction.rejected,
      (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("create category is Failed");
        }
      }
    );

    // create sub category
    builder.addCase(
      categoryAction.createSubCategoryAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      categoryAction.createSubCategoryAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.subCategory = action.payload.data;
        ToastUtil.displaySuccessMessage(action.payload.msg);
      }
    );
    builder.addCase(
      categoryAction.createSubCategoryAction.rejected,
      (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("create sub category is Failed");
        }
      }
    );
    //get all category
    builder.addCase(
      categoryAction.getAllCategoriesAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      categoryAction.getAllCategoriesAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      }
    );
    builder.addCase(
      categoryAction.getAllCategoriesAction.rejected,
      (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("get all is category is Failed");
        }
      }
    );
  },
});
