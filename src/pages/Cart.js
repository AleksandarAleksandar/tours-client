import React from 'react'
import { connect } from 'react-redux'
import { selectCartItems } from './../redux/cart/cart-selectors'
import { createStructuredSelector } from 'reselect'
import { updateBrowserTitle } from './../redux/global/global-actions'
import { routingUtils } from './../utils/routing-utils'
import Breadcrumbs from './../components/Breadcrumbs'
import CartItem from './../components/CartItem'
import { formatUtils } from './../utils/format-utils'
import { emptyCart } from '../redux/cart/cart-actions'
import { Link } from 'react-router-dom'


class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let thisPageRoute = routingUtils.getRouteData('CART');
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
    let total = 0;
    let jsxCartItems = items.map((item) => {
      total += item.price * item.quantity;
      return <CartItem key={item.id} item={item} dispatch={this.props.dispatch} />
    })

    let totalPrice = formatUtils.formatPrice(total, '€')

    let jsxGoToCheckout = (
      <div className="add-to-cart-group">
        <div className="btn btn-add-cart disabled"><i className="far fa-credit-card"></i>Checkout</div>
        <div className="btn btn-add-cart btn-empty-cart disabled" > <i className="fas fa-times"></i> Empty cart</div>
      </div>
    );

    if (items.length > 0) {
      jsxGoToCheckout = (
        <div className="add-to-cart-group">
          <Link to={'/checkout'} className="btn btn-add-cart"><i className="far fa-credit-card"></i>Checkout</Link>
          <div className="btn btn-add-cart btn-empty-cart" onClick={() => { dispatch(emptyCart()) }}><i className="fas fa-times"></i> Empty cart</div>
        </div>
      );
    }

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
            {jsxGoToCheckout}
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
