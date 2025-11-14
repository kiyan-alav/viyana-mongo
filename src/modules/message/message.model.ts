import mongoose, { Schema } from "mongoose";
import { IMessage } from "./message.types";

const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
