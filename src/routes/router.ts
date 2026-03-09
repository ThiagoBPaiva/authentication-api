import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routers"

export const router = Router();

router.use("/auth", authRouter);
