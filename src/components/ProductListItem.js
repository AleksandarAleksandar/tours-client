import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { apiLib } from '../utils/api-lib'
import { dateUtils } from '../utils/date-utils'
import { formatUtils } from './../utils/format-utils'
import { connect } from 'react-redux'
import geoUtils from '../utils/geo-utils'
import BtnGeoLocation from './BtnGeoLocation'
import { selectUsersLocation } from './../redux/user/user-selector'
import { createStructuredSelector } from 'reselect'


class ProductListItem extends Component {

  render() {
    let props = this.props;
    let item = props.item;
    let title = item.name;
    let price = formatUtils.formatPrice(item.price, '€');
    let product_key = item.id;

    let cover = apiLib.staticCover(item.imageCover);

    let divStyle = {
      border: '0px solid pink',
      backgroundImage: "url(" + cover + ")"
    };


    let month = '???';
    let day = '?';
    let test_date = item.startDates[0];
    if (typeof test_date === 'string') {
      let date_parsed = dateUtils.parsedateString(test_date)
      console.log(test_date);
      console.log(date_parsed);
      month = date_parsed.month3char;
      day = date_parsed.day;
    }

    // console.log(props.state_ceo.user);
    let jsxDistance = 'not calculated';
    if (props.userLocation.detected === true) {
      let original_ll = item.startLocation.coordinates;
      let ll = [original_ll[1], original_ll[0]]; // fixed ll
      // let original_myll = [0,0];
      let myll = props.userLocation.ll; // no need to fix
      let raw_distance = geoUtils.getDistance(ll, myll);
      let distance = formatUtils.formatDistance(raw_distance);
      jsxDistance = (
        <div className="distance">Distance: {distance}</div>
      );
      /*
      console.log('-----------------------------------------------------------------');
      console.log(original_ll);
      console.log(myll);
      console.log(raw_distance);
      console.log(distance);
      */
    } else {
      jsxDistance = (
        <BtnGeoLocation dispatch={props.dispatch} />
      );
    }




    return (
      <div className="item shop-item">
        <div className="tour-card">
          <div className="date-box">
            <div className="day">{day}</div>
            <div className="month">{month}</div>
          </div>
          <div className="card-header">
            <div className="cover-fading"></div>
            <div className="cover" style={divStyle}></div>
            <div className="shop-item-title">
              <Link to={`/product/${product_key}`} className="">
                <h5 className="">{title}</h5>
              </Link>
            </div>
          </div>
          <div className="card-body">
            <div className="category">{item.category}</div>
            <div className="summary">{item.summary}</div>

            <div className="price">{price}</div>
            {jsxDistance}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  userLocation: selectUsersLocation //naming???
})

export default connect(mapStateToProps)(ProductListItem)

/*
startLocation: {type: "Point", description: "Banff, CAN", coordinates: Array(2), address: "224 Banff Ave, Banff, AB, Canada"}
ratingsAverage: 5
ratingsQuantity: 9
images: (3) ["tour-1-1.jpg", "tour-1-2.jpg", "tour-1-3.jpg"]
startDates: (3) ["2021-04-25T09:00:00.000Z", "2021-07-20T09:00:00.000Z", "2021-10-05T09:00:00.000Z"]
secretTour: false
guides: (3) ["5c8a21d02f8fb814b56fa189", "5c8a201e2f8fb814b56fa186", "5c8a1f292f8fb814b56fa184"]
_id: "5c88fa8cf4afda39709c2951"
category: "biking"
name: "The Forest Hiker"
duration: 5
maxGroupSize: 25
difficulty: "easy"
price: 397
summary: "Breathtaking hike through the Canadian Banff National Park"
description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.↵Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
imageCover: "tour-1-cover.jpg"
locations: (3) [{…}, {…}, {…}]
slug: "the-forest-hiker"
durationWeeks: 0.7142857142857143
id: "5c88fa8cf4afda39709c2951"
*/