const express = require('express');
const passport = require('passport');

const indexController = require('../controllers/indexController');

const usersRouter = require('./users');
const authRouter = require('./auth');

const router = express.Router();

router.get('/', indexController.get);
router.use('/auth', authRouter);
router.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);

module.exports = router;
