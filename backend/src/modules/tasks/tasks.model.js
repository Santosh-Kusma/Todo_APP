import { Schema, model } from "mongoose";
import { taskStatuses } from "../../core/constants.js";

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: taskStatuses.PENDING,
      enum: {
        values: Object.values(taskStatuses),
        message: ({ value }) =>
          `Invalid status '${value}'. Allowed statuses: ${Object.values(taskStatuses).join(", ")}`,
      },
    },
  },
  { timestamps: true }
);

export const Task = model("Task", taskSchema);
