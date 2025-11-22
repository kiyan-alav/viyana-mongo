import { ApiError } from "../../utils/ApiError";
import { paginateModel } from "../base.services";
import Message from "./message.model";

export const messageAdminService = {
  async list(skip: number, pageSize: number) {
    const { data, totalCount } = await paginateModel(Message, skip, pageSize);

    return { data, totalCount };
  },

  async delete(id: string) {
    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      throw new ApiError(404, "Message not found");
    }

    return deletedMessage;
  },
};
