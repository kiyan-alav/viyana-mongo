import mongoose, { Schema } from "mongoose";
import { ICategory } from "./category.types";

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
