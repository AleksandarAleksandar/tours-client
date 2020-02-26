import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { createStructuredSelector } from 'reselect'
import { setCurrentUser } from '../redux/user/user-actions'
import { apiLib } from './../utils/api-lib'

import CartIcon from './CartIcon'

// import '../css/styles.scss'
import CartDropdown from './CartDropdown'
import { selectCurrentUser } from './../redux/user/user-selector'
import { selectCartItems } from '../redux/cart/cart-selectors'
// import { logout } from '../../../controllers/authControler'


/*
Princip rada hamburger/popup menija: 
- event listener za clickove moze da se prikaci samo na postojeci dom elemnt
mi smo koristili document.body tako da slusamo klikove na celoj stranici.
- pozivanje listenera se vrsi samo u componentDidMount, u ovom slucaju useEffect.
- na svaki "click" event se poziva handler funkcija sa argumentom e u kojem e.target je precizniji dom elemnt na koji je tacno kliknuto.
- da bi mogli da pomocu toga otvaramo i zatavaramo hamburger/popup meni, moramo da takodje znamo dom element od popup menija i da izvrsimo poredjenje sa dom elemntom na kojem se desio klik.
- u React-u dom element nekog html elementa se dobija pomocu njegovog REF-a. REf se kreira sa createRef ili useRef (zaviusno da li je class ili funkcionalna) a zatim se na konkretan html elemenat mora da doda i ref atribut koji upucuje na promenjivu koju smo kreirali sa createRef ili useRef. Tek tada je ispunjen preduslov za ref.
- da bi taj dom element zaista postojao, mora komponenta da bude mountovana. I tada se u promenjivoj koja sadrzi ref pojavljuje .current properti koji je dom_element
- kad imamo i dom elemnt na koji je kliknuto i dom element koji je nas popup meni, onda mozemo da poredimo da li popu element sadrzi kliknutog i na osnovu toga znamo da li je kliknuto unutar popupa ili izvan.
- ako je kliknuto izvan popupa, obicaj je da u svakom slucaju zatvaramo popup, a ko je kliknuto unutar onda po zelji mozemo da gfa ostavimo otovrenog ili ipak zatvorimo.

*/

function Header({ currentUser, hidden, setCurrentUser, isLoggedIn, state_ceo, auth, cartItems, isHomePage }) {

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
    // componentDidMount
    var dom_clicks = document.body; // dom komanda koja selectuje ceo html body
    dom_clicks.addEventListener("click", (e) => {
      console.log('* CLICK');
      if (ref_hamburger && ref_hamburger.current) {
        console.log('postoji ref');
        let dom_hamburger = ref_hamburger.current;
        if (dom_hamburger.contains(e.target)) {
          console.log('ref sadrzi kliknutog');
          if (opened) {
            setOpened(false); // zatvara meni cak i ako je kliknuto unutar njega
          }
        } else {
          console.log('click se desio izvan refa');
          console.log(opened)
          if (opened) {
            setOpened(false); // zatavara meni ako je kliknuto izvan
          }
        }
      }
    });
  }, [opened])

  console.log('header');
  // console.log(currentUser);

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

    jsxLoginLogutSmall = (
      <>
        <div className="avatar-group">
          <div className="avatar-img"><Link to="/profile"><img src={avatar_src} /></Link>
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
                    <img src="/static/img/hiking-logo.png" />
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
                  <img src="/static/img/hiking-logo.png" />
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

/*
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
hidden: selectCartHidden
})
*/
const mapStateToProps = createStructuredSelector({
  auth: selectCurrentUser, //naming???
  cartItems: selectCartItems
})

export default connect(mapStateToProps, null)(Header)
