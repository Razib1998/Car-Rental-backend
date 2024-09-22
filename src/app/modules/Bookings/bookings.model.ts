import { model, Schema } from "mongoose";
import { TBookings } from "./bookings.interface";

const bookingSchema = new Schema<TBookings>(
  {
    carId: { type: String },

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
      _id: { type: Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      role: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    car: {
      _id: { type: Schema.Types.ObjectId, require: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      color: { type: String, required: true },
      isElectric: { type: Boolean, required: true },
      features: { type: [String], required: true },
      pricePerHour: { type: Number, required: true },
      status: { type: String, required: true },
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
