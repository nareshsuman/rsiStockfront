import React, { Component } from 'react';

import Validation from '../components/validations/singup';
import Auth from '../services/requests';
import countryData from '../assets/data/country';
import countryStateData from '../assets/data/country_state.js';
import countryCallingCode from '../assets/data/callingcode.js';

// import { getData } from "./utils"



class App extends Component {
	constructor() {
		super();
		this.state = {
			errors: {},
			Loader: false,
			isVerified: 0,
			roleType: 'customer',
			email: '',
			mobile: '',
			country: '',
			state: '',
			country_code: '',
			town: '',
			postcode: '',
			gender: '',
			countryStateList: null,
			callingCode: '',
			NewRegistration: {
				roleType: 'customer',
				f_name: '',
				l_name: '',
				username: '',
				email: '',
				password: '',
				confirm_password: '',
				mobile: '',
				referBy:'',
				country: '',
				state: '',
				country_code: '',
				town: '',
				postcode: '',
				gender: '',
				checkBox: false,
			},
		};
		this.referArray=["from friend","facebook ad","google","student/University"]
	}

	componentWillMount() {


	}
	loginPage() {
		this.props.history.push('/login')
	}
	SubmitHandle() {
		console.log("sendig data ", this.state.NewRegistration);
		const { errors, isValid } = Validation(this.state.NewRegistration);
		console.log(errors, isValid);
		this.setState({ errors: errors });
		// this.props.dispatch({ type: 'USER_STATUS' });
		if (isValid) {
			this.setState({ Loader: true });
			Auth.AxiosPOST('users/register', this.state.NewRegistration).then(response => {
				console.log("getting res ",response, 'new user');
				if (response.data.saved === true) {
					this.setState({ Loader: false });
					this.props.history.push('/login');
				} else {
					this.setState({ Loader: false });
					this.setState({ errors: response.data.errors });
				}
			});
		}
	}

	handleStateChange(e) {
		const { value } = e.target;
		this.setState({ state: value });
		this.setState(prevState => ({
			NewRegistration: {
				...prevState.NewRegistration,
				state: value,
			},
			errors: {
				...prevState.errors,
				state: '',
			},
		}));
	}
	LoginHandle() {
		this.props.history.push('/login');
	}
	handleCountryChange(e, symbol) {
		console.log(e.target.value);
		const { value } = e.target;
		this.setState({ country: countryData.country_arr[value] });
		this.setState(prevState => ({
			NewRegistration: {
				...prevState.NewRegistration,
				country: countryData.country_arr[value],
				country_code: countryCallingCode.callingCode[value],
			},
			errors: {
				...prevState.errors,
				country: '',
			},
		}));
		let Cstates = countryStateData.s_a[value];
		this.setState({ country_code: countryCallingCode.callingCode[value] });
		let statesList = Cstates.split('|');
		this.setState({ countryStateList: statesList });
	}
	setGender(e) {
		const { value } = e.target;
		this.setState({ gender: value });
		this.setState(prevState => ({
			NewRegistration: {
				...prevState.NewRegistration,
				gender: value,
			},
			errors: {
				...prevState.errors,
				gender: '',
			},
		}));
	}
	
