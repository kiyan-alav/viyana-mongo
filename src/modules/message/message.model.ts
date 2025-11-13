import mongoose, { Schema } from "mongoose";

interface IMessage extends Document {
  sender: string;
  email: string;
  title: string;
  text: string;
}

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
