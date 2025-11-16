import { ENV } from "../configs/env";

export const getAvatarUrl = (filename?: string) => {
  if (!filename) return null;
  return `${ENV.BASE_URL || "http://localhost:5000"}/users/avatars/${filename}`;
};
