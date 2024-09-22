/* eslint-disable @typescript-eslint/no-namespace */
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./bookings.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
const createBooking: RequestHandler = catchAsync(async (req, res) => {
  const userData = req.user;
  const result = await BookingServices.createBookingIntoDB(req.body, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings Created Successfully",
    data: result,
  });
});

const getAllBookings: RequestHandler = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req, res, next) => {
    const result = await BookingServices.getAllBookingsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bookings are retrieved Successfully!",
      data: result,
    });
  }
);
export const BookingControllers = {
  createBooking,
  getAllBookings,
};
