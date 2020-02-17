import React from 'react';
import axios from 'axios'
import { Switch, Route, Redirect } from 'react-router-dom'
import Spinner from './components/Spinner'
import AuthLogout from './components/AuthLogout'
import Home from './pages/Home'
import Header from './components/Header'
import Shop from './pages/Shop'
import SignInUp from './pages/SignInandUpPaga'
import SignIn from './components/SignIn'
import Register from './components/Register'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Category from './pages/Category'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import ResetPassword from './components/ResetPassword'

import { selectCurrentUser } from './redux/user/user-selector'
import { createStructuredSelector } from 'reselect'
import { browserUtils } from './utils/browser-utils'
import { authUtils } from './utils/auth-utils'


import { connect } from 'react-redux'
import { setCurrentUser, detectMyLocation } from './redux/user/user-actions'
import Helper from './Helper'
import PasswordChange from './components/PasswordChange';
import PasswordForget from './components/PasswordForget';
import ReviewForm from './components/ReviewForm';
import UserProfile from './pages/UserProfile'

import Swal from 'sweetalert2'


class App extends React.Component {
  componentDidMount() {
    let dispatch = this.props.dispatch;
    authUtils.autoLoginProcedure(dispatch);

    /*
    this.props.dispatchClassic(toursNeeded())
    console.log(this.props);
    */

    // async componentDidMount() {
    //   try {
    //     const tours = await axios.get('api/v1/tours');
    //     console.log(tours.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    /*
    if (this.props.state_ceo) {
      browserUtils.updateTitle(this.props.state_ceo.global.browserTitle)
    }
    */
  }

  /*
    componentDidUpdate(prevProps) {
      if (this.props.state_ceo) {
        if (this.props.state_ceo.global.browserTitle !== prevProps.state_ceo.global.browserTitle) {
          browserUtils.updateTitle(this.props.state_ceo.global.browserTitle)
        }
      }
    }
    */


  render() {

    let wrapper_cl = 'page-wrapper';
    if (false) {
      //TODO: ako je admin panel stranica ide ovaj wrapper
      wrapper_cl = 'wrapper adminlte';
    }

    /*
    TODO:
    redirekcija zavisno od toga da li si ulogovan ili ne
      <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInUp />)}>
          <Header />
          ...
      </Route>
    */


    console.log(this.props);
    let jsxLoginMaybe = (
      <Spinner />
    );
    let autologinFetching = true;
    if (this.props.state_ceo.user.auth.isFetching === false) {
      autologinFetching = false;
    }
    let isLoggedIn = false;
    if (this.props.state_ceo.user.auth.isLoggedIn === true) {
      console.log('*** App JESMO ULOGOVANI');
      isLoggedIn = true;
    } else {
      console.log('*** App NISMO ULOGOVANI ILI JE LOGOVANJE U TOKU');
      if (autologinFetching === true) {
        console.log('*** App LOGOVANJE U TOKU');
        // ostaje spinner
      } else {
        console.log('*** App NISMO ULOGOVANI');
        jsxLoginMaybe = (
          <SignInUp />
        );
      }
    }

    let jsxAdmin = null;

    return (
      <>
        <Helper />
        <Switch>
          <Route exact path='/'>
            <Home isLoggedIn={isLoggedIn} />
          </Route>
          <Route path='/signin'>
            <SignIn isLoggedIn={isLoggedIn} />
          </Route>
          <Route path='/logout'>
            <AuthLogout />
          </Route>
          <Route path='/register'>
            <Register isLoggedIn={isLoggedIn} />
          </Route>


          <Route
            path="/resetpassword/:token"
            render={(props) => {
              return (
                <ResetPassword match={props.match} />
              );
            }}
          />

          <Route path='/passwordchange'>
            <PasswordChange dispatch={this.dispatch} isLoggedIn={isLoggedIn} />
          </Route>

          <Route path='/passwordforget'>
            <PasswordForget isLoggedIn={isLoggedIn} />
          </Route>



          <Route path='/contact'>
            <div className={wrapper_cl}>
              <Header isLoggedIn={isLoggedIn} />
              <Contact dispatch={this.props.dispatch} />
              <Footer />
            </div>
          </Route>

          <Route exact path='/profile'>
            <div className={wrapper_cl}>
              <Header isLoggedIn={isLoggedIn} />
              <UserProfile dispatch={this.props.dispatch} />
              <Footer />
            </div>
          </Route>

          <Route exact path='/shop'>
            <div className={wrapper_cl}>
              <Header isLoggedIn={isLoggedIn} />
              <Shop />
              <Footer />
            </div>
          </Route>
          <Route exact path='/checkout'>
            <div className={wrapper_cl}>
              <Header isLoggedIn={isLoggedIn} />
              <Checkout />
              <Footer />
            </div>
          </Route>
          <Route exact path='/cart'>
            <div className={wrapper_cl}>
              <Header isLoggedIn={isLoggedIn} />
              <Cart />
              <Footer />
            </div>
          </Route>

          <Route
            path="/product/:id"
            render={(props) => {
              return (
                <div className={wrapper_cl}>
                  <Header isLoggedIn={isLoggedIn} />
                  <Product match={props.match} />
                  <Footer />
                </div>
              );
            }}
          />

          <Route
            path="/writereview/:id"
            render={(props) => {
              return (
                <div className={wrapper_cl}>
                  <Header isLoggedIn={isLoggedIn} />
                  <ReviewForm match={props.match} />
                  <Footer />
                </div>
              );
            }}
          />

          <Route path='/category/:id'
            render={(props) => {
              return (
                <div className={wrapper_cl}>
                  <Header isLoggedIn={isLoggedIn} />
                  <Category match={props.match} />
                  <Footer />
                </div>
              );
            }}
          />

          <Route path='/admin'
            render={(props) => {
              let jsx =
                jsxLoginMaybe

              if (isLoggedIn) {
                jsx = (
                  <Admin match={props.match} />
                );
              }
              return (
                <>
                  {jsx}
                </>
              );
            }}
          />


          <Route>
            <>
              <NotFound />
            </>
          </Route>

        </Switch>
      </>
    );
  }
}


/*
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})
*/

const mapStateToProps = state => ({
  state_ceo: state
})


/*
const mapStateToProps = state => ({
  state_ceo: state
})
*/

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  dispatchClassic: dispatch
})

export default connect(mapStateToProps, null)(App);