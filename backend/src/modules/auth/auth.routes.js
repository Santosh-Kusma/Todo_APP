import express from "express";
import { AuthController } from "./auth.controller.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { validateRegister, validateLogin } from "./validations/index.js";

const authController = new AuthController();

export const router = express.Router();

router.post(
  "/register",
  validateRegister,
  asyncHandler(authController.register)
);
router.post("/login", validateLogin, asyncHandler(authController.login));
