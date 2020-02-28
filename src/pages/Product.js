import React, { Component } from 'react'
import { connect } from 'react-redux'
import { singleTourNeeded, reviewsNeeded } from './../redux/shop/shop-actions'
import UniversalMap from './../components/UniversalMap'
import ReviewItem from './../components/ReviewItem'
import GuidesItem from './../components/GuidesItem'
import { apiLib } from '../utils/api-lib'
import { updateBrowserTitle } from './../redux/global/global-actions'
import { routingUtils } from './../utils/routing-utils'
import Breadcrumbs from './../components/Breadcrumbs'
import geoUtils from './../utils/geo-utils'
import { dateUtils } from './../utils/date-utils'
import { formatUtils } from './../utils/format-utils'
import BtnGeoLocation from '../components/BtnGeoLocation'
import { addItem } from '../redux/cart/cart-actions'
import SpinnerRow from '../components/SpinnerRow'
import { Link } from 'react-router-dom'
import { selectIsCollectionFetching, selectTour, selectReviews } from './../redux/shop/shop-selector'
import { selectUsersLocation, selectCurrentUser } from './../redux/user/user-selector'
import { createStructuredSelector } from 'reselect'

class Product extends Component {

  constructor(props) {
    super(props)

    this.addToCart = this.addToCart.bind(this)
  }

