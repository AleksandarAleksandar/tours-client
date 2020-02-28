import React from 'react'
import SignIn from '../components/SignIn'
import Register from '../components/Register'
import {Redirect } from 'react-router-dom'

export default function SignInandUpPaga(props) {

  let jsxRedirect = null;
  if (props.isLoggedIn === true) {
    jsxRedirect = (
      <Redirect to="/" />
    );
  }

  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <Register />
      {jsxRedirect}
    </div>
  )
}
