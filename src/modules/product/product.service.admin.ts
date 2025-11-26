import { ApiError } from "../../utils/ApiError";
import { paginateModel } from "../base.services";
import Product from "./product.model";
import { CreateProductData, UpdateProductData } from "./product.types";

export const productAdminService = {
  async list(skip: number, pageSize: number) {
    const { data, totalCount } = await paginateModel(
      Product,
      skip,
      pageSize,
      {},
      ["category"],
      "title price stock discount createdAt"
    );
    return {
      data,
      totalCount,
    };
  },

  async single(id: string) {
    const foundedProduct = await Product.findById(id).populate("category");

    if (!foundedProduct) {
      throw new ApiError(404, "Product not found");
    }

    return foundedProduct;
  },

  async create(data: CreateProductData) {
    const {
      category,
      details,
      discount,
      price,
      productImages,
      specifications,
      stock,
      title,
    } = data;

    return await Product.create({
      category,
      details,
      discount,
      price,
      productImages,
      specifications,
      stock,
      title,
    });
  },

  async delete(id: string) {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      throw new ApiError(404, "Banner not found");
    }

    return deletedProduct;
  },

  async update({ id, data }: UpdateProductData) {
    const product = await Product.findById(id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return updatedProduct;
  },
};
