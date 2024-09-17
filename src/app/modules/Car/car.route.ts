import express from "express";
import { CarControllers } from "./car.controller";
import { validateRequest } from "../../Middlewares/validateRequest";
import { CarValidation } from "./car.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(CarValidation.createCarValidationSchema),
  CarControllers.createCar
);
router.get("/", CarControllers.getAllCars);
router.get("/:id", CarControllers.getSingleCar);
router.delete("/:id", CarControllers.deletedCar);
router.put("/:id", CarControllers.updatedCar);

export const CarRoutes = router;
