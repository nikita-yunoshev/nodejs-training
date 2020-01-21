const express = require('express');

const { responseHandler } = require('../middlewares/responseHandler');
const payloadValidator = require('../middlewares/payloadValidatior');
const { logIn, logOut } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/login',
  payloadValidator.logInValidator,
  responseHandler(logIn),
);

router.post('/logout', responseHandler(logOut));

module.exports = router;
