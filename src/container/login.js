import React, { Component } from 'react';
import Auth from '../services/requests';
import validateInput from '../components/validations/login';
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';
// import Pusher from 'pusher-js';
// import Modal from 'react-responsive-modal';

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      login_status: false,
      pass_reset_status: false,
      confirm_status: false,
      username: '',
      password: '',
      usernameError: false,
      PasswordError: false,
      errors: {},
      Loader: false,
    };
  }


  HandleChanges(e) {
    // e.preventDefault();
    const { name, value } = e.target;
    this.setState({ errors: {} });

    switch (name) {
      case 'username':
        this.setState({ username: value });
        break;
      case 'password':
        this.setState({ password: value });
        break;
      default:
        break;
    }
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }
  UserLoginMethod(e) {
    // e.preventDefault();
    e.preventDefault();
    console.log('login------', this.state);
    const user = { username: this.refs.username.value, password: this.refs.password.value };
    console.log('----', validateInput(this.state));
    if (this.isValid()) {
      this.errorOnlogin = '';
      this.setState({ errors: {} });
      this.setState({ Loader: true });
      console.log('3', user);
      Auth.AxiosPOST('users/login', user).then(result => {
        console.log(result, 'result');
        if (result.data.saved === true && result.data.user.roleType === 'admin') {        //for Admin
          this.setState({ Loader: false });
          localStorage.setItem('authToken', result.data.token)
          this.props.history.push('/admin');
        } else {
          if (result.data.saved === true && result.data.user.roleType === 'customer') {     //for cutomer
            console.log(result, 'customerResult==============');
            this.setState({ Loader: false });
            localStorage.setItem('authToken', result.data.token)

            this.props.history.push('/user/dashboard');

          } else {

            this.errorOnlogin = result.data.errors;
            this.setState({});
            this.setState({ Loader: false });

          }
        }
      });
    }

    // console.log(this.state.PasswordError);
  }
  // onCloseModal = () => {
  // 	this.setState({ login_status: false });
  // };
  forgotHandle() {
    this.props.history.push('/forgot-password');
  }

  responseFacebook(response) {
    console.log(response);
    Auth.AxiosPOST('facebook/user/callback', response).then(data => {
      console.log(data);
    });
  }
  responseGoogle = response => {
    console.log(response);
  };
  render() {
    const { errors } = this.state;
    // console.log(errors);
    return (
      <div>
        <div className="col-12 col-sm-12 login_top_margin">

          {this.state.pass_reset_status ? (
            <h1 className="top_suc_msg_show">Please check your email for reset your password.</h1>
          ) : null}
          {this.state.confirm_status ? (
            <h1 className="top_err_msg_show">Please check your email for reset your password.</h1>
          ) : null}
          {this.errorOnlogin ? (
            <h1 className="top_err_msg_show">
              {
                'These login details are invalid.Please try again or click the password recovery link below.'
              }
            </h1>
          ) : null}

          {/* <span className="error-msg">{this.errorOnlogin}</span> */}

          <div id="login-box" className="login-form-msg">
            <div id="login-box-holder">
              <div className="row">
                <div className="col-12 col-sm-12">
                  <header id="login-header">
                    <div id="login-logo">
                      {/* <img src="img/logo.png" alt="" /> */}
                      <h4>Login</h4>
                    </div>
                  </header>
                  <div id="login-box-inner">
                    <form onSubmit={this.UserLoginMethod.bind(this)}>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-user mx-auto" />
                          </div>
                        </div>
                        <input
                          className="form-control"
                          type="username"
                          ref="username"
                          name="username"
                          autoComplete="false"
                          placeholder="username"
                          onChange={event => this.HandleChanges(event)}
                        />

                        <span className="error-msg">{errors.username}</span>
                      </div>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-key mx-auto" />
                          </div>
                        </div>
                        <input
                          type="password"
                          ref="password"
                          name="password"
                          autoComplete="false"
                          className="form-control"
                          placeholder="Password"
                          onChange={event => this.HandleChanges(event)}
                        />

                        <span className="error-msg">{errors.password}</span>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <button
                            autoFocus={true}
                            disabled={this.state.Loader}
                            type="button"
                            onClick={this.UserLoginMethod.bind(this)}
                            className="btn btn-login col-12"
                          >
                            {this.state.Loader ? (
                              <i className="fa fa-spinner fa-spin" />
                            ) : null}
                            Login
													</button>
                        </div>
                      </div>

                    </form>

                    <div id="login-box-footer">
                      <div className="row">
                        <div className="col-12 col-sm-12">
                          Do not have an account? &nbsp;
													<a href="/register" className="register_btn">
                            Register now
													</a>
                        </div>
                      </div>
                    </div>

                    <div id="remember-me-wrapper">
                      <div className="row">
                        <div className="col-md-12 text-center">
                          <a href="/forgot-password"
                            id="login-forget-link"
                            onClick={this.forgotHandle.bind(this)}
                            className="forgot_pass_link"
                          >
                            Forgot password?
													</a>
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

export default Login;