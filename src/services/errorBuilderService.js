class CustomError extends Error {
  constructor(...args) {
    super();

    [this.message, this.statusCode, this.errors] = args;
    this.errors = (this.errors && this.errors.errors) || this.errors;
  }
}

const omitPassword = (object) => {
  const { password, passwordConfirmation, ...rest } = object;

  return rest;
};

class ErrorLog {
  constructor(err, req = {}) {
    const {
      user, originalUrl, body, requestId,
    } = req;

    this.requestId = requestId;
    this.stackTrace = err.stack;
    this.statusCode = err.statusCode || 500;
    this.originalError = err.toString();
    this.errorDetails = {
      userId: user && user.id,
      body: body && omitPassword(body),
      originalUrl,
    };
    this.source = 'error-log';
  }
}

const errorBuilder = (name, code = 500) => {
  class ErrorBuilder extends CustomError {
    constructor(...args) {
      super(...args);

      this.name = name;
      this.statusCode = this.statusCode || code;
    }
  }

  return ErrorBuilder;
};

module.exports = {
  CustomError,
  ErrorLog,
  ValidationError: errorBuilder('ValidationError', 400),
  AuthError: errorBuilder('AuthError', 401),
  UserError: errorBuilder('User'),
};
