/**
 * Created by Iulia on 3/13/17.
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actioncreators/authActions';

// components
import LinkWrap from './LinkWrap';
import { Success, Error } from './Messages';

// utils
import { submitBtnClasses } from '../dynamicStyles';


class LoginForm extends Component {
	static propTypes = {
		loggedIn: PropTypes.bool,
		errorMessage: PropTypes.string
	};
	state = { username: '', password: '' };
	login = this.props.actions.login;

	onInputChange = (event) => {
		const what = event.target.name;
		this.setState({
			[what]: event.target.value
		})
	};
	onSubmit = (event) => {
		event.preventDefault();
		const username = this.state.username.trim();
		const password = this.state.password;
		if (!username || !password) {
			alert('Please type username and password!');
			return;
		}
		this.login(username, password, this.props.history, this.props.location.state);
		// redirect to /list or back from where user arrived on this route
	};
	render() {
		const { successMessage, errorMessage, loggedIn } = this.props;

		return (
			<form className="question-form" onSubmit={this.onSubmit}>
				{/*if you accidentally arrive on this route go to homepage */}
				{loggedIn && <Redirect to="/list" />}

				<h1>Login</h1>
				<Error msg={errorMessage} />
				<Success msg={successMessage} />

				<div className="grid-parent">
					<div className="grid-100">
						<input type="text" placeholder="Username"
							value={this.state.username}
							name="username"
							onChange={this.onInputChange}
						/>
						<input type="password" placeholder="Password"
							value={this.state.password}
							name="password"
							onChange={this.onInputChange}
						/>
						<input className={submitBtnClasses(!this.state.username || !this.state.password)} type="submit" value="Login" />
						<span className="pull-right" style={{ marginTop: 15 }}>
							Don't have an account yet?
							&nbsp;
							<LinkWrap to="/register">Sign up</LinkWrap>
						</span>
					</div>
				</div>
			</form>
		)
	}
}

function mapStateToProps({ auth, messages }) {
	return {
		loggedIn: auth.loggedIn,
		errorMessage: messages.errorMessage,
		successMessage: messages.successMessage
	};
}

function mapDispatchedActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(authActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchedActionsToProps)(LoginForm)