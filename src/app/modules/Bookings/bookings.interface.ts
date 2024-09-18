import { Types } from "mongoose";

export type TBookings = {
  carId: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  totalCost: number;
};
