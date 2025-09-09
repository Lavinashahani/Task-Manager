import express from "express";
import {
  logout,
  login,
  signup,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/authControllers.js";

import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;
