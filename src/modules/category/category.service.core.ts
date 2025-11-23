import Category from "./category.model";

export const categoryCoreService = {
  async list() {
    const categoryList = await Category.find({});
    return categoryList;
  },
};
