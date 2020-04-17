import auth from './auth';
import messages from './messages';
import users from './users';
import questions from './questions';

import { combineReducers } from 'redux';

export default combineReducers({ auth, messages, users, questions });