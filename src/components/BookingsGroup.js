import React from 'react'
import BookingsItem from './../components/BookingsItem'
import { formatUtils } from '../utils/format-utils'
import { dateUtils } from '../utils/date-utils'


const BookingsGroup = (props) => {

  let order = props.group.order;
  let bookings = props.group.tours;
  // table
  let jsxTableRows = bookings.map((item) => {
    return (
      <BookingsItem key={item._id} item={item} />
    )
  })
  let jsxBookingsTable = (
    <table className="table">
      <thead>
        <tr>
          <th>Tour name</th>
          <th>Price</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {jsxTableRows}
      </tbody>
    </table>
  )

  let price = formatUtils.formatPrice(order.price, '€')
  let date = dateUtils.parsedateString(order.createdAt);
  let dateDisplay = date.day + ' ' + date.monthLong + ' ' + date.year;


  let order_content = 'ORDER # ' + order._id;
  return (
    <div className="bookings-group">
      <div className="bookings-group-header">
        <div className="pair"><span>Order placed: </span><span>{dateDisplay}</span></div>
        <div className="pair"><span>Total: </span><span>{price}</span></div>
        <div className="pair pair-order">{order_content}</div>

      </div>
      <div className="bookings-group-body">
        {jsxBookingsTable}
      </div>
    </div>
  )
}
export default BookingsGroup;