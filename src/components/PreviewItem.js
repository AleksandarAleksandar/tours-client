import React from 'react'
import { connect } from 'react-redux'

// import '../css/styles.scss'
import { withRouter } from 'react-router-dom'
import Button from './CustomButton'
import { addItem } from '../redux/cart/cart-actions'

function PreviewItem({ item, addItem, history }) {
  const { name, price, imageUrl, id } = item



  return (
    <div className='collection-item'>
      <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='collection-footer'>
        <span className='name' >{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button onClick={() => {
        history.push(`product/${id}`);
      }} >view details</Button>
      {/* history.push('/checkout') */}
      {/* <Button onClick={() => addItem(item)} inverted>Add to cart</Button> */}
    </div>
  )
}
const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
})

export default withRouter(connect(null, mapDispatchToProps)(PreviewItem))