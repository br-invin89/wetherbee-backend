'use strict';

import * as ActionTypes from '../actiontypes/constants';

const initialState = {
  questions: [],
  selectedQuestion: undefined
};

export default function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.FETCH_QUESTIONS_SUCCESS: 
			return {
				...state,
        questions: action.questions
      };
    case ActionTypes.SELECT_QUESTION:
      return {
        ...state,
        selectedQuestion: action.selectedQuestion
      }
		default:
			return state;
	}
}