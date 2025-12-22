export class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

export class SuccessResponse extends ApiResponse {
  constructor(message = "Success", data = null, token = null) {
    super(200, message, data);
    if(token) this.token = token;
  }
}

export class CreatedResponse extends ApiResponse {
  constructor(message = "Created", data = null) {
    super(201, message, data);
  }
}


