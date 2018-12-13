import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from '../container/login';
// import { register } from '../serviceWorker';
import Register from '../container/register';
import ForgotPassword from '../container/forgot_password';
import ChangePassword from '../container/change_password';


// const localUser = JSON.parse(localStorage.getItem('authToken'));
// let UserToken = null;
// console.log(localUser);
// if (localUser) {
// 	UserToken = localUser.token;
// }
const MyRoutes = (
	<Router>
		<Switch>
			

			{/* <Route path="/admin/add-user" exact component={AddNewUser} /> */}
			

			
			{/* <Route
				exact
				path="/delivery-agent/view-order/:idx"
				render={a => {
					return UserToken ? (
						<DeliveryAgentDashboard {...this.props}>
							<DeliveryAgentViewOrderStatus {...this.props} />
						</DeliveryAgentDashboard>
					) : (
						<Redirect to="/login" />
					);
				}}
			/> */}
			<Route path="/change-password/:idx" exact component={ChangePassword} />
			<Route path="/forgot-password" exact component={ForgotPassword} />
			<Route path="/user/dashboard" exact component={Register} />
			<Route path="/register" exact component={Register} />
			<Route path="/" component={Login} />
		</Switch>
	</Router>
);

export default MyRoutes;
