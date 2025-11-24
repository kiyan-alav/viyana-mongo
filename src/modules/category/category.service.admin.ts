import { ApiError } from "../../utils/ApiError";
import { paginateModel } from "../base.services";
import Category from "./category.model";
import { CreateCategoryData, UpdateCategoryData } from "./category.types";

export const categoryAdminService = {
  async list(skip: number, pageSize: number) {
    const { data, totalCount } = await paginateModel(Category, skip, pageSize);
    return {
      data,
      totalCount,
    };
  },

  async create(data: CreateCategoryData) {
    const { image, name } = data;

    return await Category.create({
      image,
      name,
    });
  },

  async delete(id: string) {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      throw new ApiError(404, "Category not found");
    }

    return deletedCategory;
  },

  async update({ id, data }: UpdateCategoryData) {
    const updatedCategory = await Category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      throw new ApiError(404, "Category not found");
    }

    return updatedCategory;
  },
};
