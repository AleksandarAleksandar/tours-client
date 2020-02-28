import React, { useState, useEffect } from 'react'
import { apiLib } from '../utils/api-lib'
import { ajaxGet } from '../utils/ajax-abstraction'
import { dateUtils } from './../utils/date-utils'
import { formatUtils } from './../utils/format-utils'


import { Link } from 'react-router-dom'

function BookingsItem(props) {
  let item = props.item
  let tourid = item.tour
  const [state, setState] = useState({
    price: item.price,
    isFetching: true,
    data: {}
  })

  useEffect(() => {

    //start fetching
    ajaxGet(apiLib.apiSingleTourGet(tourid))
      .then((response) => {
        // fetchovanje success
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          setState({
            ...state,
            isFetching: false,
            data: pripremljeni_podaci_za_state
          });
        } else {
        }
      })
  }, [])


  let date = '';
  let firstDateParsed = dateUtils.parsedateString(item.createdAt);
  date = firstDateParsed.monthLong + ' ' + firstDateParsed.day;


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
