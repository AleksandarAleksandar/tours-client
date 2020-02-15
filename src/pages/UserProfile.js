import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { routingUtils } from '../utils/routing-utils'
import { updateBrowserTitle, updateCurrentRoute } from '../redux/global/global-actions'
import { bookingsNeeded, ordersNeeded } from '../redux/shop/shop-actions'

import BookingsItem from './../components/BookingsItem'
import SpinnerRow from './../components/SpinnerRow'
import Breadcrumbs from './../components/Breadcrumbs'
import { Link } from 'react-router-dom'
import BookingsGroup from '../components/BookingsGroup'


const UserProfile = (props) => {

  useEffect(() => {
    props.dispatch(bookingsNeeded())
    props.dispatch(ordersNeeded())

    let thisPageRoute = routingUtils.getRouteData('PROFILE');
    props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
    props.dispatch(updateCurrentRoute('PROFILE'))
  }, [])


  let thisPageRoute = routingUtils.getRouteData('PROFILE');
  let breadcrumbs = thisPageRoute.breadcrumbs;
  let activeRoute = thisPageRoute.routeName;


  let jsxBookingsSpinner = <SpinnerRow />
  let jsxOrdersSpinner = <SpinnerRow />;
  let jsxSpinner = <SpinnerRow />

  let shop = props.state_ceo.shop;

  let bookings = [];
  let orders = [];


  let isBookingsFetching = shop.bookings.isFetching;
  let isOrdersFetching = shop.orders.isFetching;
  let isFetching = true;

  let jsxOrders = null;
  let jsxBookings = null;
  let jsxBookingsTable = null;

  if (isBookingsFetching === false) {
    jsxBookingsSpinner = null;
    bookings = shop.bookings.data
    jsxBookings = bookings.map((item) => {
      console.log('Bokings Iteeeeeeeeeeeeeeeeeem');
      console.log(item);
      return (
        <div key={item._id}>
          price: {item.price}
        </div>
      )
    });

    // table
    let jsxTableRows = bookings.map((item) => {
      return (
        <BookingsItem key={item._id} item={item} />
      )
    })
    jsxBookingsTable = (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
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

  }
  if (isOrdersFetching === false) {
    jsxOrdersSpinner = null;
    orders = shop.orders.data
    jsxOrders = orders.map((item) => {
      console.log('Order iteeeeeeeeeeeeeeeeeeeeem');
      console.log(item);
      return (
        <div key={item._id}>
          price: {item.price}<br />
          order_id: {item._id}
        </div>
      )
    })
  }

  let bookings_groups = []; // bookings gruped by orders
  let jsxGroups = null;
  if (isOrdersFetching === false && isBookingsFetching === false) {
    isFetching = false;
    jsxSpinner = null;
    let get_order_by_id = (id) => {
      let order;
      orders.forEach((o) => {
        if (o._id === id) {
          order = o
        }
      })
      return order
    }


    let upsert_booking_into_groups = () => {
      // UPSERT znaci: ako id postoji UPDATE, ako id ne postoji INSERT
      let target_index;
      bookings.forEach((tour) => {
        if (bookings_groups.length > 0) {
          bookings_groups.forEach((group, index) => {
            if (group.order_id === tour.order) {
              // postoji!!!
              // radimo UPDATE
              // TODO
              target_index = index;
              let target_group = bookings_groups[target_index];
              let old_tours = [...target_group.tours]; // pure clone of array
              bookings_groups[target_index] = { ...target_group, tours: [...old_tours, tour] }; // UPDATE
            } else {
              // ne postoji! radimo INSERT
              let new_group = {
                order_id: tour.order,
                order: get_order_by_id(tour.order),
                tours: [tour]
              }
              bookings_groups.push(new_group); // INSERT
            }
          });
        } else {
          // ako je array jos uvek prazan, u svakom slucaju se vrsi INSERT
          let new_group = {
            order_id: tour.order,
            order: get_order_by_id(tour.order),
            tours: [tour]
          };
          bookings_groups.push(new_group); // INSERT
        }

      });
    }
    upsert_booking_into_groups();
    console.log('bookings_groups');
    console.log(bookings_groups);
  }

  let bookings_groups_reversed = bookings_groups.reverse(); // NOT WORKING ??
  console.log(bookings_groups_reversed);

  jsxGroups = bookings_groups_reversed.map((group) => {
    /*
    let jsxGroup = group.tours.map((item) => {
      return (
        <h6>{item._id} - {item.price}</h6>
      )
    })
    return (
      <div>
        <h5>{group.order_id}</h5>
        {jsxGroup}
      </div>
    )
    */
    return (
      <BookingsGroup group={group} />
    );
  })


  return (
    <div className="user-page">

      <section className="section">
        <div className="inner">

          <div className="breadcrumbs-regular clearfix">
            <Breadcrumbs breadcrumbs={breadcrumbs} activeRoute={activeRoute} />
          </div>
          <h1 className="text-left">User profile</h1>

          <div className="my-bookings">
            {/* 
            <h2>My bookings</h2>
            {jsxBookings}
            {jsxBookingsTable}
            {jsxBookingsSpinner}
            <h2>My orders</h2>
            {jsxOrders}
            {jsxOrdersSpinner}
            */ }

            <h2>My bookings</h2>
            {jsxGroups}
            {jsxSpinner}

          </div>
        </div>
      </section>
    </div>
  )
}
const mapStateToProps = (state) => ({
  state_ceo: state
});

export default connect(mapStateToProps)(UserProfile)
