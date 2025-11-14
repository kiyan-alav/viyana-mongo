import { ApiError } from "../../utils/ApiError";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  verifyPassword,
} from "../../utils/auth";
import User from "../user/user.model";
import { CreateUserData, LoginData } from "./auth.types";

export const authService = {
  async register(data: CreateUserData & { avatar?: string }) {
    const { firstName, lastName, email, mobile, password, avatar } = data;

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) throw new ApiError(400, "User already exists!");

    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "ADMIN" : "USER";

    const hashedPassword = await hashPassword(password);
    return await User.create({
      firstName,
      lastName,
      email,
      mobile,
      avatar: avatar || "",
      password: hashedPassword,
      role,
    });
  },
  async login(data: LoginData) {
    const { identifier, password } = data;

    const existingUser = await User.findOne({
      $or: [{ email: identifier }, { mobile: identifier }],
    });
    if (!existingUser) throw new ApiError(404, "User not found!");

    const isPasswordMatch = await verifyPassword(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      throw new ApiError(400, "Identifier or password is wrong!");
    }

    const accessToken = generateAccessToken({
      id: existingUser._id,
      role: existingUser.role,
    });
    const refreshToken = generateRefreshToken({
      id: existingUser._id,
      role: existingUser.role,
    });
    return {
      accessToken,
      refreshToken,
      existingUser,
    };
  },
};
