import React, { lazy, Suspense } from 'react';
import axios from 'axios'
import { Switch, Route, Redirect } from 'react-router-dom'
import Spinner from './components/Spinner'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import { authUtils } from './utils/auth-utils'
import ErrorBoundery from './components/ErrorBoundary'
import NotFound from './pages/NotFound'


import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user-actions'
import Helper from './Helper'
import SpinnerRow from './components/SpinnerRow'
const Contact = lazy(() => import('./pages/Contact'))
const Product = lazy(() => import('./pages/Product'))
const Category = lazy(() => import('./pages/Category'))
// const NotFound = lazy(() => import('./pages/NotFound'))
const Admin = lazy(() => import('./pages/Admin'))
const Cart = lazy(() => import('./pages/Cart'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const Shop = lazy(() => import('./pages/Shop'))
const Checkout = lazy(() => import('./pages/Checkout'))
const SignInUp = lazy(() => import('./pages/SignInandUpPaga'))
const Register = lazy(() => import('./components/Register'))
const SignIn = lazy(() => import('./components/SignIn'))
const ResetPassword = lazy(() => import('./components/ResetPassword'))
const AuthLogout = lazy(() => import('./components/AuthLogout'))
const PasswordChange = lazy(() => import('./components/PasswordChange'))
const PasswordForget = lazy(() => import('./components/PasswordForget'))
const ReviewForm = lazy(() => import('./components/ReviewForm'))




class App extends React.Component {
  componentDidMount() {
    let dispatch = this.props.dispatch;
    authUtils.autoLoginProcedure(dispatch);
  }

  render() {

    let wrapper_cl = 'page-wrapper';
    if (false) {
      wrapper_cl = 'wrapper adminlte';
    }


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
        <ErrorBoundery>
          <Suspense fallback={<SpinnerRow />}>

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

              <Route path="/resetpassword/:token" render={(props) => {
                return (<ResetPassword match={props.match} />)
              }} />

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
            </Switch >

          </Suspense>
        </ErrorBoundery>
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