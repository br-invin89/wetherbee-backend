import * as ActionTypes from "../actiontypes/constants";
import {
  setErrorMessage,
  setSuccessMessage,
  fetchStarted,
  fetchDone,
} from "./messageActions";
import Auth from "../requests/auth";

// import createBrowserHistory from 'history/createBrowserHistory' // this works like this
// const history = createBrowserHistory();

function loginSuccess(loggedIn) {
  return { type: ActionTypes.LOGIN_SUCCESS, loggedIn };
}
function logoutSuccess(loggedIn) {
  return { type: ActionTypes.LOGOUT_SUCCESS, loggedIn };
}

export function login(username, password, history, newRoute) {
  return function (dispatch) {
    dispatch(fetchStarted());
    return Auth.login(username, password)
      .then((response) => {
        dispatch(fetchDone());
        console.log("User logged in successfully", response);
        localStorage.setItem("jwt", response.token);
        dispatch(loginSuccess(Auth.loggedIn()));
      })
      .then(() =>
        newRoute ? forwardTo(history, newRoute.from) : forwardTo(history, "/")
      )
      .catch((err) => {
        dispatch(setErrorMessage(err.message));
        dispatch(fetchDone());
      });
  };
}

export function logout(history) {
  return function (dispatch) {
		dispatch(fetchStarted());
    return Auth.logout()
      .then((res) => {
        localStorage.removeItem("jwt");
        dispatch(logoutSuccess(Auth.loggedIn()));
        forwardTo(history, "/");
        dispatch(setSuccessMessage(res.message));
        dispatch(fetchDone());
      })
      .catch((err) => {
				dispatch(setErrorMessage(err.message));
				dispatch(fetchDone());
      });
  };
}

function forwardTo(history, pathname) {
  history.push(pathname);
}
