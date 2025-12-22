import { BadRequest } from "../../../core/apiError.js";

export const validateTask = (req, res, next) => {
  try {
    if (!req.body || !Object.keys(req.body).length) {
      throw new BadRequest("Task details are missing");
    }

    const { title, description, status } = req.body;

    const errors = [];

    if (!title?.trim()) errors.push("Task title is missing");
    if (!description?.trim()) errors.push("Task description is missing");
    if (!status?.trim()) errors.push("Task status is missing");
    
    if (errors.length) {
      throw new BadRequest("Validation failed", errors);
    }

    next();
  } catch (err) {
    next(err);
  }
};
