"use strict";

import * as ActionTypes from "../actiontypes/constants";
import UserApi from "../requests/users";
import {
  setErrorMessage,
  setSuccessMessage,
  fetchStarted,
  fetchDone,
} from "./messageActions";

function receivedDone(users) {
  return {
    type: ActionTypes.FETCH_USERS_SUCCESS,
    users
  };
}

export function fetchUsers() {
  //using thunk middleware here
  return function (dispatch) {
    dispatch(fetchStarted());
    return UserApi.fetchAll()
      .then((data) => {
        dispatch(receivedDone(data.users));
        dispatch(fetchDone());
      })
      .catch((err) => {
				dispatch(fetchDone());
			});
  };
}
