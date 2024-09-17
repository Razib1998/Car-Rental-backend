import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await AuthServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created Successfully",
    data: result,
  });
});

export const AuthControllers = {
  createUser,
};
