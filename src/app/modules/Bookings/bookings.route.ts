import express from "express";
import { BookingControllers } from "./bookings.controller";
import { auth } from "../../Middlewares/Auth";
import { USER_Role } from "../User/user.constant";

const router = express.Router();

router.post("/", auth(USER_Role.user), BookingControllers.createBooking);
router.get("/", auth(USER_Role.admin), BookingControllers.getAllBookings);

export const BookingsRoutes = router;
