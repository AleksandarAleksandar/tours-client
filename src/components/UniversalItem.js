import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from './CustomButton'
import { addItem } from '../redux/cart/cart-actions'
import ProductListItem from './ProductListItem'

function UniversalItem(props) {
  let item = props.item

  // let itemType = 'SIMPLE';
  let title = props.item.name;
  let price = props.item.price;

  let itemType = props.itemType

  // nekakav "router" za tip itema....
  let jsxItem = null;
  let product_key = item.id;
  if (itemType === 'SIMPLE') {
    jsxItem = (
      <div className="nasakomponanta">nesto</div>
    );
  } else if (itemType === 'DETAILED') {
    jsxItem = (
      <ProductListItem item={item}/>
    );
  } else if (itemType === 'OLD_DETAILED') {
    jsxItem = (
      <div className="item shop-item">
        <Link to={`/product/${product_key}`} className="active">
          <h3>{title}</h3>
        </Link>
        <h5>{item.category}</h5>
        nesto
        <p>Price: {price}</p>
      </div>
    );
  } else if (itemType === 'PAGE') {
    // jsxItem = <SingleProductPage />
  }

  return (
    <>
      {jsxItem}
    </>
  )
}

export default UniversalItem