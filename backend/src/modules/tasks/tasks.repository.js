import { Task } from "./tasks.model.js";

export class TaskRepository {
  async create(task) {
    const newTask = new Task(task);
    return await newTask.save();
  }

  async findAll(userId) {
    return await Task.find({ userId });
  }

  async findById(taskId) {
    return await Task.findById(taskId);
  }

  async update(taskId, task) {
    return await Task.findByIdAndUpdate(
      taskId,
      { $set: task },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async delete(taskId) {
    return await Task.findByIdAndDelete(taskId);
  }
}
