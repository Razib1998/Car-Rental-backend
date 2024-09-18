import { USER_Role } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: keyof typeof USER_Role;
  phone: string;
  address: string;
};

export type TUserRole = keyof typeof USER_Role;
