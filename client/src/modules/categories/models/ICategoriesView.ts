import { ISubCategoryView } from "./ISubCategoryView";

export interface ICategoryView {
  _id?: string;
  name: string;
  description: string;
  subCategories?: ISubCategoryView[];
  createdAt?: Date;
  updatedAt?: Date;
}
