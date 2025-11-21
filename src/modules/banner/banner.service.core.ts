import Banner from "./banner.model";

export const bannerCoreService = {
  async list() {
    const bannersList = await Banner.find().select("-__v");

    return bannersList;
  },
};
