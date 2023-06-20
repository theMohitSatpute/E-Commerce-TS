import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthUtil } from "../../util/AuthUtil";
import { IProductRequestView } from "../../modules/products/models/IProductRequestView";
import { ProductService } from "../../modules/products/services/ProductService";
import { IProductResponseView } from "../../modules/products/models/IProductResponseView";

export const createProductAction: any = createAsyncThunk(
  "users/createProductAction",
  async (
    payload: { product: IProductRequestView },
    { rejectWithValue }
  ): Promise<
    { status: string; msg: string; data: IProductResponseView } | any
  > => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { product } = payload;
        const response = await ProductService.createProduct(product);
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

export const updateProductAction: any = createAsyncThunk(
  "users/updateProductAction",
  async (
    payload: { product: IProductRequestView; productId: string },
    { rejectWithValue }
  ): Promise<
    { status: string; msg: string; data: IProductResponseView } | any
  > => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { product, productId } = payload;
        const response = await ProductService.updateProduct(product, productId);
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

export const getAllProductsAction: any = createAsyncThunk(
  "users/getAllProductsAction",
  async (
    payload: {},
    { rejectWithValue }
  ): Promise<
    { status: string; msg: string; data: IProductResponseView[] } | any
  > => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const response = await ProductService.getAllProducts();
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

export const getProductAction: any = createAsyncThunk(
  "users/getProductAction",
  async (
    payload: {
      productId: string;
    },
    { rejectWithValue }
  ): Promise<
    { status: string; msg: string; data: IProductResponseView } | any
  > => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { productId } = payload;
        const response = await ProductService.getProduct(productId);
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

export const deleteProductAction: any = createAsyncThunk(
  "users/deleteProductAction",
  async (
    payload: {
      productId: string;
    },
    { rejectWithValue }
  ): Promise<{ status: string; msg: string; data: {} } | any> => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { productId } = payload;
        const response = await ProductService.deleteProduct(productId);
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

export const getAllProductsWithCategoryIdAction: any = createAsyncThunk(
  "users/getAllProductsWithCategoryIdAction",
  async (
    payload: { categoryId: string },
    { rejectWithValue }
  ): Promise<
    { status: string; msg: string; data: IProductResponseView[] } | any
  > => {
    try {
      if (AuthUtil.isSetTokenToHeader()) {
        const { categoryId } = payload;
        const response = await ProductService.getAllProductsWithCategoryId(
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
