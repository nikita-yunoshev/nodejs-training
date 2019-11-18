const express = require('express');

const router = express.Router();
const usersRouter = require('./users');

router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.send('hello world');
});

module.exports = router;
