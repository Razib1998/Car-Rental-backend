import { Types } from "mongoose";
import { TCar } from "../Car/car.interface";

export interface TBookings extends TCar {
  carId?: string;
  date: string;
  startTime: string;
  endTime: string;
  car: {
    _id: Types.ObjectId;
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    features: string[];
    pricePerHour: number;
    status: string;
  };
  user: {
    _id: Types.ObjectId;
    name: string;
    email: string;
    role: string;
    phone: string;
    address: string;
  };
  totalCost: number;
}