  addToCart = (item) => {
    return () => {
      this.props.dispatch(addItem(item))
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id; // path='/category/:id'
    this.props.dispatch(singleTourNeeded(id))
    this.props.dispatch(reviewsNeeded(id))
    console.log(this.props);

    let thisPageRoute = routingUtils.getRouteData('PRODUCT');
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
  }

  render() {
    let { tour_item, reviews, isFetching, userLocation, auth } = this.props;
    let guides = [];
    let cover = ""
    let validated = true;
    let jsxSpinner = <SpinnerRow />
    let jsxReviewsSpinner = <SpinnerRow />
    let jsxDistance = 'not calculated';

    if (isFetching === false && tour_item && tour_item.name) {
      validated = false;
    }

    let tour = {};
    let item = {};

    let firstDate = '';
    let price = '';

    let ll = [];
    let locations;
    if (validated === false) {
      jsxSpinner = null;
      tour = tour_item;
      item = tour;
      let original_ll = tour.startLocation.coordinates;
      ll = [original_ll[1], original_ll[0]]; // fixed ll
      locations = tour.locations;
      guides = tour.guides;

      if (tour.startDates && tour.startDates[0] !== '') {
        let firstDateParsed = dateUtils.parsedateString(item.startDates[0]);
        firstDate = firstDateParsed.monthLong + ' ' + firstDateParsed.day;
      }

      price = formatUtils.formatPrice(item.price, '€');
      cover = apiLib.staticCover(tour.imageCover)

      if (userLocation.detected === true) {
        let original_ll = tour.startLocation.coordinates;
        let ll = [original_ll[1], original_ll[0]]; // fixed ll
        let myll = userLocation.ll; // no need to fix
        let raw_distance = geoUtils.getDistance(ll, myll);
        let distance = formatUtils.formatDistance(raw_distance);
        jsxDistance = (
          <div className="distance">Distance: {distance}</div>
        );
      } else {
        jsxDistance = (
          <BtnGeoLocation dispatch={this.props.dispatch} />
        );
      }

    }

    let review = [];
    let reviewsFetching = reviews.isFetching;
    if (reviewsFetching === false) {
      jsxReviewsSpinner = null;
      review = reviews.data
    }
    let id = this.props.match.params.id; // path='/category/:id'
    let filteredReviews = review.filter((item) => {
      if (item.tour === id) {
        return true
      }
      return false
    })

    let jsxReviews = filteredReviews.map((item) => {
      return (
        <ReviewItem key={item.id} item={item} />
      )
    })

    let jsxGuides = guides.map((item) => {
      return (
        <GuidesItem key={item} id={item} />
      )
    })

    let divStyle = {
      border: '1px solid pink',
      backgroundImage: "url(" + cover + ")"
    };

    let thisPageRoute = routingUtils.getRouteData('SHOP');
    let breadcrumbs = thisPageRoute.breadcrumbs;
    let activeRoute = thisPageRoute.routeName;

    let googleMapURL = geoUtils.createGooleMapsURL(ll)
    let openStreetMapURL = geoUtils.createOpenStreetMapURL(ll, 10)

    let jsxWriteReview = (
      <div className="add-to-cart-group">
        <div className="btn btn-add-cart"><Link to={'/writereview/' + id}><i className="fas fa-pencil-alt"></i> Write a review</Link></div>
      </div>
    )
    if (auth.me.role === 'admin') {
      jsxWriteReview = (
        <div className="add-to-cart-group">
          <div className="btn btn-add-cart disabled"><span><i className="fas fa-pencil-alt"></i> Write a review</span></div>
        </div>
      )
    }

    return (
      <div className="product-page">

        <section className="section">
          <div className="inner">

            <div className="breadcrumbs-regular clearfix">
              <Breadcrumbs breadcrumbs={breadcrumbs} activeRoute={activeRoute} />
            </div>
            <h1>{item.name}</h1>
            <div className="summary">{item.summary}</div>

            {jsxSpinner}

            <div className="grid-items">
              <div className="item">

                <h3>Quick Facts</h3>

                <div className="facts items">
                  <div className="fact item">
                    <div className="fact-icon"><i className="fas fa-chart-line"></i></div>
                    <div className=""><span className="term-name">Difficulty:</span><span className="term-value">{item.difficulty}</span></div>
                  </div>

                  <div className="fact item">
                    <div className="fact-icon"><i className="fas fa-hourglass-start"></i></div>
                    <div className=""><span className="term-name">Duration:</span><span className="term-value">{item.duration}</span></div>
                  </div>

                  <div className="fact item">
                    <div className="fact-icon"><i className="fas fa-user-friends"></i></div>
                    <div className=""><span className="term-name">Maximum group size:</span><span className="term-value">{item.maxGroupSize}</span></div>
                  </div>

                  <div className="fact item">
                    <div className="fact-icon"><i className="far fa-star"></i></div>
                    <div className=""><span className="term-name">Rating:</span><span className="term-value">{item.ratingsAverage}</span></div>
                  </div>

                  <div className="fact item">
                    <div className="fact-icon"><i className="far fa-calendar-alt"></i></div>
                    <div className=""><span className="term-name">Start:</span><span className="term-value">{firstDate}</span></div>
                  </div>

                  <div className="fact item">
                    <div className="fact-icon"><i className="fas fa-euro-sign"></i></div>
                    <div className=""><span className="term-name">Price:</span><span className="term-value">{price}</span></div>
                  </div>

                  <div className="fact item">
                    {jsxDistance}
                  </div>

                </div>

                <div className="add-to-cart-group">
                  <div className="btn btn-add-cart" onClick={this.addToCart(item)}><i className="fas fa-cart-plus"></i> Add to cart</div>
                </div>

                {/* {jsxWriteReview} */}

              </div>
              <div className="item">
                <div className="description text-justify">{item.description}</div>
              </div>
            </div>

          </div>
        </section>

        <section className="section map-and-guides">
          <div className="bg-group">
            <div className="inner-full">
              <div className="cover" style={divStyle}></div>
            </div>
          </div>
          <div className="map-group">
            <div className="inner">
              <UniversalMap ll={ll} locations={locations} />
            </div>
          </div>
          <div className="guides-group">
            <div className="inner">
              <h3 className="section-title text-right">Guides</h3>
              <div className="items guides-items">{jsxGuides}</div>
            </div>
          </div>
          {/* <div className="extra-map-buttons">
            <a target="_blank" href={googleMapURL}>Open start location on google map</a>
            <br />
            <a target="_blank" href={openStreetMapURL}>Open start location on open street map</a>
          </div> */}
        </section>


        <section className="section">
          <div className="inner">
            <h3 className="section-title text-center">Reviews</h3>
            <div className="items reviews-items grid-items">{jsxReviews}</div>
            {jsxReviewsSpinner}
          </div>
        </section>

      </div >
    )
  }
}
const mapStateToProps = createStructuredSelector({
  tour_item: selectTour,
  isFetching: selectIsCollectionFetching,
  reviews: selectReviews,
  userLocation: selectUsersLocation,
  auth: selectCurrentUser
});

export default connect(mapStateToProps)(Product)
