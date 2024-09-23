import express from "express";
import { BookingControllers } from "./bookings.controller";
import { auth } from "../../Middlewares/Auth";
import { USER_Role } from "../User/user.constant";
import { validateRequest } from "../../Middlewares/validateRequest";
import { BookingsValidation } from "./bookings.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(BookingsValidation.createBookingsValidationSchema),
  auth(USER_Role.user),
  BookingControllers.createBooking
);
router.get("/", auth(USER_Role.admin), BookingControllers.getAllBookings);
router.get(
  "/my-bookings",
  auth(USER_Role.user),
  BookingControllers.getMyBookings
);

export const BookingsRoutes = router;
