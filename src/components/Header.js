import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { createStructuredSelector } from 'reselect'
import { setCurrentUser } from '../redux/user/user-actions'
import { apiLib } from './../utils/api-lib'

import CartIcon from './CartIcon'

// import '../css/styles.scss'
import CartDropdown from './CartDropdown'
import { selectCurrentUser } from '../redux/user/user-selector'
import { selectCartHidden } from '../redux/cart/cart-selectors'
// import { logout } from '../../../controllers/authControler'


function Header({ currentUser, hidden, setCurrentUser, isLoggedIn, state_ceo, isHomePage }) {

  console.log('header');
  console.log(currentUser);

  let avatar_src = apiLib.staticAvatarDefault();
  if (typeof state_ceo.user.auth.me.photo === 'string') {
    avatar_src = state_ceo.user.auth.me.photo;
  }

  let jsxAdministrator = null;
  let jsxLoginLogut = (
    <Link className="option hvr-underline-from-center" to='/signin'>login</Link>
  );
  if (isLoggedIn) {
    let nickname = state_ceo.user.auth.me.nickname;
    if (state_ceo.user.auth.me.role === 'admin') {
      jsxAdministrator = (
        <div className="floating-ap-bar">
          < Link className="" to='/admin'>Admin Panel</Link>
        </div>
      );
    }
    jsxLoginLogut = (
      <>
        <div className="avatar-group">
          <div className="avatar-img"><Link to="/profile"><img src={avatar_src} /></Link>
          </div>
          <div className="nickname">
            <Link to="/profile">
              <span className="option hvr-underline-from-center">{nickname}</span>
            </Link>
          </div>
          <div className="triangle">
            <div className="triangle-icon">&#9698;</div>
            <div className="popup">
              <div className="origin">
                <div className="popup-triangle"></div>
                <div className="popup-body">
                  <Link className="option hvr-underline-from-center" to='/passwordchange'>Change password</Link>
                  <br />
                  <Link className="option hvr-underline-from-center" to='/logout'>Logout</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </>
    )
  }

  let cl_header = 'header';
  if (isHomePage === true) {
    cl_header = 'header frontpage'
  }

  let notificationDot = 0;
  let jsxNotificationDot = null;
  let countDots = () => {
    let count = state_ceo.cart.cartItems.length;
    if (count > 0) {
      return count
    }
    return 0;
  }
  notificationDot = countDots()
  if (notificationDot > 0) {
    jsxNotificationDot = (
      <div className="notification-dot">{notificationDot}</div>
    )
  }



  return (
    <div className={cl_header}>
      <div className="header-line">
        <div className="inner">
          <div className="header-nav">
            <div className="logo">
              <Link to="/">
                <h2>Home</h2>
              </Link>
            </div>

            <div className="options">
              <Link to='/shop' className='option hvr-underline-from-center'>Shop</Link>
              <Link to='/contact' className='option hvr-underline-from-center'>Contact</Link>
              {jsxLoginLogut}
              <div className="cart-icon">
                <Link to='/cart' className='option hvr-underline-from-center'><i className="fa fa-shopping-cart"></i></Link>
                {jsxNotificationDot}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="big-title">Up<br />Tour<br /><div className="big-info">Biking<br />Hiking<br />Swimming<br />Running</div></div>

      {jsxAdministrator}

    </div>
  )
}

/*
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
  hidden: selectCartHidden
})
*/
const mapStateToProps = state => ({
  state_ceo: state
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, null)(Header)
