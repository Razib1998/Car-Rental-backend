import { Bookings } from "../Bookings/bookings.model";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
import { convertTimeToHours } from "./car.utils";

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCarsFromDB = async () => {
  const result = await Car.find();
  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};
const deletedCar = async (id: string) => {
  // Check if the car is exists in database.

  const isCarExists = await Car.findById(id);
  if (!isCarExists) {
    throw new Error("Car not fond");
  }

  const result = await Car.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true }
  );
  return result;
};

const updateCar = async (id: string, payload: Partial<TCar>) => {
  const { features, ...remainingCarInfo } = payload;

  const existingCar = await Car.findById(id);

  if (!existingCar) {
    throw new Error("Car not found");
  }

  const updateCarBasicInfo = await Car.findByIdAndUpdate(id, remainingCarInfo, {
    new: true,
    runValidators: true,
  });

  if (!updateCarBasicInfo) {
    throw new Error("Failed to update car info");
  }

  const existingCarFeatures = existingCar.features || [];

  if (features && Array.isArray(features)) {
    const newFeatures = features;

    const addFeatures = newFeatures.filter(
      (el) => !existingCarFeatures.includes(el)
    );

    const removeFeatures = existingCarFeatures.filter(
      (el) => !newFeatures.includes(el)
    );

    if (addFeatures.length > 0) {
      await Car.findByIdAndUpdate(id, {
        $addToSet: { features: { $each: addFeatures } },
      });
    }

    if (removeFeatures.length > 0) {
      await Car.findByIdAndUpdate(id, {
        $pull: { features: { $in: removeFeatures } },
      });
    }
  }
  const result = await Car.findById(id);
  return result;
};

type TReturnData = {
  bookingId: string;
  endTime: string;
};

const returnCar = async (payload: TReturnData) => {
  const { bookingId, endTime } = payload;
  const isBookingExist = await Bookings.findById(bookingId);
  if (!isBookingExist) {
    throw new Error("Booking not found");
  }

  // Now calculate the total cost..

  const start = convertTimeToHours(isBookingExist.startTime);

  const end = convertTimeToHours(endTime);

  const duration = start - end;
  const totalCost = duration * isBookingExist.car.pricePerHour;
  const result = await Bookings.findByIdAndUpdate(bookingId, {
    endTime,
    totalCost,
  });
  return null;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  deletedCar,
  updateCar,
  returnCar,
};
