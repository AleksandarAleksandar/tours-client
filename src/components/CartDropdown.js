import React from 'react'
import { connect } from 'react-redux'

// import '../css/styles.scss'
import Button from './CustomButton'
import CartItem from './CartItem'
import { selectCartItems } from '../redux/cart/cart-selectors'
import {withRouter} from 'react-router-dom'
import {toggleCartHidden} from '../redux/cart/cart-actions'



function CartDropdown({ cartItems, history, dispatch }) {
  return (
    <div className='cart-dropdown'>
      <div className="cart-items">
        {
          cartItems.length ?
            cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
            :
            <span className="empty-message">Your cart is empty</span>
        }
      </div>
      <Button onClick={()=>{
        history.push('/checkout')
        dispatch(toggleCartHidden())  
        }} >Go to checkout</Button>

    </div>
  )
}
const mapStateToProps = state => ({
  cartItems: selectCartItems(state)
})
export default withRouter(connect(mapStateToProps)(CartDropdown))