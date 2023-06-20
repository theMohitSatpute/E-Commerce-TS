import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthUtil } from "../../util/AuthUtil";
import { ICategoryView } from "../../modules/categories/models/ICategoriesView";
import { CategoryService } from "../../modules/categories/services/CategoryService";
import { ISubCategoryView } from "../../modules/categories/models/ISubCategoryView";

export const createCategoryAction: any = createAsyncThunk(
  "users/createCategoryAction",
  async (
    payload: { category: ICategoryView },
    { rejectWithValue }
  ): Promise<{ status: string; msg: string; data: ICategoryView } | any> => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { category } = payload;
        const response = await CategoryService.createCategory(category);
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
export const createSubCategoryAction: any = createAsyncThunk(
  "users/createSubCategoryAction",
  async (
    payload: { subCategory: ISubCategoryView; categoryId: string },
    { rejectWithValue }
  ): Promise<{ status: string; msg: string; data: ISubCategoryView } | any> => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { subCategory, categoryId } = payload;
        const response = await CategoryService.createSubCategory(
          subCategory,
          categoryId
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

export const getAllCategoriesAction: any = createAsyncThunk(
  "users/getAllcategoriesAction",
  async (
    payload: {},
    { rejectWithValue }
  ): Promise<{ status: string; msg: string; data: ICategoryView[] } | any> => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const response = await CategoryService.getAllcategories();
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
