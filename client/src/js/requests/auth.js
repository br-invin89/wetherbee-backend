'use strict';
/*
 * Keeping Auth requests organized
 * */

import makeRequest from '../fetchHelper';

const path = '/auth';

export default class Auth {
	static login(phone, pass) {
		const credentials = btoa(`${phone}:${pass}`);
		return makeRequest(`${path}/admin-login`, "POST", null, null, { Authorization: `Basic ${credentials}` })
	}
	// Checks if anybody is logged in
	// returns true if there is a logged in user, false if there isn't
	static loggedIn() {
		return !!localStorage.getItem('jwt');
	}
	static logout() { // does nothing but sending GET request with token and then delete local storage jwt
		return makeRequest(`${path}/logout`, "GET")
	}
}