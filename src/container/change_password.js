import React, { Component } from 'react';
import Auth from '../services/requests';
// import Validation from '../../components/common/function';
// import Validation from '../components/common/function';
import { Redirect } from 'react-router-dom';

class ChangePassword extends Component {
	constructor(props) {
		super();
		this.state = { password: '', confirm_password: '', error: false, strong: false, Loader: false };
	}
	PasswordValidation(e) {
		this.setState({ strong: false });
		this.setState({ error: false });
		// const { name, value } = e.target;
		// if (name === 'password') {
		// 	// this.setState({ password: value });
		// 	// if (Validation.validPassword(value)) {
		// 	// 	console.log('f');
		// 	// 	this.setState({ strong: false });
		// 	// } else {
		// 	// 	console.log('t');
		// 	// 	this.setState({ strong: true });
		// 	// }
		// 	this.refs.password.value? this.setState({ strong: false }):this.setState({ strong: true })
		// } else if (name === 'confirm_password') {
		// 	// if()
		// 	this.setState({ error: false });
		// }
	}
	ChangePasswordMethod() {
		// let isValid = 0;
		if (this.refs.password.value) {
			// isValid = 1;
			this.setState({ strong: false });
		} else {
			this.setState({ strong: true });
		}
		// if (this.state.confirm_password === '') {
		// 	isValid = 1;
		// }
		// console.log(this.state);
		if (this.refs.password.value !== this.refs.confirm_password.value) {
			this.setState({ error: true });
		} else {
			// if (isValid === 0) {
			// }
			this.setState({ error: false });
		}
		// const user = {
		// 	email: this.refs.email.value,
		// };
		// if (this.refs.email.value === '') {
		// 	this.setState({ error: true });
		// }
		if (this.refs.password.value && this.refs.password.value === this.refs.confirm_password.value) {
			var data = {
				TempId: this.props.match.params.idx,
				password: this.refs.password.value,
				password_confirmation: this.refs.confirm_password.value,
			};
			this.setState({ Loader: true });
			Auth.AxiosPOST('users/reset_password', data).then(response => {
				if (response.data.saved === true) {
					// this.props.history.push('/login');
					this.setState({ Loader: false });
					this.setState({ flag2: true });
				} else {
					this.setState({ Loader: false });
				}
				console.log(response);
			});
		}
		// console.log(user);
	}
	BackToLogin() {
		this.props.history.push('/login');
	}
	componentWillMount() {
		console.log('in it');
		console.log(this.props.match.params.idx);
		Auth.AxiosPOST('users/forgot_password/' + this.props.match.params.idx).then(response => {
			console.log(response);
			if (response.data.saved === true) {
				// this.setState({ confirm_status: true, status: true });
				this.setState({ flag: true });
			} else {
				this.setState({ falseFlag: true });
			}
		});
		// this.props.history('/');
	}

	render() {
		console.log('sd');
		if (this.state.flag2) {
			return <Redirect to="/login" />;
		}
		if (this.state.flag) {
			return (
				<div>
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div id="login-box">
									<div id="login-box-holder">
										<div className="row">
											<div className="col-12">
												<header id="login-header">
													<div id="login-logo">
														{/* <img src="img/logo.png" alt="" /> */}
														<h6>Change your password?</h6>
													</div>
												</header>
												<div id="login-box-inner" className="with-heading">
													{/* <p>Enter your email address to recover your password.</p> */}
													<form>
														<div className="input-group reset-pass-input">
															<div className="input-group-prepend">
																<div className="input-group-text">
																	<i className="fa fa-user mx-auto" />
																</div>
															</div>
															<input
																className="form-control"
																type="password"
																ref="password"
																name="password"
																autoComplete="false"
																placeholder="Enter password"
																onChange={event => this.PasswordValidation(event)}
															/>
															<span className="error-msg">
																{this.state.strong ? 'Password can not be null' : null}
															</span>
														</div>
														<div className="input-group reset-pass-input">
															<div className="input-group-prepend">
																<div className="input-group-text">
																	<i className="fa fa-user mx-auto" />
																</div>
															</div>
															<input
																className="form-control"
																type="password"
																ref="confirm_password"
																name="confirm_password"
																placeholder="Confirm password"
																autoComplete="false"
																onChange={event => this.PasswordValidation(event)}
															/>
															<span className="error-msg">
																{this.state.error
																	? 'Confirm password does not match'
																	: null}
															</span>
														</div>

														<div className="row">
															<div className="col-12">
																<button
																	disabled={this.state.Loader}
																	type="button"
																	onClick={this.ChangePasswordMethod.bind(this)}
																	className="btn btn-login col-12"
																>
																	{this.state.Loader ? (
																		<i className="fa fa-spinner fa-spin" />
																	) : null}
																	Change password
																</button>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		if (this.state.falseFlag)
			return (
				<div>
					<div className="col-12 col-sm-12 login_top_margin">
						<h1 className="top_err_msg_show">Url has been expired!</h1>
					</div>
				</div>
			);
		return <div />;
	}
}
export default ChangePassword;
