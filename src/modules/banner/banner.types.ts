import { Document } from "mongoose";

export interface IBanner extends Document {
  link: string;
  image: string;
  type: "SQUARE" | "RECTANGLE";
}

export interface CreateBannerData {
  link: string;
  image: string;
  type: "SQUARE" | "RECTANGLE";
}

export interface UpdateBannerData {
  id: string;
  data: CreateBannerData;
}
