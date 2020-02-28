import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'

import { connect } from 'react-redux'
import { login } from './../redux/user/user-actions'
import {selectCurrentUser} from './../redux/user/user-selector'
import { authUtils } from '../utils/auth-utils'
import { Redirect, Link } from 'react-router-dom'
import SpinnerRow from './SpinnerRow'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      status: '',
      statusMessage: ''
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const dataToSubmit = { email: this.state.email, password: this.state.password }

    let cb = (response) => {
      let token = response.token;
      authUtils.afterLoginFormProcedure(token);
      authUtils.autoLoginProcedure(this.props.dispatch);
    }
    let cb_error = res => {
      if (res.data && res.data.status === 'fail') {
        this.setState({
          status: 'ERROR',
          statusMessage: res.data.message
        })
      }
    }
    this.props.dispatch(login(dataToSubmit, cb, cb_error))
  }

  handleChange = e => {
    const { value, name } = e.target

    this.setState({ [name]: value })
  }

  render() {

    let props = this.props
    let autologinFetching = true;
    if (props.auth.isFetching === false) {
      autologinFetching = false;
    }
    let jsxRedirect = null;


    let jsxError = null;
    if (this.state.status === 'ERROR') {
      jsxError = (
        <div className="alert alert-danger alert-dismissible">
          <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
          <h5><i className="icon fas fa-exclamation-triangle"></i> Error!</h5>
          {this.state.statusMessage}
        </div>
      );
    }

    let jsxLoginForm = (
      <div className="login-page">

        <div className="login-box">
          <div className="login-logo">
            <a href="../../index2.html"><b>I already have an account</b></a>
          </div>

          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in with your email and password</p>

              {jsxError}

              <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input name="rememberme" type="checkbox" id="remember" />
                      <label htmlFor="rememberme">Remember Me</label>
                    </div>
                  </div>

                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                  </div>

                </div>
              </form>

              <div className="social-auth-links text-center mb-3"></div>

              <p className="mb-1">
                <Link to={'/passwordforget'} className="text-center">I forgot my password</Link>
              </p>

              <p className="mb-0">
                <Link to={'/register'} className="text-center">Register a new membership</Link>
              </p>

            </div>

          </div>
        </div>

      </div>
    )


    let jsx = null;
    let jsxMaybe = <SpinnerRow />;
    if (props.isLoggedIn === true) {
      jsxRedirect = (
        <Redirect to="/" />
      );
      jsx = jsxRedirect
    } else {
      if (autologinFetching === true) {
        jsx = jsxMaybe
      } else {
        jsx = jsxLoginForm
      }
    }

    return (
      <>
        {jsx}
      </>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  auth: selectCurrentUser 
})

export default connect(mapStateToProps)(SignIn);