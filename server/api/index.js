var express = require('express');
var router = express.Router();
const usersRouter = require('./users');

router.use('/users', usersRouter);

module.exports = router;