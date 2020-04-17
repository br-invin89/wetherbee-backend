'use strict';

const express = require("express");
const router = express.Router();
const Question = require('../models/QuestionModel');

const baseUrl = '';

// get all list
router.get(`${baseUrl}/category/:category`, (req, res, next) => {
  const { category } = req.params;
  const { includingClosed } = req.query;
  let query = { category };  
  if (includingClosed && includingClosed=='true') {
    query = {
      ...query
    }
  } else {
    query = { ...query, status: {$ne: 'closed'} };
  }
  
  Question.find(query).exec().then((questions) => {
    res.json({ questions })
  }).catch(err => next(err))
})

// create new question
router.post(`${baseUrl}`, (req, res, next) => {
  let { category, content, answers, correctAnswer } = req.body;

  Question.create({
    category,
    content,
    answers,
    correctAnswer
  }).then((question) => {
    res.json({ question: question.publicFormat(), message: 'Successfully posted' })
  })
})

// get one question
router.get(`${baseUrl}/questionId/:questionId`, (req, res, next) => {
  const { questionId } = req.params;
  Question.findById(questionId).exec().then((question) => {
    res.json({ question });
  }).catch(err => next(err))
})

// update content
router.post(`${baseUrl}/update/questionId/:questionId`, (req, res, next) => {
  let { content, answers, correctAnswer } = req.body;
  const { questionId } = req.params;

  Question.findByIdAndUpdate(questionId, { content, answers, correctAnswer }, { new: true }).exec().then((question) => {
    res.json({ question: question.publicFormat(), message: 'Successfully updated' });
  }).catch((err) => next(err))
})

// close question
router.post(`${baseUrl}/close/questionId/:questionId`, (req, res, next) => {
  const { questionId } = req.params;
  Question.findByIdAndUpdate(questionId, { status: 'closed' }).exec().then((question) => {
    res.json({ message: 'Successfully closed.' });
  }).catch((err) => next(err))
})

// make able to show/hide home screen on today
router.post(`${baseUrl}/makePresentOnHome/questionId/:questionId`, (req, res, next) => {
  const { questionId } = req.params;
  const { showable } = req.query;
  let status = '';
  if (showable && showable=='true') status = 'active';  
  
  Question.findByIdAndUpdate(questionId, { presentation: { status} }, { new: true }).exec().then((question) => {
    question = question.publicFormat();
    let message = '';
    if (question.presentation.status=='active') {
      message = 'It\'s able to show on home screen'
    } else {
      message = 'It\'s stopped on home screen'
    }
    res.json({ question, message })    
  }).catch((err) => next(err))
})

// show today topic
router.get(`${baseUrl}/getPresentOnHome/category/:category`, (req, res, next) => {
  const { category } = req.params;
  Question.findOne({ category, status: 'active', presentation: {status: 'active' } }).exec().then((question) => {
    res.json({ question })
  }).catch((err) => next(err))
})

module.exports = router;
