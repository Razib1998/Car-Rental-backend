import { User } from "../User/user.controller";
import { TUser } from "../User/user.interface";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
