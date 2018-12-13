import React, { Component } from 'react';
import Auth from '../services/requests';
import Validation from '../components/common/function';

class ForgotPassword extends Component {
	constructor(props) {
		super();
		this.state = { email: '', error: false, Loader : false};
	}
	EmailValidation(e) {
		if (Validation.validateemail(e.target.value) === true) {
			this.setState({ error: false });
		} else {
			this.setState({ error: true });
		}
	}
	ResetPasswordMethod() {
		const user = {
			email: this.refs.email.value,
		};
		if (this.refs.email.value === '') {
			this.setState({ error: true });
		}
		if (this.state.error === false && this.refs.email.value) {
			this.setState({ Loader: true });
			Auth.AxiosPOST('users/forgot_password', user).then(response => {
				if (response.data.saved === true) {
					this.setState({ Loader: false });
					this.props.history.push('/login');
				} else {
					this.setState({ Loader: false });
					this.errorOnlogin = response.data.reason;
					this.setState({});
				}
				console.log(response);
			});
		}
		console.log(user);
	}
	BackToLogin() {
		this.props.history.push('/login');
	}
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-12 login_top_margin">
							{this.errorOnlogin ? <h1 className="top_err_msg_show">{this.errorOnlogin}</h1> : null}
							<div className="col-12">
								<div id="login-box" className="login-form-msg">
									<div id="login-box-holder">
										<div className="row">
											<div className="col-12">
												<header id="login-header">
													<div id="login-logo">
														{/* <img src="img/logo.png" alt="" /> */}
														<h6>Forgot your password?</h6>
													</div>
												</header>
												<div id="login-box-inner" className="with-heading">
													<p>Enter your email address to recover your password.</p>
													<form>
														<div className="input-group reset-pass-input">
															<div className="input-group-prepend">
																<div className="input-group-text">
																	<i className="fa fa-user mx-auto" />
																</div>
															</div>
															<input
																className="form-control"
																type="text"
																ref="email"
																placeholder="Email address"
																onChange={event => this.EmailValidation(event)}
															/>
															<span className="error-msg">
																{this.state.error ? 'Email is required' : null}
															</span>
														</div>
														<div className="row">
															<div className="col-12">
																<button
																	disabled={this.state.Loader}
																	type="button"
																	onClick={this.ResetPasswordMethod.bind(this)}
																	className="btn btn-forgot col-12"
																>
																	{this.state.Loader ? (
																		<i className="fa fa-spinner fa-spin" />
																	) : null}
																	Reset password
																</button>
															</div>
															<div className="col-12">
																<br />
																<a  href="/"
																	id="login-forget-link"
																	className="forgot-link back_login col-12"
																	onClick={event => this.BackToLogin(event)}
																>
																	Back to login
																</a>
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
			</div>
		);
	}
}
export default ForgotPassword;
