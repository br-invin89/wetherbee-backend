"use strict";

/**
 * Nav.js
 * This component renders the navigation bar
 */

import React from "react";
import PropTypes from "prop-types";

import { NavLink, Link } from "react-router-dom";

export default function Nav(props) {
  // Render either the Login and Sign up buttons, or the Home and Logout button
  // based on the current authentication state.
  const navButtons = props.loggedIn ? (
    <ul className="nav nav-pills">
      <li>
        <NavLink to="/users" className="btn">Users</NavLink>
      </li>
      <li className="pull-right user-details">
        <a
          href="#"
          className="btn"
          onClick={(ev) => {
            ev.preventDefault();
            props.onLogout();
          }}
        >
          Logout
        </a>
      </li>
    </ul>
  ) : (
    <ul className="nav nav-pills">
      <li className="pull-right">
        <NavLink to="/login" className="btn">
          Login
        </NavLink>
      </li>
    </ul>
  );

  return (
    <div className="circle--header">
      <div className="bounds">{navButtons}</div>
      {/*
			<Link to="/list" className="logo-link"><img className="main-logo" src="/images/doctor.svg" alt="logo" /></Link>
			*/}
    </div>
  );
}

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};
