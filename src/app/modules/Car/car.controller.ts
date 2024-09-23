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

const getAllCars: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req, res, next) => {
    const result = await CarServices.getAllCarsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cars are retrieved Successfully!",
      data: result,
    });
  }
);

const getSingleCar: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req, res, next) => {
    const { id } = req.params;
    const result = await CarServices.getSingleCarFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Car is retrieved Successfully!",
      data: result,
    });
  }
);
const deletedCar: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req, res, next) => {
    const { id } = req.params;
    const result = await CarServices.deletedCar(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Car is deleted Successfully!",
      data: result,
    });
  }
);
const updatedCar: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req, res, next) => {
    const { id } = req.params;
    const result = await CarServices.updateCar(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Car is updated Successfully!",
      data: result,
    });
  }
);

const returnCar: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req, res, next) => {
    const carReturnData = req.body;
    const result = await CarServices.returnCar(carReturnData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Car return is Successfully!",
      data: result,
    });
  }
);

export const CarControllers = {
  createCar,
  getAllCars,
  getSingleCar,
  deletedCar,
  updatedCar,
  returnCar,
};
