import httpStatus from "http-status";
import AppError from "../../errors/AppError";

import { TCar } from "./car.interface";
import { Car } from "./car.model";

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
    throw new AppError(httpStatus.NOT_FOUND, "Car not fond");
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
    throw new AppError(httpStatus.NOT_FOUND, "Car not found");
  }

  const updateCarBasicInfo = await Car.findByIdAndUpdate(id, remainingCarInfo, {
    new: true,
    runValidators: true,
  });

  if (!updateCarBasicInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update car info");
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

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  deletedCar,
  updateCar,
};
