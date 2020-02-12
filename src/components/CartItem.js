import React from 'react'
import { Link } from 'react-router-dom'
import { addItem, removeItem } from '../redux/cart/cart-actions'
import { formatUtils } from './../utils/format-utils'
import { dateUtils } from './../utils/date-utils'
import {apiLib} from './../utils/api-lib'

// import '../css/styles.scss'

export default function CartItem(props) {
  // { item: { imageUrl, price, name, quantity } }
  console.log('cart item');
  console.log(props);
  let dispatch = props.dispatch
  let item = props.item;
  if (!item) {
    item = {};
  }
  let quantity = item.quantity

  let price = formatUtils.formatPrice(item.price, '€');

  let startDate = '';
  if (item.startDates && item.startDates[0] !== '') {
    let firstDateParsed = dateUtils.parsedateString(item.startDates[0]);
    startDate = firstDateParsed.monthLong + ' ' + firstDateParsed.day
  }

  let endDate = '';

  let cover = apiLib.staticCover(item.imageCover)
  let divStyle = {
    border: '1px solid pink',
    backgroundImage: "url(" + cover + ")"
  };


  return (
    <div className="item cart-item">
      <div className="tour-card">
        <div className="card-header">
          <div className="cover-fading"></div>
          <div className="cover" style={divStyle}></div>
          <div className="shop-item-title">
            <Link to={`/product/${'product_key'}`} className="">
              <h5 className="">{item.name}</h5>
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="category">{item.category}</div>
          <div className="summary">{item.summary}</div>

          <div className="facts items">
            <div className="fact item">
              <div className="fact-icon"><i className="fas fa-chart-line"></i></div>
              <div className=""><span className="term-name">Difficulty:</span><span className="term-value">{item.difficulty}</span></div>
            </div>

            <div className="fact item">
              <div className="fact-icon"><i className="fas fa-hourglass-start"></i></div>
              <div className=""><span className="term-name">Start:</span><span className="term-value">{startDate}</span></div>
            </div>

            <div className="fact item">
              <div className="fact-icon"><i className="far fa-calendar-alt"></i></div>
              <div className=""><span className="term-name">Duration:</span><span className="term-value">{item.duration} days</span></div>
            </div>

            <div className="fact item">
              <div className="fact-icon"><i className="fas fa-euro-sign"></i></div>
              <div className=""><span className="term-name"></span><span className="term-value">{price}</span></div>
            </div>

          </div>

          <div className="quantity">
            <div className="arrow minus" onClick={() => dispatch(removeItem(item))}><i className="fas fa-user-minus"></i></div>
            <div className="value">{quantity} persons</div>
            <div className="arrow plus" onClick={() => dispatch(addItem(item))}><i className="fas fa-user-plus"></i></div>
          </div>


        </div>

      </div>
    </div>
  )
}

/*
            <div className="arrow minus" onClick={() => dispatch(removeItem(item))}>&#10094;</div>
            <div className="value">{quantity} persons</div>
            <div className="arrow plus" onClick={() => dispatch(addItem(item))}>&#10095;</div>
*/