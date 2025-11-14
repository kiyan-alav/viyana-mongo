import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken";
import { ENV } from "../configs/env";

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const verifyPassword = async (pass: string, hashPass: string) => {
  const isValid = await bcrypt.compare(pass, hashPass);
  return isValid;
};

export const generateAccessToken = async (data: Record<string, string>) => {
  const token = jsonWebToken.sign({ ...data }, ENV.ACCESS_TOKEN_KEY, {
    expiresIn: "4h",
  });
  return token;
};

export const generateRefreshToken = async (data: Record<string, string>) => {
  const token = jsonWebToken.sign({ ...data }, ENV.REFRESH_TOKEN_KEY, {
    expiresIn: "15d",
  });
  return token;
};
