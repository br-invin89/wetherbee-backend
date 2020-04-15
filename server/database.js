"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/wetherbee');

const db = mongoose.connection;

db.on('error', function (err) {
	console.error("DB connection error:", err)
});

db.once('open', function () {
	console.log("DB connection successful");
});

module.exports = db;