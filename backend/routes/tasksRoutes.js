import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task/taskControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/task/create", verifyToken, createTask);
router.get("/tasks", verifyToken, getTasks);
router.get("/task/:id", verifyToken, getTask);
router.patch("/task/:id", verifyToken, updateTask);
router.delete("/task/:id", verifyToken, deleteTask);

export default router;
