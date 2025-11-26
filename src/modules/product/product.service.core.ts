import { ApiError } from "../../utils/ApiError";
import { paginateModel } from "../base.services";
import Comment from "../comment/comment.model";
import Product from "./product.model";
import { CoreProductList } from "./product.types";

export const productCoreService = {
  async list(skip: number, pageSize: number, categoryId: string) {
    const filter: Partial<CoreProductList> = {};

    if (categoryId) {
      filter.category = categoryId;
    }

    const { data, totalCount } = await paginateModel(
      Product,
      skip,
      pageSize,
      filter,
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
      throw new ApiError(404, "Banner not found");
    }

    const comments = await Comment.find({ product: id, status: "ACCEPTED" })
      .populate("user", "fullName email")
      .exec();

    return { ...foundedProduct.toObject(), comments };
  },
};

/**
 *
 */
