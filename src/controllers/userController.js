const User = require('../models/UserModel');
const { UserError } = require('../services/errorBuilderService');
const { successBuilder } = require('../middlewares/responseHandler');
const { getHash } = require('../helpers/passwordHelper');

const {
  userNotFoundDetails,
} = require('./errorMessages/userController');

const getUsers = () => User.query();

const getUser = (id) => User.query().findById(id);

const createUser = async (req) => {
  const userData = req.body;
  const { password } = userData;
  const hashedPassword = await getHash(password, 10);

  const newUser = await User.query().insert({ ...userData, password: hashedPassword });

  return successBuilder(201, { newUser });
};

const updateUser = async (req) => {
  const { id } = req.params;

  const user = await User.query().findOne({ id });
  const data = req.body;
  if (!user) {
    throw new UserError(
      'User is not found',
      404,
      userNotFoundDetails(id),
    );
  }

  await User.query()
    .patchAndFetchById(1, data);

  return successBuilder(200, { data });
};

const deleteUser = async (req) => {
  const { id } = req.params;
  const user = await User.query().findOne({ id });

  if (!user) {
    throw new UserError(
      'User is not found',
      404,
      userNotFoundDetails(id),
    );
  }

  await User.query()
    .deleteById(user.id);

  return successBuilder(204);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
