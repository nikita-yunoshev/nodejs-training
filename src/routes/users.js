const express = require('express');

const { responseHandler } = require('../middlewares/responseHandler');
const payloadValidator = require('../middlewares/payloadValidatior');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', async (req, res) => res.json(await UserController.getUsers()));

router.get('/:id', async (req, res) => res.json(await UserController.getUser(req.params.id)));

router.post(
  '/',
  payloadValidator.createUserValidator,
  responseHandler(UserController.createUser),
);

router.patch(
  '/:id',
  payloadValidator.updateUserValidator,
  responseHandler(UserController.updateUser),
);

router.delete(
  '/:id',
  payloadValidator.deleteUserValidator,
  responseHandler(UserController.deleteUser),
);

module.exports = router;
