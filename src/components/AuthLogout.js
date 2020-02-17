import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, setCurrentUser } from './../redux/user/user-actions'
import { authUtils } from '../utils/auth-utils'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
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
      console.log('*** JESMO ULOGOVANI');
      // ako smo jos uvek ulogovani prikazuje se ova komponenta sa spinnerom
      isLoggedIn = true;
    } else {
      console.log('*** NISMO ULOGOVANI');
      // cim dodje momenat izlogovanja vrsi se redirekcija na pocetnu stranicu.
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
  auth: selectCurrentUser //naming???
})
export default connect(mapStateToProps)(AuthLogout);
