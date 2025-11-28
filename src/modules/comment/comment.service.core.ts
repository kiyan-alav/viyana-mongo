import mongoose from "mongoose";
import Comment from "./comment.model";
import { CommentData } from "./comment.types";

export const commentCoreService = {
  async create(data: CommentData) {
    const { commentBody, email, product, rate, user } = data;
    return await Comment.create({
      rate,
      commentBody,
      email,
      product: new mongoose.Types.ObjectId(product),
      user: new mongoose.Types.ObjectId(user),
    });
  },
};
