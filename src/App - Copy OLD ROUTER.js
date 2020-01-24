import React from 'react';
import axios from 'axios'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Shop from './pages/Shop'
import SignInUp from './pages/SignInandUpPaga'
import Checkout from './pages/Checkout'
import Product from './pages/Product'
import { toursNeeded } from './redux/shop/shop-actions'
import Category from './pages/Category'

import { selectCurrentUser } from './redux/user/user-selector'
import { createStructuredSelector } from 'reselect'

import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user-actions'


class App extends React.Component {
  componentDidMount() {

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
  }


  render() {
    return (
      <div className="wrapper">
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/shop' component={Shop} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInUp />)} />
          <Route exact path='/checkout' component={Checkout} />
          <Route path='/product/:id' component={Product} />
          <Route path='/category/:id' component={Category} />

        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,

})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  dispatchClassic: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(App);