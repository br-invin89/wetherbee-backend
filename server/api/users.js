'use strict';

const express = require("express");
const router = express.Router();
const User = require('../models/UserModel');

const baseUrl = '';

router.get(`${baseUrl}`, function (req, res, next) {
	User.find({ isAdmin: false})
		.exec()
		.then((users_) => {
			let users = [];
			for (let user_ of users_) {
				users.push(user_.publicFormat());
			}
			res.status(200).json({ users });
		})
		.catch((err) => next(err));
});

module.exports = router;