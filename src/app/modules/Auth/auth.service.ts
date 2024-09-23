import config from "../../config";
import { User } from "../User/user.controller";
import { TUser } from "../User/user.interface";
import bcryptjs from "bcryptjs";
import { TAuth } from "./auth.interface";
import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createUserIntoDB = async (payload: TUser) => {
  // check if the user is already existed,
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(400, "User Already Exists");
  }

  // hash password..

  payload.password = await bcryptjs.hash(
    payload.password,
    Number(config.bcrypt_salt_round)
  );

  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TAuth) => {
  const user = await User.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  //  check password..

  const isMatchedPassword = await bcryptjs.compare(
    payload?.password,
    user?.password
  );

  if (!isMatchedPassword) {
    throw new AppError(httpStatus.NOT_FOUND, "Password did not match");
  }

  // Now create the access token..

  const jwtPayload = {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
    phone: user?.phone,
    address: user?.address,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  return {
    data: user,
    token: accessToken,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
