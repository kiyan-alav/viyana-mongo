import mongoose, { Schema } from "mongoose";

interface IComment extends Document {
  rate: number;
  commentBody: string;
  email: string;
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

const CommentSchema = new Schema<IComment>(
  {
    rate: {
      type: Number,
      min: 0,
      max: 5,
    },
    commentBody: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const Comment =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
