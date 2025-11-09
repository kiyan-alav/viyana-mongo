import mongoose from "mongoose";

export const connectToDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI not found in .env");

  await mongoose.connect(uri);
  console.log("✅ MongoDB connected");
};
