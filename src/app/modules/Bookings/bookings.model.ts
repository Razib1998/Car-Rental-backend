import { model, Schema } from "mongoose";
import { TBookings } from "./bookings.interface";

const bookingSchema = new Schema<TBookings>(
  {
    carId: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      unique: true,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Bookings = model("Bookings", bookingSchema);
