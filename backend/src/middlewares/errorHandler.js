import mongoose from "mongoose";
import { logger } from "../config/logger.js";
import { removeSensitive } from "../utils/sanitize.js";
import { ApiError } from "../core/apiError.js";

export const errorHandler = (err, req, res, next) => {
  const { method, originalUrl, body, query, params } = req;

  // 1. Set statusCode and message
  // ------------------------------------------
  let statusCode = 500;
  let message =
    "We are experiencing an internal error. Please retry or contact support if the issue persists.";

  // Handle Syntaxerror from req.body
  if (err instanceof SyntaxError && err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Invalid JSON payload";
  }

  // Handle defined api errors
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Handle mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = err.message;
  }

  // Handle DB ObjectId (_id) parse cast error.
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}`,
    });
  }

  // Handle duplicate key errors from Mongodb
  if (err.code === 11000) {
    statusCode = 409;
    message = `${Object.keys(err.keyValue).join(", ")} already exists`;
  }

  // 2. A safe response object
  // ------------------------------------------
  const response = {
    success: false,
    statusCode,
    message,
  };

  // Include custom validation array
  if (Array.isArray(err.errors) && statusCode === 400) {
    response.errors = err.errors;
  }

  // 3. Log error (without leaking sensitive info)
  // ------------------------------------------
  logger.error("API Error", {
    error: err.name,
    message,
    stack: err.stack,
    method,
    url: originalUrl,
    statusCode,
    query,
    params,
    body: removeSensitive(body, ["password"]),
    user: req.user?.id || null,
  });

  // 4. Send safe response
  // ------------------------------------------
  return res.status(statusCode).json(response);
};
