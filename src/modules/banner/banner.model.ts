import mongoose, { Schema } from "mongoose";
import { IBanner } from "./banner.types";

const BannerSchema = new Schema<IBanner>({
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["SQUARE", "RECTANGLE"],
  },
});

const Banner =
  mongoose.models.Banner || mongoose.model<IBanner>("Banner", BannerSchema);

export default Banner;
