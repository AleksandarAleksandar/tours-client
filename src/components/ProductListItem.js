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
      month = date_parsed.month3char;
      day = date_parsed.day;
    }

    let jsxDistance = 'not calculated';
    if (props.userLocation.detected === true) {
      let original_ll = item.startLocation.coordinates;
      let ll = [original_ll[1], original_ll[0]]; // fixed ll
      let myll = props.userLocation.ll; // no need to fix
      let raw_distance = geoUtils.getDistance(ll, myll);
      let distance = formatUtils.formatDistance(raw_distance);
      jsxDistance = (
        <div className="distance">Distance: {distance}</div>
      );
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
  userLocation: selectUsersLocation 
})

export default connect(mapStateToProps)(ProductListItem)