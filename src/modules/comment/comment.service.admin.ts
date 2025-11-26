import { ApiError } from "../../utils/ApiError";
import { paginateModel } from "../base.services";
import Comment from "./comment.model";

export const commentAdminService = {
  async list(skip: number, pageSize: number) {
    const { data, totalCount } = await paginateModel(
      Comment,
      skip,
      pageSize,
      {},
      [
        { path: "user", select: "_id firstName lastName" },
        {
          path: "product",
          select: "_id title category",
          populate: {
            path: "category",
            select: "_id name",
          },
        },
      ],
      "-__v -updatedAt"
    );
    return {
      data,
      totalCount,
    };
  },

  async accept(id: string) {
    const comment = await Comment.findById(id);

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    if (comment.status !== "PENDING") {
      throw new ApiError(400, "This comment already reviewed");
    }

    comment.status = "ACCEPTED";
    await comment.save();

    return comment;
  },

  async reject(id: string) {
    const comment = await Comment.findById(id);

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    if (comment.status !== "PENDING") {
      throw new ApiError(400, "This comment already reviewed");
    }

    comment.status = "REJECTED";
    await comment.save();

    return comment;
  },
};
