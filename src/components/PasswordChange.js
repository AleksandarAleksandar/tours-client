import React, { Component } from 'react'
import { passwordChange } from '../redux/user/user-actions'
import { Link } from 'react-router-dom'

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordCurrent: '',
      password: '',
      passwordConfirm: '',
      status: 'INITIAL',
      successEmail: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }


  handleSubmit = async e => {
    e.preventDefault();
    const { password, passwordConfirm } = this.state
    if (password !== passwordConfirm) {
      alert("password don't match")
      return
    }
    const dataToSubmit = {
      passwordCurrent: this.state.passwordCurrent,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    }

    let cb = (response) => {
      this.setState({
        status: 'SUCCESS',
        successEmail: response.data.user.email
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
    this.props.dispatch(passwordChange(dataToSubmit, cb, cb_error))
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
            <h2>Change new password</h2>
          </div>

          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Enter new password</p>

              {jsxError}

              <form className="sign-up-form" onSubmit={this.handleSubmit}>

                <div className="input-group mb-3">
                  <input
                    name="passwordCurrent"
                    type="password"
                    className="form-control"
                    placeholder="Current password"
                    value={this.state.passwordCurrent}
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
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="New password"
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
                    name="passwordConfirm"
                    type="password"
                    className="form-control"
                    placeholder="Retype new password"
                    value={this.state.passwordConfirm}
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
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
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
            <h2>Password successfully changed</h2>
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

export default PasswordChange