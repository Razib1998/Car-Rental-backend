import express from "express";
import { AuthControllers } from "./auth.controller";
import { UserValidations } from "../User/user.validation";
import { validateRequest } from "../../Middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.createUser
);
router.post(
  "/signin",
  validateRequest(AuthValidation.userLoginValidationSchema),
  AuthControllers.login
);

export const AuthRoutes = router;
