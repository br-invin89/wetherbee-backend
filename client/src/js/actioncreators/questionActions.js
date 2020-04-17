"use strict";

import * as ActionTypes from "../actiontypes/constants";
import QuestionApi from "../requests/questions";
import {
  setErrorMessage,
  setSuccessMessage,
  fetchStarted,
  fetchDone,
} from "./messageActions";

function receivedQuestionList(questions) {
  return {
    type: ActionTypes.FETCH_QUESTIONS_SUCCESS,
    questions
  };
}

export function fetchQuestions(category, includingClosed) {
  //using thunk middleware here
  return function (dispatch) {
    dispatch(fetchStarted());
    return QuestionApi.fetchAll(category, includingClosed)
      .then((data) => {
        dispatch(receivedQuestionList(data.questions));
        dispatch(fetchDone());
      })
      .catch((err) => {
				dispatch(fetchDone());
			});
  };
}

export function postQuestion(data) {
  //using thunk middleware here
  return function (dispatch) {
    dispatch(fetchStarted());
    return QuestionApi.post(data)
      .then((data) => {
        dispatch(setSuccessMessage(data.message));
        dispatch(fetchDone());
      })
      .catch((err) => {
        dispatch(setErrorMessage(err.message))
				dispatch(fetchDone());
			});
  };
}

export function selectQuestion(selectedQuestion) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.SELECT_QUESTION,
      selectedQuestion
    })
  }  
}

export function updateQuestion(questionId, data) {
  //using thunk middleware here
  return function (dispatch) {
    dispatch(fetchStarted());
    return QuestionApi.update(questionId, data)
      .then((data) => {
        dispatch(setSuccessMessage(data.message));
        dispatch(fetchDone());
      })
      .catch((err) => {
        dispatch(setErrorMessage(err.message))
				dispatch(fetchDone());
			});
  };
}

export function makePresentOnHome(questionId, showable) {
  return function (dispatch) {
    dispatch(fetchStarted());
    return QuestionApi.makePresentOnHome(questionId, showable)
      .then((data) => {
        dispatch(setSuccessMessage(data.message))
        dispatch(fetchDone())
      })
      .catch(err => {
        dispatch(setErrorMessage(err.message))
        dispatch(fetchDone())
      })
  }
}

export function closeQuestion(questionId) {
  return function(dispatch) {
    dispatch(fetchStarted());
    return QuestionApi.close(questionId)
      .then((data) => {
        dispatch(setSuccessMessage(data.message))
        dispatch(fetchDone())
      })
      .catch(err => {
        dispatch(setErrorMessage(err.message))
        dispatch(fetchDone())
      })
  }
}
