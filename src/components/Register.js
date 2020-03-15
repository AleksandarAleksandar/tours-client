import React, { Component } from 'react'
import { register } from './../redux/user/user-actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      status: 'INITIAL',
      successEmail: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }


  handleSubmit = async e => {
    e.preventDefault();

    const { password, confirmPassword } = this.state
    if (password !== confirmPassword) {
      alert("password don't match")
      return
    }
    const dataToSubmit = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }

    let cb = (response) => {
      this.setState({
        status: 'SUCCESS',
        successEmail: response.user.email
      })
    }
    let cb_error = res => {
      if (res.data && res.data.status === 'fail') {
        this.setState({
          status: 'ERROR',
          statusMessage: res.data.message
        })
      }
    }
    this.props.dispatch(register(dataToSubmit, cb, cb_error))
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    let jsx = (
      <div className="register-page">

        <div className="register-box">
          <div className="register-logo">
            <a href="../../index2.html"><b>I do not have an account</b></a>
          </div>

          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Sign up with email and password</p>

              <form className="sign-up-form" onSubmit={this.handleSubmit}>

                <div className="input-group mb-3">
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
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
                    onChange={this.handleInputChange}
                    required
                  />

                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="Retype password"
                    value={this.state.confirmPassword}
                    onChange={this.handleInputChange}
                    required
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
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="terms"
                        value="agree"
                      />

                      <label htmlFor="agreeTerms">
                        I agree to the <a href="#">terms</a>
                      </label>
                    </div>
                  </div>

                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                  </div>

                </div>
              </form>

              <Link to={'/signin'} className="text-center">I already have a membership</Link>
            </div>

          </div>
        </div>

      </div>
    );

    let jsxCongratulations = null;
    if (this.state.status === 'SUCCESS') {
      jsx = null;
      jsxCongratulations = (
        <div className="register-congratulations text-center">
          <div className="inner">
            <h2>Thank you for registering. Please verify your account</h2>
            <p>An email has been sent to <b>{this.state.successEmail}</b>. In order to complete your registration, please click the confirmation link in the email that we have sent to this email.</p>
            <p><Link to={'/'}>Go to home page</Link></p>
            <p></p>
          </div>
        </div>
      )
    }

    return (
      <>
        {jsxCongratulations}
        {jsx}
      </>
    )
  }
}

export default Register;