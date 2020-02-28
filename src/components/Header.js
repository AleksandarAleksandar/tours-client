import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { apiLib } from './../utils/api-lib'
import { selectCurrentUser } from './../redux/user/user-selector'
import { selectCartItems } from '../redux/cart/cart-selectors'

function Header({ isLoggedIn, auth, cartItems, isHomePage }) {
  const [opened, setOpened] = useState(false)

  let toggleMenu = () => {
    if (opened) {
      setOpened(false)
    } else {
      setOpened(true)
    }
  }

  const ref_hamburger = useRef(null);

  useEffect(() => {
    var dom_clicks = document.body; // select body
    dom_clicks.addEventListener("click", (e) => {
      if (ref_hamburger && ref_hamburger.current) {
        let dom_hamburger = ref_hamburger.current;
        if (dom_hamburger.contains(e.target)) {
          if (opened) {
            setOpened(false); //close menu if clicked inside
          }
        } else {
          if (opened) {
            setOpened(false); // close menu if cliked outside
          }
        }
      }
    });
  }, [opened])


  let avatar_src = apiLib.staticAvatarDefault();
  if (typeof auth.me.photo === 'string') {
    avatar_src = auth.me.photo;
  }

  let jsxAdministrator = null;
  let jsxAdministratorSmall = null;

  let jsxLoginLogut = (
    <Link className="option hvr-underline-from-center" to='/signin'>login</Link>
  );
  let jsxLoginLogutSmall = (
    <Link className="option hvr-underline-from-center" to='/signin'>login</Link>
  );
  if (isLoggedIn) {
    let nickname = auth.me.nickname;
    if (auth.me.role === 'admin') {
      jsxAdministrator = (
        <div className="floating-ap-bar">
          < Link className="" to='/admin'>Admin Panel</Link>
        </div>
      );
      jsxAdministratorSmall = (
        < Link className="option hvr-underline-from-center danger" to='/admin'>Admin Panel</Link>
      );
    }
    jsxLoginLogut = (
      <>
        <div className="avatar-group">
          <div className="avatar-img"><Link to="/profile"><img alt="avatar" src={avatar_src} /></Link>
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

    jsxLoginLogutSmall = (
      <>
        <div className="avatar-group">
          <div className="avatar-img"><Link to="/profile"><img alt="avatar" src={avatar_src} /></Link>
          </div>
          <div className="nickname">
            <Link to="/profile">
              <span className="option hvr-underline-from-center">{nickname}</span>
            </Link>
          </div>
        </div>
        <Link className="suboption option hvr-underline-from-center" to='/passwordchange'>Change password</Link>
        <Link className="suboption option hvr-underline-from-center" to='/logout'>Logout</Link>
      </>
    )
  }

  let notificationDot = 0;
  let jsxNotificationDot = null;
  let countDots = () => {
    let count = cartItems.length;
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

  let jsxOptions = (
    <div className="options">
      <Link to='/shop' className='option hvr-underline-from-center'>Shop</Link>
      <Link to='/contact' className='option hvr-underline-from-center'>Contact</Link>
      {jsxLoginLogut}
      <div className="cart-icon">
        <Link to='/cart' className='option hvr-underline-from-center'><i className="fa fa-shopping-cart"></i></Link>
        {jsxNotificationDot}
      </div>
    </div>
  )
  let jsxOptionsSmall = (
    <div className="options">
      {jsxAdministratorSmall}
      <Link to='/shop' className='option hvr-underline-from-center'>Shop</Link>
      <Link to='/contact' className='option hvr-underline-from-center'>Contact</Link>
      {jsxLoginLogutSmall}
      <div className="cart-icon">
        <Link to='/cart' className='option hvr-underline-from-center'><i className="fa fa-shopping-cart"></i></Link>
        {jsxNotificationDot}
      </div>
    </div>
  )

  let cl_opened = '';
  if (opened) {
    cl_opened = ' menu-opened';
  }

  let cl_header = 'header' + cl_opened;
  if (isHomePage === true) {
    cl_header = 'header frontpage' + cl_opened
  }

  return (
    <div className={cl_header}>
      <div className="header-line">

        <div className="header-line-big">
          <div className="inner">
            <div className="header-nav">
              <div className="logo">
                <Link to="/">
                  <div className="logo-img">
                    <img alt="logo" src="/static/img/hiking-logo.png" />
                  </div>
                </Link>
              </div>
              <div className="big-nav">
                {jsxOptions}
              </div>
            </div>
          </div>
        </div>

        <div className="header-line-small" ref={ref_hamburger}>

          <div className="logo-and-hamburger">
            <div className="logo">
              <Link to="/">
                <div className="logo-img">
                  <img alt="logo" src="/static/img/hiking-logo.png" />
                </div>
              </Link>
            </div>
            <div className="hamburger-icon" onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </div>
          </div>

          <div className="small-options-container">
            {jsxOptionsSmall}
          </div>

        </div>
      </div>

      <div className="big-title">Up<br />Tour<br /><div className="big-info">Biking<br />Hiking<br />Swimming<br />Running</div></div>

      {jsxAdministrator}

    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  auth: selectCurrentUser, 
  cartItems: selectCartItems
})

export default connect(mapStateToProps, null)(Header)
