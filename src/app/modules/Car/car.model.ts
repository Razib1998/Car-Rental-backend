import { model, Schema } from "mongoose";
import { TCar } from "./car.interface";

const carSchema = new Schema<TCar>(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    description: {
      type: String,
      required: [true, "Name is Required"],
    },
    color: {
      type: String,
      required: [true, "Color is Required"],
    },
    isElectric: {
      type: Boolean,
      required: [true, "isElectric is Required"],
    },
    features: {
      type: [String],
      required: [true, "Feature is Required"],
    },
    pricePerHour: {
      type: Number,
      required: [true, " Price perHour is Required"],
      min: 0,
    },
    status: {
      type: String,
      default: "available",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Car = model("Car", carSchema);
