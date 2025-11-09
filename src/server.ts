import dotenv from "dotenv";
import app from "./app";
import { connectToDB } from "./configs/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB connection failed:", err));
