import express from "express";
import { CarControllers } from "./car.controller";
import { validateRequest } from "../../Middlewares/validateRequest";
import { CarValidation } from "./car.validation";
import { USER_Role } from "../User/user.constant";
import { auth } from "../../Middlewares/Auth";

const router = express.Router();

router.post(
  "/",
  validateRequest(CarValidation.createCarValidationSchema),
  auth(USER_Role.admin),
  CarControllers.createCar
);
router.get("/", CarControllers.getAllCars);
router.get("/:id", CarControllers.getSingleCar);
router.delete("/:id", CarControllers.deletedCar);
router.put("/:id", CarControllers.updatedCar);

export const CarRoutes = router;
