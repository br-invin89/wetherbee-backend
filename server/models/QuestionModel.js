"use strict";

const mongoose = require("mongoose");

// Use native promises
mongoose.Promise = global.Promise;

const questionSchema = mongoose.Schema(
  {
    category: {
      type: String,
      default: 'English'
    },
    content: {
      title: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
      videoLink: {
        type: String,
        default: "",
      },
    },
    answers: {
      type: Array,
      default: [],
    },
    correctAnswer: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: 'active'
    },
    presentation: {
      status: {
        type: String,
        default: '',
      },
      expectedStartDate: {
        type: Date,
        default: undefined,
      },
      expectedEndDate: {
        type: Date,
        default: undefined,
      },
    },
    stats: {
      correctAnswersCount: {
        type: Number,
        default: 0,
      },
      incorrectAnswersCount: {
        type: Number,
        default: 0,
      },
    },
    issue: {
      isPopular: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

questionSchema.methods.publicFormat = function () {
  const result = this.toJSON();
  // this is to get rid of the  __v
  delete result.__v;
  return result;
};

const Question = mongoose.model("question", questionSchema);


module.exports = Question;
