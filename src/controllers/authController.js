const jwt = require('jsonwebtoken');

const jwtSecret = require('../config/jwtConfig');
const User = require('../models/UserModel');
const { AuthError } = require('../services/errorBuilderService');
const { successBuilder } = require('../middlewares/responseHandler');
const { isEqual } = require('../helpers/passwordHelper');

const { invalidCredentialsErrorDetails } = require('./errorMessages/auth');

const logIn = async (req) => {
  const { email, password } = req.body;
  const user = await User.query().findOne({ email });

  if (!user) {
    throw new AuthError(
      'Invalid credentials',
      401,
      invalidCredentialsErrorDetails(email),
    );
  }

  if (await isEqual(password, user.password)) {
    const payload = { id: user.id };
    const token = jwt.sign(payload, jwtSecret.secret);

    return successBuilder(200, { token });
  }

  return successBuilder(401, { message: 'passwords did not match' });
};

const logOut = async (req) => {
  req.logout();
  throw new AuthError('User was logged out', 401);
};

module.exports = {
  logIn,
  logOut,
};
