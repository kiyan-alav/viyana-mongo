import jsonwebtoken from "jsonwebtoken";
import { ENV } from "../../configs/env";
import { ApiError } from "../../utils/ApiError";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  verifyPassword,
} from "../../utils/auth";
import { getAvatarUrl } from "../../utils/file";
import User from "../user/user.model";
import {
  AuthRequest,
  CreateUserData,
  JwtPayloadCustom,
  LoginData,
} from "./auth.types";

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
    }).select("-__v");

    if (!existingUser) throw new ApiError(404, "User not found!");

    const isPasswordMatch = await verifyPassword(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      throw new ApiError(400, "Identifier or password is wrong!");
    }

    const accessToken = generateAccessToken({
      id: existingUser._id.toString(),
      role: existingUser.role,
    });

    const refreshToken = generateRefreshToken({
      id: existingUser._id.toString(),
      role: existingUser.role,
    });

    const userPlain = existingUser.toObject();
    Reflect.deleteProperty(userPlain, "password");
    Reflect.deleteProperty(userPlain, "id");

    userPlain.avatar = getAvatarUrl(userPlain.avatar);

    await User.findByIdAndUpdate(existingUser._id, {
      $set: {
        refreshToken: refreshToken,
      },
    });

    return {
      accessToken,
      refreshToken,
      userPlain,
    };
  },

  async getMe(req: AuthRequest) {
    const user = await User.findById(req.user?.id);
    return user;
  },

  async refreshToken(req: AuthRequest) {
    const user = await User.findById(req.user?.id);

    const decoded = jsonwebtoken.verify(
      user.refreshToken,
      ENV.REFRESH_TOKEN_KEY
    ) as JwtPayloadCustom;

    if (!decoded) {
      throw new ApiError(401, "Wrong token");
    }

    const newAccessToken = generateAccessToken({
      id: user._id,
      role: user.role,
    });

    return newAccessToken;
  },
};
