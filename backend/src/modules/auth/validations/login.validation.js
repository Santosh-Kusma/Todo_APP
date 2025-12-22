import { BadRequest } from "../../../core/apiError.js";

export function validateLogin(req, res, next) {
  try {
    // check whether body is blank or {}
    if (!req.body || !Object.keys(req.body).length)
      throw new BadRequest("Login details are missing");

    const { email, password } = req.body;

    const errors = [];

    if (!email?.trim()) {
      errors.push("user email is missing");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) errors.push("Invalid email format");
    }

    // check data types too else might get unhandled errors
    if (typeof password !== "string" || !password.trim())
      errors.push("Password must be a non-empty string");
    if (errors.length > 0) {
      throw new BadRequest("Validation failed", errors);
    }
    next();
  } catch (err) {
    next(err);
  }
}
