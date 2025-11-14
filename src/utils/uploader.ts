import fs from "fs";
import multer from "multer";
import path from "path";

const avatarsDir = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "users",
  "avatars"
);

if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(avatarsDir));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
