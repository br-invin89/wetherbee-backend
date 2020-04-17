"use strict";

const mongoose = require("mongoose");

// Use native promises
mongoose.Promise = global.Promise;

const answerByUserSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    question: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Question",
    },
    answer: {
      type: String,
      default: "",
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const AnswerByUser = mongoose.model("answerByUser", answerByUserSchema);

module.exports = AnswerByUser;
