import { format, transports, createLogger } from "winston";
const { printf, combine, colorize, simple, timestamp } = format;

const logFormat = printf(({ timestamp, level, message, ...meta }) => {
  const metaData = Object.keys(meta).length ? JSON.stringify(meta) : "";
  return `[${timestamp}] ${level}: ${message}. ${metaData}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({ filename: "logs/app.log" }), //Write all logs to app.log
    new transports.File({ filename: "logs/error.log", level: "error" }), //Write only errors to error.log
  ],
});


if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(
        colorize(),      // pretty colors
        simple()         // simple text
      )
    })
  );
}
