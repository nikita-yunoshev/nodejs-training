const {
  checkSchema,
  validationResult,
} = require('express-validator');

const { ValidationError } = require('../services/errorBuilderService');

// eslint-disable-next-line import/order
const { errorHandler } = require('./responseHandler');

const checkValidationResults = (formatter) => (req, res, next) => {
  const validationErrors = validationResult(req);

  if (formatter) {
    validationErrors.formatWith(formatter);
  }
  if (!validationErrors.isEmpty()) {
    const error = new ValidationError(
      'Validation error',
      422,
      validationErrors.mapped(),
    );
    return errorHandler(error, req, res);
  }
  return next();
};

const {
  createUser,
  updateUser,
  deleteUser,
  logIn,
} = require('./validatorSchemas');

const createUserValidator = [checkSchema(createUser), checkValidationResults()];
const updateUserValidator = [checkSchema(updateUser), checkValidationResults()];
const deleteUserValidator = [checkSchema(deleteUser), checkValidationResults()];
const logInValidator = [checkSchema(logIn), checkValidationResults()];

module.exports = {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  logInValidator,
};
