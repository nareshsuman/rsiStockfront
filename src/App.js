import React, { Component } from 'react';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import { Route } from 'react-router';
// import { BrowserRouter as Router } from 'react-router-dom';
// import reducer from './ducks';
// import Login from './containers/login';
import AppRouter from './routes/index';
// import $ from "jquery";
// import { syncHistoryWithStore } from 'react-router-redux';

import './App.css';
import './assets/css/bootstrap.min.css';
import './assets/css/responsive.css';
import './assets/css/nanoscroller.css';
import './assets/css/theme_styles.css';
import './assets/css/main.css';

import './assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';

import './assets/css/select2.min.css';

import './assets/js/demo-skin-changer.js';
import './assets/css/loader.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// export const store = createStore(reducer);
// const history = syncHistoryWithStore(browserHistory, store);
// <Router>
// 	<Route path="/" component={Login} />
// </Router>
class App extends Component {
	render() {
		return (
				<div>
					{AppRouter}
					<ToastContainer autoClose={3000} />
				</div>
		
		);
	}
}

export default App;
