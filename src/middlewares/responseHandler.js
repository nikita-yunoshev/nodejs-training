const { CustomError, ErrorLog } = require('../services/errorBuilderService');

class SuccessBuilder {
  constructor(...args) {
    [this.statusCode, this.response] = args;
  }
}

const successBuilder = (
  statusCode = 200,
  response = {},
) => new SuccessBuilder(statusCode, response);

const errorHandler = (error, req, res) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      message: error.message || error.toString(),
      errors: error.errors,
    });
  }

  return res.sendStatus(500);
};

const responseHandler = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);

    if (result instanceof SuccessBuilder) {
      return res.status(result.statusCode).json(result.response);
    }

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  successBuilder,
  responseHandler,
  errorHandler,
  ErrorLog,
};
