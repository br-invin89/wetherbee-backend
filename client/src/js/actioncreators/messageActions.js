import * as ActionTypes from "../actiontypes/constants";

/**
 * Sets the state successMessage
 */
function setSuccessMessage(message) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_SUCCESS_MESSAGE, message });
    // Remove the  message after 3 seconds
    setTimeout(() => {
      dispatch({ type: ActionTypes.SET_SUCCESS_MESSAGE, message: "" });
    }, 3000);
  };
}

/**
 * Sets the state errorMessage
 */
function setErrorMessage(message) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_ERROR_MESSAGE, message });
    // Remove the  message after 3 seconds
    setTimeout(() => {
      dispatch({ type: ActionTypes.SET_ERROR_MESSAGE, message: "" });
    }, 3000);
  };
}

function fetchStarted() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ANY_FETCH_START });
  };
}

function fetchDone() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ANY_FETCH_END });
  };
}

export { setErrorMessage, setSuccessMessage, fetchStarted, fetchDone };
