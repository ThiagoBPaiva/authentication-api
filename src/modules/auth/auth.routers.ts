import { Router } from "express";
import { AuthController } from "./auth.controller";

export const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.authRegister.bind(authController));
