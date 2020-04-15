'use strict';

import * as ActionTypes from '../actiontypes/constants';
import Auth from '../requests/auth';

const initialState = {
	loggedIn: Auth.loggedIn(),
	user: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.LOGIN_SUCCESS:
			return {
				...state,
				loggedIn: action.loggedIn
			};
		case ActionTypes.LOGOUT_SUCCESS:
			return {
				...state,
				loggedIn: action.loggedIn,
				user: {}
			};
		default:
			return state;
	}
}