import React, { useState, useEffect } from 'react'
import { apiLib } from '../utils/api-lib'
import { apiSingleTourGet } from '../redux/shop/shop-actions'
import { ajaxGet } from '../utils/ajax-abstraction'
import { dateUtils } from './../utils/date-utils'
import { formatUtils } from './../utils/format-utils'


import { Link } from 'react-router-dom'

function BookingsItem(props) {
  let item = props.item
  console.log('iteeeeeeeeeeeeeeeeeeeeeeem', item);
  let tourid = item.tour

  const [state, setState] = useState({
    price: item.price,
    isFetching: true,
    data: {}
  })

  useEffect(() => {
    // component did mount

    // step 2: odmah zapocinjemo fetchovanje asinhtono
    ajaxGet(apiLib.apiSingleTourGet(tourid))
      .then((response) => {
        // fetchovanje je zavrseno i uspelo
        // step 3
        console.log('nase fetchovanje je zavrseno')
        console.log(response);
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          setState({
            ...state,
            isFetching: false,
            data: pripremljeni_podaci_za_state
          });
          console.log(pripremljeni_podaci_za_state);
          // dispatch(fetchReviewsSuccess(pripremljeni_podaci_za_state))
        } else {
          // dispatch(fetchReviewsFailure())
        }

      })

  }, [])


  let date = '';
  let firstDateParsed = dateUtils.parsedateString(item.createdAt);
  date = firstDateParsed.monthLong + ' ' + firstDateParsed.day;


  let prics_from_booking = item.price;
  let price = formatUtils.formatPrice(state.data.price, '€'); // actual price fetched from tours api

  return (
    <tr key={item._id} data-tour-id={item._id}>
      <td><Link to={'/product/' + tourid}>{state.data.name}</Link></td>
      <td>{price}</td>
      <td>{date}</td>
      <td>
        <div className="add-to-cart-groupDNOT">
          <div className="btn btn-add-cart"><Link to={'/writereview/' + tourid}><i className="fas fa-pencil-alt"></i> <span>Write a review</span></Link></div>
        </div>
      </td>
    </tr>
  )
}

export default BookingsItem
