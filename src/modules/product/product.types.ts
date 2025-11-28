import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  category: mongoose.Types.ObjectId;
  stock: number;
  discount: number;
  specifications: string;
  details: string;
  productImages: string[];
}

export interface CreateProductData {
  title: string;
  price: number;
  category: string;
  stock: number;
  discount: number;
  specifications: string;
  details: string;
  productImages: string[];
}

export interface UpdateProductData {
  id: string;
  data: CreateProductData;
}

export interface CoreProductList {
  category: string;
}
