import { logger } from "../config/logger.js";
import { removeSensitive } from "../utils/sanitize.js";

export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { method, originalUrl, body, query, params } = req;
    logger.info("HTTP Request Log", {
      method,
      url: originalUrl,
      status: res.statusCode,
      message: res.message,
      duration: `${duration}ms`,
      query,
      params,
      body: removeSensitive(body,["password"]),
      user: req.user?.id || null,
    });
  });

  next();
};
