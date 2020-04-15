import React, { useEffect } from 'react';

// redux
import { connect } from "react-redux";

function WelcomeView({
  loggedIn,
}) {
  if (!loggedIn) {
    return (
      <p>
        Please login first.
      </p>
    )
  } else {
    return (
      <p>
        Welcome to Admin Dashboard, Please select one menu and enjoy your works.
      </p>
    )
  }
}

function mapStateToProps({ users, auth, messages }) {
  return {
    loggedIn: auth.loggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeView);
