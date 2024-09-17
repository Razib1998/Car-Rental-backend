import config from "../../config";
import { USER_Role } from "../User/user.constant";
import { User } from "../User/user.controller";
import { TUser } from "../User/user.interface";
import bcryptjs from "bcryptjs";

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

export const AuthServices = {
  createUserIntoDB,
};
