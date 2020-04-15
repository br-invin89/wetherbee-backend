"use strict";

const express = require("express");
const router = express.Router();
const User = require('../models/UserModel');
const secret = require('../secrets');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.set('debug', true);


// POST /register
router.post('/register', function (req, res, next) {
	const { phone, password, name, email, schoolName, grade } = req.body;
	if (phone && password) {
		const newUser = { phone, password, name, email, schoolName, grade };
		User.create(newUser)
			.then(() => {
				res.status(201).json({ message: 'Registered successfully' })
			})
			.catch((error) => {
				if (error.code === 11000) {
					const err = new Error('This user exists already');
					err.status = 409; // Conflict
					return next(err);
				}
				next(error); // for other err status codes
			});
	} else {
		const err = new Error('All fields are required!');
		err.status = 400;
		return next(err);
	}
});

// POST /login
router.post('/login', function (req, res, next) {
	const b64Encoded = req.header('Authorization').split('Basic ').pop();
	const credentials = new Buffer(b64Encoded, 'base64').toString().split(":");
	const [phone, password] = credentials;
	if (phone && password) {
		User.authenticate(phone, password)
			.then(user => {
				user = user.publicFormat(); // delete the __v
				delete user.password;
				const token = jwt.sign(
					user, //payload
					secret  // sign the token with my server-stored secret
				);
				res.status(200)
					.json({ message: 'Authenticated', token: token, isAdmin: user.isAdmin, user });
			}).catch(err => next(err));
	} else {
		const err = new Error('Both phone number and password are mandatory!');
		err.status = 401; // Unauthorized
		return next(err);
	}
});

// POST /admin-login
router.post('/admin-login', function (req, res, next) {
	const b64Encoded = req.header('Authorization').split('Basic ').pop();
	const credentials = new Buffer(b64Encoded, 'base64').toString().split(":");
	const [phone, password] = credentials;
	if (phone && password) {
		User.authenticate(phone, password)
			.then(user => {
				user = user.publicFormat(); // delete the __v
				if (!user.isAdmin) {
					const err = new Error('User has not admin role!');
					err.status = 401;
					return next(err);
				}
				delete user.password;
				const token = jwt.sign(
					user, //payload
					secret  // sign the token with my server-stored secret
				);
				res.status(200)
					.json({ message: 'Authenticated', token: token, isAdmin: user.isAdmin });
			}).catch(err => next(err));
	} else {
		const err = new Error('Both phone and password are mandatory!');
		err.status = 401; // Unauthorized
		return next(err);
	}
});

//GET /logout
router.get('/logout', function (req, res) {
	// no db interaction, no session, no nothing
	res.status(200).json({ message: 'Logged out' });
});

module.exports = router;