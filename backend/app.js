import express from "express";
import { corsConfig } from "./src/config/cors.js";
import { router as authRouter } from "./src/modules/auth/auth.routes.js";
import { router as tasksRouter } from "./src/modules/tasks/tasks.routes.js";
import { requestLogger } from "./src/middlewares/requestLogger.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { NotFound } from "./src/core/apiError.js";
import { auth } from "./src/middlewares/auth.js";

export const app = express();

app.use(corsConfig);
app.use(express.json());

app.use(requestLogger);

app.use("/auth", authRouter);
app.use("/tasks", auth, tasksRouter);

// app.get("/", auth, (req, res) => {
//   res.send("Hari Om");
// });

// wildcard route
app.use((req, res, next) => {
  next(new NotFound("Page not found"));
});

app.use(errorHandler);
