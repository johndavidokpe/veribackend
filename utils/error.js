/*import logger from "../utils/logger.js";
export const globalError = (err, req, res, next) => {
  // Log error using Winston
  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode: err.status || 500,
    route: req.originalUrl,
    method: req.method,
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
*/

import logger from "../utils/logger.js";

export const globalError = (err, req, res, next) => {
  // Log error using Winston
  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode || 500,
    route: req.originalUrl,
    method: req.method,
  });

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // Optional: better debugging
    this.isOperational = true; // Optional: mark that it's not a server crash
    Error.captureStackTrace(this, this.constructor); // Optional: better stack traces
  }
}
