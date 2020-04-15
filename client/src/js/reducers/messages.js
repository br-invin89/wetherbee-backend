'use strict';

import * as ActionTypes from '../actiontypes/constants';

const initialState = {
	loading: false,
	successMessage: '',
	errorMessage: ''
};

export default function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_SUCCESS_MESSAGE: // add a hint that req was successful
			return {
				...state,
				successMessage: action.message
			};
		case ActionTypes.SET_ERROR_MESSAGE: // add a hint that req failed
			return {
				...state,
				errorMessage: action.message
			};
		case ActionTypes.ANY_FETCH_START: 
			return {
				...state,
				loading: true
			};
		case ActionTypes.ANY_FETCH_END:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}