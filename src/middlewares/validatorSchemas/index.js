const wrapWithObject = require('../../helpers/wrapWithObject');

const makeErrorMessage = wrapWithObject('errorMessage');

const createUser = {
  name: {
    in: ['body'],
    exists: makeErrorMessage('Please provide name'),
    isString: true,
    errorMessage: 'Please provide valid name',
  },
  email: {
    in: ['body'],
    exists: makeErrorMessage('Please provide email'),
    isEmail: true,
    errorMessage: 'Please provide valid email',
  },
  password: {
    in: ['body'],
    exists: makeErrorMessage('Please provide password'),
    isLength: {
      options: { min: 6, max: 128 },
      errorMessage: 'Must be more than 6 and less than 128 chars long',
    },
  },
  roleId: {
    in: ['body'],
    exists: makeErrorMessage('Please provide roleId'),
    isInt: true,
    errorMessage: 'Please provide valid role id',
  },
};

const updateUser = {
  id: {
    in: ['params'],
    errorMessage: 'Please provide valid id',
    isInt: true,
    optional: false,
  },
  name: {
    in: ['body'],
    optional: true,
    isString: true,
    errorMessage: 'Please provide valid name',
  },
  email: {
    in: ['body'],
    optional: true,
    isEmail: true,
    errorMessage: 'Please provide valid name',
  },
  roleId: {
    in: ['body'],
    optional: true,
    toInt: true,
    errorMessage: 'Please provide valid role id',
  },
};

const deleteUser = {
  id: {
    in: ['params'],
    errorMessage: 'Please provide valid id',
    isInt: true,
    optional: false,
  },
};

const logIn = {
  email: {
    in: ['body'],
    errorMessage: 'Please provide email',
    isEmail: true,
    optional: false,
  },
  password: {
    in: ['body'],
    errorMessage: 'Please provide password',
    optional: false
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  logIn,
};
