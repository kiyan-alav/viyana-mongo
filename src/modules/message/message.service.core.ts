import Message from "./message.model";
import { CreateMessageData } from "./message.types";

export const messageCoreService = {
  async create(data: CreateMessageData) {
    const { email, sender, text, title } = data;

    return await Message.create({
      sender,
      email,
      title,
      text,
    });
  },
};
