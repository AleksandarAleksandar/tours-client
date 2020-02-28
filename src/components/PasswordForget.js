import React, { Component } from 'react'
import { passwordForgot } from '../redux/user/user-actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class PasswordForget extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      status: 'INITIAL',
      successEmail: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }


  handleSubmit = async e => {
    e.preventDefault();
    const dataToSubmit = {
      email: this.state.email
    }
    let cb = (response) => {
      this.setState({
        status: 'SUCCESS'
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
    this.props.dispatch(passwordForgot(dataToSubmit, cb, cb_error))
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

    let jsx = (
      <div className="register-page">

        <div className="register-box">
          <div className="register-logo">
            <a href="../../index2.html"><b>Forgot password</b></a>
          </div>

          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Enter your email</p>
              {jsxError}

              <form className="sign-up-form" onSubmit={this.handleSubmit}>

                <div className="input-group mb-3">
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={this.state.email}
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

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-block">Request new password</button>
                  </div>

                </div>
              </form>

              <p className="mt-3 mb-1">
                <Link to={'/'} className="text-center">Cancel</Link>
              </p>

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
            <h2>Reset password requested. Please check your email</h2>
            <p>An email has been sent to <b>{this.state.email}</b>. In order to create new password, please follow the instructions we have sent to this email.</p>
            <p></p>
            <p><Link to={'/'}>Go to home page</Link></p>
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

const mapStateToProps = state => ({
  state_ceo: state
})
export default connect(mapStateToProps)(PasswordForget);

