import { BadRequest } from "../../../core/apiError.js";

export function validateRegister(req, res, next) {
  try {
    // check whether body is blank or {}
    if (!req.body || !Object.keys(req.body).length) {
      throw new BadRequest("User details are missing");
    }

    const { name, email, password } = req.body;

    const errors = [];

    if (!name?.trim()) errors.push("user name is missing");

    if (!email?.trim()) {
      errors.push("user email is missing");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) errors.push("Invalid email format");
    }

    // check data types too else might get unhandled errors
    if (typeof password !== "string" || !password.trim()) {
      errors.push("Password must be a non-empty string");
    } else {
      if (password.length < 4)
        errors.push("passowrd length must be greater than 4");
    }

    if (errors.length > 0) {
      throw new BadRequest("OOPS! Validation Failed", errors);
    }
    next();
  } catch (err) {
    next(err);
  }
}
