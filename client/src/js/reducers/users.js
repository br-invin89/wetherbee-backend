'use strict';

import * as ActionTypes from '../actiontypes/constants';

const initialState = {
  users: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.FETCH_USERS_SUCCESS: 
			return {
				...state,
        users: action.users
      };
		default:
			return state;
	}
}