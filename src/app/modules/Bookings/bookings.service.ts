import { JwtPayload } from "jsonwebtoken";
import { Car } from "../Car/car.model";
import { TBookings } from "./bookings.interface";
import { Bookings } from "./bookings.model";

const createBookingIntoDB = async (
  payload: TBookings,
  userData: JwtPayload
) => {
  const { carId, date, startTime } = payload;

  // check if the car is available

  const isExistsCar = await Car.findById(carId);
  if (!isExistsCar || isExistsCar?.status === "unavailable") {
    throw new Error("Car is not available");
  }

  const user = {
    _id: userData._id,
    name: userData?.name,
    email: userData?.email,
    role: userData?.role,
    phone: userData?.phone,
    address: userData?.address,
  };

  const car = {
    _id: isExistsCar?._id,
    name: isExistsCar?.name,
    description: isExistsCar?.description,
    color: isExistsCar?.color,
    isElectric: isExistsCar?.isElectric,
    features: isExistsCar?.features,
    pricePerHour: isExistsCar?.pricePerHour,
    status: isExistsCar?.status,
    isDeleted: isExistsCar?.isDeleted,
  };

  // update the car status ..
  await Car.findByIdAndUpdate(carId, { status: "unavailable" });

  // Add car and user data to the booking payload,

  const bookingPayload = {
    date,
    startTime,
    user,
    car,
  };
  const result = await Bookings.create(bookingPayload);
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Bookings.find();
  return result;
};
const getMyBookingsFromDB = async (email: string) => {
  const result = await Bookings.find({ "user.email": email });
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getMyBookingsFromDB,
};
