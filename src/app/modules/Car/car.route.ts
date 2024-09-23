import express from "express";
import { CarControllers } from "./car.controller";
import { validateRequest } from "../../Middlewares/validateRequest";
import { CarValidation } from "./car.validation";
import { USER_Role } from "../User/user.constant";
import { auth } from "../../Middlewares/Auth";

const router = express.Router();

router.post(
  "/",
  auth(USER_Role.admin),
  validateRequest(CarValidation.createCarValidationSchema),

  CarControllers.createCar
);
router.get("/", CarControllers.getAllCars);
router.get("/:id", CarControllers.getSingleCar);
router.delete("/:id", CarControllers.deletedCar);
router.put("/return", CarControllers.returnCar);
router.put(
  "/:id",
  auth(USER_Role.admin),
  validateRequest(CarValidation.updateCarValidationSchema),
  CarControllers.updatedCar
);

export const CarRoutes = router;
