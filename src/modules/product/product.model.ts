import mongoose, { Schema } from "mongoose";

interface IProduct extends Document {
  title: string;
  price: number;
  category: mongoose.Types.ObjectId;
  stock: number;
  discount: number;
  specifications: string;
  details: string;
  productImages: string[];
  comment?: mongoose.Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: null,
    },
    specifications: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      default: null,
    },
    productImages: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "product",
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
