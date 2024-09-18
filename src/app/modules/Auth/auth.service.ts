import config from "../../config";
import { USER_Role } from "../User/user.constant";
import { User } from "../User/user.controller";
import { TUser } from "../User/user.interface";
import bcryptjs from "bcryptjs";
import { TAuth } from "./auth.interface";
import jwt from "jsonwebtoken";

const createUserIntoDB = async (payload: TUser) => {
  // check if the user is already existed,
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new Error("User Already Exists");
  }
  // set User role

  payload.role = USER_Role.user;

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
    throw new Error("User not found");
  }

  //  check password..

  const isMatchedPassword = await bcryptjs.compare(
    payload?.password,
    user?.password
  );

  if (!isMatchedPassword) {
    throw new Error("Password did not match");
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
