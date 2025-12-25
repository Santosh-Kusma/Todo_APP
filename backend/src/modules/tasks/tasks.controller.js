import { BadRequest } from "../../core/apiError.js";
import { CreatedResponse, SuccessResponse } from "../../core/apiResponse.js";
import { TaskService } from "./tasks.service.js";

const taskService = new TaskService();

export class TaskController {
  async createTask(req, res, next) {
    const { title, description, status } = req.body;
    const userId = req.user.id; // attach to task
    const task = await taskService.addTask({
      title,
      description,
      status,
      userId,
    });
    return res
      .status(201)
      .json(new CreatedResponse("Task created successfully", task));
  }

  async getTasks(req, res, next) {
    const userId = req.user.id;
    const tasks = await taskService.getUserTasks(userId);
    return res
      .status(200)
      .json(new SuccessResponse("Your tasks fetched successfully", tasks));
  }

  async updateTask(req, res, next) {
    if (!req.body || !Object.keys(req.body).length) {
      throw new BadRequest("Task details are missing");
    }
    const { title, description, status } = req.body;
    const taskId = req.params.id;
    const userId = req.user.id;

    const updates = {};
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (status) updates.status = status;

    if (!Object.keys(updates).length)
      throw new BadRequest("No fields provided to update");

    const task = await taskService.updateUserTask(userId, taskId, updates);
    return res
      .status(200)
      .json(new SuccessResponse("Your task updated successfully", task));
  }

  async deleteTask(req, res, next) {
    const taskId = req.params.id;
    const userId = req.user.id;
    const task = await taskService.deleteUserTask(userId, taskId);
    return res
      .status(200)
      .json(new SuccessResponse("Your task deleted successfully", task));
  }
}
