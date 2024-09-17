import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { CarServices } from "./car.service";

const createCar: RequestHandler = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car Created Successfully",
    data: result,
  });
});

export const CarControllers = {
  createCar,
};
