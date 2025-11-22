import { Document, FilterQuery, Model } from "mongoose";

export async function paginateModel<T extends Document>(
  Model: Model<T>,
  skip: number,
  pageSize: number,
  filter: FilterQuery<T> = {}
) {
  const [data, totalCount] = await Promise.all([
    Model.find(filter).skip(skip).limit(pageSize).select("-__v"),
    Model.countDocuments(filter),
  ]);

  return { data, totalCount };
}
