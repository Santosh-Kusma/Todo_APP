import { BadRequest, Forbidden, NotFound } from "../../core/apiError.js";
import { TaskRepository } from "./tasks.repository.js";

const taskRepository = new TaskRepository();

export class TaskService {
  async addTask(task) {
    return await taskRepository.create(task);
  }

  async getUserTasks(userId) {
    const tasks = await taskRepository.findAll(userId);
    if (!tasks.length) {
      throw new NotFound("You haven't added any task yet");
    }
    return tasks;
  }

  async updateUserTask(userId, taskId, modifyTask) {
    const task = await taskRepository.findById(taskId);
    if (!task) {
      throw new BadRequest("Task not found");
    }

    if (task.userId.toString() !== userId) {
      throw new Forbidden("You are not allowed to update this task");
    }

    return await taskRepository.update(taskId, modifyTask);
  }

  async deleteUserTask(userId, taskId) {
    const task = await taskRepository.findById(taskId);
    if (!task) {
      throw new BadRequest("Task not found");
    }

    if (task.userId.toString() !== userId) {
      throw new Forbidden("You are not allowed to delete this task");
    }

    return await taskRepository.delete(taskId);
  }
}
