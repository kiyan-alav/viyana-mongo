import fs from "fs";
import multer from "multer";
import path from "path";

export const makeUploader = (folder: string) => {
  const uploadDir = path.join(__dirname, "..", "..", "public", folder);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueName = Date.now() + "-" + ext;
      cb(null, uniqueName);
    },
  });

  return multer({ storage });
};

export const userAvatarUpload = makeUploader("users/avatars");
export const bannerUpload = makeUploader("banners");
export const categoryUpload = makeUploader("categories");
