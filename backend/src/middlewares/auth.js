import jwt from "jsonwebtoken";
import { UnAuthorized } from "../core/apiError.js";

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnAuthorized("Authorization token missing");
    }

    // split Bearer and token
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new UnAuthorized("Invalid authorization format");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = {
      id: decoded.id
    };

    next();
  } catch (err) {
    // JWT-specific errors
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return next(new UnAuthorized("Invalid or expired token"));
    }

    next(err);
  }
};
