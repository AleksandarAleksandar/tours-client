import React, { Component } from 'react'
import { passwordReset } from '../redux/user/user-actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      resetpasswordtoken: '',
      password: '',
      passwordConfirm: '',
      status: '',
      statusMessage: '',
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
      resetpasswordtoken: this.state.resetpasswordtoken,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    }
    console.log(dataToSubmit)

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
    // TODO:need to submit link for token reset
    let token = this.props.match.params.token; // path="/resetpassword/:token"
    this.props.dispatch(passwordReset(dataToSubmit, cb, cb_error, token))
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    let token = this.props.match.params.token;
    this.setState({
      resetpasswordtoken: token
    })
  }

  render() {
    let token = this.props.match.params.token;

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
            <a href="../../index2.html"><b>Create new password</b></a>
          </div>

          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Enter new password</p>

              {jsxError}

              <form className="sign-up-form" onSubmit={this.handleSubmit}>
                <input
                  type="hidden"
                  name="resetpasswordtoken"
                  value={token}
                />

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
                    name="passwordConfirm"
                    type="password"
                    className="form-control"
                    placeholder="Retype password"
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
            <h2>New password created successfully</h2>
            <p>You can login now with your new password.</p>
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
export default connect(mapStateToProps)(ResetPassword);

