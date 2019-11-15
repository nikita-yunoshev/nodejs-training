const express = require('express');

const router = express.Router();
const getUsers = require('../controllers/userController');

router.get('/', async (req, res) => res.json(await getUsers()));

module.exports = router;
