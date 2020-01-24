import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, setCurrentUser } from './../redux/user/user-actions'
import { authUtils } from '../utils/auth-utils'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Spinner from './Spinner'


class AuthLogout extends Component {

  componentDidMount() {
    let dispatch = this.props.dispatch;
    authUtils.logoutProcedure(dispatch);
  }

  render() {
    let jsxRedirect = null;
    let isLoggedIn = false;
    if (this.props.state_ceo.user.auth.isLoggedIn === true) {
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

const mapStateToProps = state => ({
  state_ceo: state
})
export default connect(mapStateToProps)(AuthLogout);
