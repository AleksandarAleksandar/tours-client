import React from 'react'

import { connect } from 'react-redux'

import { selectCartItems } from './../redux/cart/cart-selectors'
import { createStructuredSelector } from 'reselect'
import CollectionItem from '../components/PreviewItem'
import UniversalItems from '../components/UniversalItems'
import { toursNeeded } from './../redux/shop/shop-actions'
import shopActionTypes from '../redux/shop/shop-types'
// import { browserUtils } from './../utils/browser-utils'
import { updateBrowserTitle } from './../redux/global/global-actions'
import { routingUtils } from './../utils/routing-utils'
import Breadcrumbs from './../components/Breadcrumbs'
import CheckoutItem from './../components/CheckoutItem'
import CartItem from './../components/CartItem'
import { formatUtils } from './../utils/format-utils'

import { emptyCart } from '../redux/cart/cart-actions'
import { Link } from 'react-router-dom'


class Cart extends React.Component {
  constructor(props) {
    super(props)
    console.log('constructor Cart Page');
    console.log(this.props);
  }

  componentDidMount() {
    // this.props.dispatch(toursNeeded())
    console.log('did mount Cart page');
    console.log(this.props);

    let thisPageRoute = routingUtils.getRouteData('CART');
    // browserUtils.updateTitle(thisPageRoute.browserTitle)
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
  }

  render() {
    let props = this.props;
    let dispatch = props.dispatch;

    let jsxSpinner = null;

    let thisPageRoute = routingUtils.getRouteData('CART');
    let breadcrumbs = thisPageRoute.breadcrumbs;
    let activeRoute = thisPageRoute.routeName;

    let items = this.props.cartItems
    console.log(items);

    let total = 0;
    let jsxCartItems = items.map((item) => {
      // return <CheckoutItem key={item.id} cartItem={item} />
      total += item.price * item.quantity;
      return <CartItem key={item.id} item={item} dispatch={this.props.dispatch} />
    })

    let totalPrice = formatUtils.formatPrice(total, '€')

    return (
      <div className='cart-page' >

        <section className="section">
          <div className="inner">

            <div className="breadcrumbs-regular clearfix">
              <Breadcrumbs breadcrumbs={breadcrumbs} activeRoute={activeRoute} />
            </div>
            <h1>Cart</h1>

          </div>
        </section>

        <section className="section">
          <div className="inner">

            <div className='items cart-items grid-items'>
              {jsxCartItems}
              {jsxSpinner}
            </div>

            <div className="total-group">
              <div className="total">TOTAL: {totalPrice}</div>
            </div>

            <div className="add-to-cart-group">
              <Link to={'/checkout'} className="btn btn-add-cart"><i className="far fa-credit-card"></i>Checkout</Link>
              <div className="btn btn-add-cart" onClick={() => { dispatch(emptyCart()) }}><i className="fas fa-times"></i> Empty cart</div>
            </div>

          </div>
        </section>

      </div>
    )
  }
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});
export default connect(mapStateToProps)(Cart);
