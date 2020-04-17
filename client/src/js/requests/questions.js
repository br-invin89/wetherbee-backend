'use strict';
/*
* Keeping API requests organized
* */

import makeRequest from '../fetchHelper';

const path = '/api/questions';

export default class QuestionApi {
	static fetchAll(category, includingClosed) {
		return makeRequest(`${path}/category/${category}?includingClosed=${includingClosed}`)
  }
  static post(data) {
    return makeRequest(`${path}`, 'POST', data)
  }
  static update(questionId, data) {
    return  makeRequest(`${path}/update/questionId/${questionId}`, 'POST', data)
  }
  static makePresentOnHome(questionId, showable) {
    return makeRequest(`${path}/makePresentOnHome/questionId/${questionId}?showable=${showable}`, 'POST')
  }
  static close(questionId) {
    return makeRequest(`${path}/close/questionId/${questionId}`, 'POST')
  }
}
