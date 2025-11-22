import { ApiError } from "../../utils/ApiError";
import { paginateModel } from "../base.services";
import Banner from "./banner.model";
import { CreateBannerData, UpdateBannerData } from "./banner.types";

export const bannerAdminService = {
  async list(skip: number, pageSize: number) {
    const { data, totalCount } = await paginateModel(Banner, skip, pageSize);

    return { data, totalCount };
  },

  async create(data: CreateBannerData) {
    const { image, link, type } = data;

    return await Banner.create({
      link,
      image,
      type,
    });
  },

  async delete(id: string) {
    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      throw new ApiError(404, "Banner not found");
    }

    return deletedBanner;
  },

  async update({ data, id }: UpdateBannerData) {
    const banner = await Banner.findById(id);

    if (!banner) {
      throw new ApiError(404, "Banner not found");
    }

    if (data.link !== undefined) banner.link = data.link;
    if (data.type !== undefined) banner.type = data.type;
    if (data.image !== undefined && data.image !== "")
      banner.image = data.image;

    await banner.save();

    return banner;
  },
};