	render() {
		let app = this;
		let optionItems = countryData.country_arr.map((country, index) => (
			<option key={index} value={index}>
				{country}
			</option>
		));
		let optionState = null;
		if (app.state.countryStateList !== null) {
			optionState = app.state.countryStateList.map((states, index) => (
				<option key={index} value={states}>
					{states}
				</option>
			));
		}
		let ReferBy = this.referArray.map((value, index) => (
			<option key={index} value={value}>
				{value}
			</option>
		));
		return (<div className="App">
			<div>
				<div className="col-12 col-sm-12">
					<div id="login-box" className="register_form">
						<div className="row">
							<div className="col-12 col-sm-12">
								<header id="login-header">
									<div id="login-logo">
										{/* <img src="img/logo.png" alt="" /> */}
										<h4>New User Register</h4>
									</div>
								</header>
								<div id="login-box-inner">
									<form onSubmit={this.SubmitHandle.bind(this)}>


										<div className="input-group">
											<input
												className="form-control"
												ref="f_name"
												type="text"
												placeholder="first name"
												onChange={e =>
													this.setState(prevState => ({
														NewRegistration: {
															...prevState.NewRegistration,
															f_name: this.refs.f_name.value,
														},
														errors: {
															...prevState.errors,
															f_name: '',
														},
													}))
												}
											/>
											<span className="error-msg">{this.state.errors.f_name}</span>
										</div>

										<div className="input-group">
											<input
												type="text"
												ref="l_name"
												className="form-control"
												placeholder="last name"
												onChange={e =>
													this.setState(prevState => ({
														NewRegistration: {
															...prevState.NewRegistration,
															l_name: this.refs.l_name.value,
														},
														errors: {
															...prevState.errors,
															l_name: '',
														},
													}))
												}
											/>
											<span className="error-msg">{this.state.errors.l_name}</span>
										</div>
										<div className="input-group">
											<input
												type="username"
												ref="username"
												className="form-control"
												placeholder="username"
												onChange={e =>
													this.setState(prevState => ({
														NewRegistration: {
															...prevState.NewRegistration,
															username: this.refs.username.value,
														},
														errors: {
															...prevState.errors,
															username: '',
														},
													}))
												}
											/>
											<span className="error-msg">{this.state.errors.username}</span>
										</div>
										<div className="input-group">
											<input
												type="email"
												ref="email"
												className="form-control"
												placeholder="Email"
												onChange={e =>
													this.setState(prevState => ({
														NewRegistration: {
															...prevState.NewRegistration,
															email: this.refs.email.value,
														},
														errors: {
															...prevState.errors,
															email: '',
														},
													}))
												}
											/>
											<span className="error-msg">{this.state.errors.email}</span>
										</div>

										<div className="input-group">
											<input
												type="password"
												ref="password"
												className="form-control"
												placeholder="Enter Password"
												onChange={e =>
													this.setState(prevState => ({
														NewRegistration: {
															...prevState.NewRegistration,
															password: this.refs.password.value,
														},
														errors: {
															...prevState.errors,
															password: '',
														},
													}))
												}
											/>
											<span className="error-msg">{this.state.errors.password}</span>
										</div>

										<div className="input-group">
											<input
												type="password"
												ref="confirm_password"
												className="form-control"
												placeholder="Re–enter Password"
												onChange={e =>
													this.setState(prevState => ({
														NewRegistration: {
															...prevState.NewRegistration,
															confirm_password: this.refs.confirm_password.value,
														},
														errors: {
															...prevState.errors,
															confirm_password: '',
														},
													}))
												}
											/>
											<span className="error-msg">{this.state.errors.confirm_password}</span>
										</div>

										<label>Gender</label>

										<div
											className="form-group gender_catg"
											onChange={event => this.setGender(event)}
										>
											<label className="radio">
												Male
												<input type="radio" value="m" name="gender" />
												<span className="checkround" />
											</label>

											<label className="radio">
												Female
												<input type="radio" value="f" name="gender" />
												<span className="checkround" />
											</label>


											<span className="error-msg">{this.state.errors.gender}</span>
										</div>

										<div className="input-group">
											<span className="input-group-addon reg_mob_code">
												{/* + {app.state.country_code} */}
											</span>
											<input
												type="number"
												ref="mobile"
												className="form-control reg_mob_no"
												placeholder="Mobile Number"
												onChange={e =>
													this.setState(prevState => ({
														NewRegistration: {
															...prevState.NewRegistration,
															mobile: this.refs.mobile.value,
														},
														errors: {
															...prevState.errors,
															mobile: '',
														},
													}))
												}
											/>
											<span className="error-msg">{this.state.errors.mobile}</span>
										</div>
										<div className="input-group">
											<select
												className="form-control"
												ref="referBy"
												onChange={e =>
													this.setState(prevState => ({
														NewRegistration: {
															...prevState.NewRegistration,
															referBy:this.refs.referBy.value,
														}
													}))
												}
											>
											<option value="">refer By</option>
												{ReferBy}
											</select>
											{/* <span className="error-msg">{this.state.errors.country}</span> */}
										</div>
										<div className="input-group">
											<select
												className="form-control"
												onChange={this.handleCountryChange.bind(this)}
											>
												<option value="">Select Country</option>
												{optionItems}
											</select>
											<span className="error-msg">{this.state.errors.country}</span>
										</div>
										<div className="input-group">
											<select
												className="form-control"
												onChange={this.handleStateChange.bind(this)}
											>
												<option value=""> Select State</option>
												{optionState}
											</select>
											<span className="error-msg">{this.state.errors.state}</span>
										</div>

										<div className="input-group">
											<input
												type="text"
												ref="town"
												className="form-control"
												placeholder="Town"
												onChange={e =>
													this.setState(prevState => ({
														NewRegistration: {
															...prevState.NewRegistration,
															town: this.refs.town.value,
														},
														errors: {
															...prevState.errors,
															town: '',
														},
													}))
												}
											/>
											<span className="error-msg">{this.state.errors.town}</span>
										</div>

										<div className="input-group">
											<input
												type="text"
												ref="postcode"
												className="form-control"
												placeholder="Postcode"
												onChange={e =>
													this.setState(prevState => ({
														NewRegistration: {
															...prevState.NewRegistration,
															postcode: this.refs.postcode.value,
														},
														errors: {
															...prevState.errors,
															postcode: '',
														},
													}))
												}
											/>
											<span className="error-msg">{this.state.errors.postcode}</span>
										</div>
										{/* <div className="input-group">
											<Recaptcha
												sitekey="6LevwXYUAAAAAGrz-JW2ISVER2mjaRyJniKIu_XF"
												render="explicit"
												onloadCallback={this.recaptchaLoaded}
												verifyCallback={this.verifyCallback}
											/>
											<span className="error-msg">{this.state.errors.isVerified}</span>
										</div> */}

										<div id="remember-me-wrapper">
											<div className="row">
												<div className="col-12 col-sm-12">
													<div>
														<label className="check ">
															Accept Terms and Conditions.
															<input
																type="checkbox"
																id="terms-cond"
																// checked={this.state.NewRegistration.checkBox}
																onChange={e =>
																	this.setState(prevState => ({
																		NewRegistration: {
																			...prevState.NewRegistration,
																			checkBox: !this.state.NewRegistration
																				.checkBox,
																		},
																		errors: {
																			...prevState.errors,
																			checkBox: '',
																		},
																	}))
																}
															/>
															<span className="checkmark" />
														</label>
														<span className="error-msg">{this.state.errors.checkBox}</span>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-12 col-sm-12">
												<button
													disabled={this.state.Loader}
													type="button"
													onClick={this.SubmitHandle.bind(this)}
													className="btn btn-register col-12"
												>
													{this.state.Loader ? <i className="fa fa-spinner fa-spin" /> : null}
													Register
												</button>
												<a href="/login" className="back_login_reg" >
													<i className="fa fa-long-arrow-left" /> Login
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

		</div>)


	}
}

export default App;
