export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Incomplete or Invalid Resource found
export class BadRequest extends ApiError {
  constructor(message = "Bad Request", errors = []) {
    super(400, message);
    this.errors = errors; // usefull to list validations
  }
}

// Authentication failed
export class UnAuthorized extends ApiError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

// Not authorized
export class Forbidden extends ApiError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

// Resource not found
export class NotFound extends ApiError {
  constructor(message = "Resource not found") {
    super(404, message);
  }
}

// Conflict Occured
export class Conflict extends ApiError {
  constructor(message = "Conflict") {
    super(409, message);
  }
}
