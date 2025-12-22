import { UnAuthorized } from "../../core/apiError.js";
import { CreatedResponse, SuccessResponse } from "../../core/apiResponse.js";
import { removeSensitive } from "../../utils/sanitize.js";
import jwt from "jsonwebtoken";

import { AuthService } from "./auth.service.js";
const authService = new AuthService();

export class AuthController {
  async register(req, res, next) {
    const { name, email, password } = req.body;
    const user = await authService.addUser({ name, email, password });
    return res.status(201).json(
      new CreatedResponse(
        "User registered successfully",
        removeSensitive(user, ["password", "__v"]) // prevent sending these fields in response.
      )
    );
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await authService.verifyUser(email, password);
    if (!user) {
      return next(new UnAuthorized("Invalid email or password"));
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );

    return res
      .status(200)
      .json(
        new SuccessResponse(
          "Logged in Successfully",
          removeSensitive(user, ["password", "__v"]),
          token
        )
      );
  }
}
