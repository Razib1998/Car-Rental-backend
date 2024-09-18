/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/User/user.interface";
import catchAsync from "../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { User } from "../modules/User/user.controller";
import config from "../config";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization as string).split(" ")[1];

    if (!token) {
      throw new Error("You are not authorized");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not exists");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error("You are not authorized");
    }
    req.user = decoded as JwtPayload;
    next();
  });

  // err
};
