import { Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  image: string;
}

export interface CreateCategoryData {
  name: string;
  image: string;
}

export interface UpdateCategoryData {
  id: string;
  data: CreateCategoryData;
}
