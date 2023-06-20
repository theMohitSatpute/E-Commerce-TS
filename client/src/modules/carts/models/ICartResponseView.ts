import {
  CategoryObj,
  SubCategoryObj,
} from "../../products/models/IProductResponseView";

export interface ICartResponseView {
  _id: string;
  products: ICartResponseProduct[];
  total: string;
  tax: string;
  grandTotal: string;
  userObj: UserObj;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICartStorageType {
  _id: string;
  products: ICartProduct[];
  total: string;
  tax: string;
  grandTotal: string;
  userObj: UserObj;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICartProduct {
  _id: string;
  title: string;
  count: number;
  description: string;
  imageUrl: string;
  brand: string;
  price: string;
  quantity: string;
  sold: number;
  userObj: string;
  categoryObj: string;
  subCategoryObj: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ICartResponseProduct {
  imageUrl: string | undefined;
  productObj: ProductObj;
  count: number;
  price: string;
  _id: string;
}

export interface ProductObj {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  brand: string;
  price: string;
  quantity: string;
  sold: number;
  userObj: string;
  categoryObj: string;
  subCategoryObj: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserObj {
  _id: string;
  username: string;
  email: string;
  password: string;
  imageUrl: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
