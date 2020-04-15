'use strict';
/*
* Keeping API requests organized
* */

import makeRequest from '../fetchHelper';

const path = '/api/users';

export default class UserApi {
	static fetchAll() {
		return makeRequest(path)
	}
}
