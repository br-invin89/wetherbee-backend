import React from 'react';
import { render } from 'react-dom';
import {
	Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom'

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Redux middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger'; // nice actions -> state console.logs

import AppReducer from './reducers';

// Components
import Application from './layouts/Application';
import WelcomeView from './pages/WelcomeView';
import NotFound from './pages/NotFound';
import LoginView from './pages/LoginView';
import UserList from './pages/UserList';

const store = createStore(AppReducer, applyMiddleware(thunk, logger));

render(
	<Provider store={store}>
		<Router history={history}>
			<Application>
				<Switch>
					<Route path='/' exact component={WelcomeView} />
					<Route path="/login" component={LoginView} />
					<Route path="/users" component={UserList} />
					<Route path="*" component={NotFound} />
				</Switch>
			</Application>
		</Router>
	</Provider>
	, document.getElementById('container'));
