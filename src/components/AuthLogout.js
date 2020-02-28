import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authUtils } from '../utils/auth-utils'
import { Redirect } from 'react-router-dom'
import Spinner from './Spinner'
import { selectCurrentUser } from './../redux/user/user-selector'
import { createStructuredSelector } from 'reselect'


class AuthLogout extends Component {

  componentDidMount() {
    let dispatch = this.props.dispatch;
    authUtils.logoutProcedure(dispatch);
  }

  render() {
    let jsxRedirect = null;
    let isLoggedIn = false;
    if (this.props.auth.isLoggedIn === true) {
      isLoggedIn = true;
    } else {
      jsxRedirect = (
        <Redirect to="/" />
      );
    }

    return (
      <>
        <Spinner />
        {jsxRedirect}
      </>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  auth: selectCurrentUser 
})
export default connect(mapStateToProps)(AuthLogout);
