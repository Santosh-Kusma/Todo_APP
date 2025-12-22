import express from "express";
import { TaskController } from "./tasks.controller.js";
import { validateTask } from "./validations/index.js";
const taskController = new TaskController();

export const router = express.Router();

router.post("/", validateTask, taskController.createTask);
router.get("/", taskController.getTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
