var express = require('express');
var router = express.Router();
const usersRouter = require('./users');
const questionsRouter = require('./questions');

router.use('/users', usersRouter);
router.use('/questions', questionsRouter);

module.exports = router;