import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCollectionsForPreview } from './../redux/shop/shop-selector'
import { createStructuredSelector } from 'reselect'
import { singleTourNeeded, reviewsNeeded } from './../redux/shop/shop-actions'
import UniversalMap from './../components/UniversalMap'
import UniversalItem from './../components/UniversalItem'
import ReviewItem from './../components/ReviewItem'
import GuidesItem from './../components/GuidesItem'
import { apiLib } from '../utils/api-lib'
// import { browserUtils } from './../utils/browser-utils'
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
    console.log(this.props);

    let id = this.props.match.params.id; // path='/category/:id'

    this.props.dispatch(singleTourNeeded(id))
    this.props.dispatch(reviewsNeeded(id))
    console.log(this.props);

    let thisPageRoute = routingUtils.getRouteData('PRODUCT');
    // browserUtils.updateTitle(thisPageRoute.browserTitle)
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
  }

  render() {
    let props = this.props;
    console.log('SINGLE TOUR');
    /*
    startLocation: {type: "Point", description: "Aspen, USA", coordinates: Array(2), address: "419 S Mill St, Aspen, CO 81611, USA"}
    ratingsAverage: 4.5
    ratingsQuantity: 6
    images: (3) ["tour-3-1.jpg", "tour-3-2.jpg", "tour-3-3.jpg"]
      0(pin):"tour-3-1.jpg"
      1(pin):"tour-3-2.jpg"
      2(pin):"tour-3-3.jpg"
    startDates: (3) ["2022-01-05T10:00:00.000Z", "2022-02-12T10:00:00.000Z", "2023-01-06T10:00:00.000Z"]
    secretTour: false
    guides: (3) ["5c8a21d02f8fb814b56fa189", "5c8a23412f8fb814b56fa18c", "5c8a1f4e2f8fb814b56fa185"]
    _id: "5c88fa8cf4afda39709c295a"
    category: "swimming"
    name: "The Snow Adventurer"
    duration: 4
    maxGroupSize: 10
    difficulty: "difficult"
    price: 997
    summary: "Exciting adventure in the snow with snowboarding and skiing"
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum!↵Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, exercitation ullamco laboris nisi ut aliquip. Lorem ipsum dolor sit amet, consectetur adipisicing elit!"
    imageCover: "tour-3-cover.jpg"
    locations: (2) [{…}, {…}]
    slug: "the-snow-adventurer"
    __v: 0
    durationWeeks: 0.5714285714285714
    reviews: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
    id: "5c88fa8cf4afda39709c295a"
    */

    let guides = [];
    let cover = ""
    let validated = true;
    let shop = this.props.state_ceo.shop;

    let jsxSpinner = <SpinnerRow />
    let jsxReviewsSpinner = <SpinnerRow />

    let jsxDistance = 'not calculated';

    if (shop.isFetching === false && shop.tour_item && shop.tour_item.name) {
      validated = false;
    }

    let tour = {};
    let item = {};

    let firstDate = '';
    let price = '';

    let ll = [];
    let locations;
    if (validated === false) {
      console.log('test 4 SHOP ');
      console.log(shop);

      jsxSpinner = null;

      tour = shop.tour_item;
      item = tour;

      console.log(tour);
      // FIX
      let original_ll = tour.startLocation.coordinates;
      ll = [original_ll[1], original_ll[0]]; // fixed ll
      // locations = tour.locations [...].coordinates 
      locations = tour.locations;
      console.log(ll);
      console.log(locations);
      // startLocation.coordinates[""0""]
      guides = tour.guides;

      console.log(typeof tour.startDate, tour.startDate);
      if (tour.startDates && tour.startDates[0] !== '') {
        let firstDateParsed = dateUtils.parsedateString(item.startDates[0]);
        firstDate = firstDateParsed.monthLong + ' ' + firstDateParsed.day;
        console.log(firstDateParsed);
      }

      price = formatUtils.formatPrice(item.price, '€');

      // if fetching false
      cover = apiLib.staticCover(tour.imageCover)



    
      if (props.state_ceo.user.userLocation.detected === true) {
        let original_ll = tour.startLocation.coordinates;
        let ll = [original_ll[1], original_ll[0]]; // fixed ll
        // let original_myll = [0,0];
        let myll = props.state_ceo.user.userLocation.ll; // no need to fix
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

    }

    let reviews = [];
    let reviewsFetching = shop.reviews.isFetching;
    if (reviewsFetching === false) {
      jsxReviewsSpinner = null;
      reviews = shop.reviews.data
    }

    console.log(reviews);
    let id = this.props.match.params.id; // path='/category/:id'
    // console.log(id);
    let filteredReviews = reviews.filter((item) => {
      // console.log(item.id, item._id);

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
    if (this.props.state_ceo.user.auth.me.role === 'admin') {
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
          <div className="extra-map-buttons">
            <a target="_blank" href={googleMapURL}>Open start location on google map</a>
            <br />
            <a target="_blank" href={openStreetMapURL}>Open start location on open street map</a>
          </div>
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

/*
const mapStateToProps = createStructuredSelector({
      collections: selectCollectionsForPreview,
  
  })
  */

const mapStateToProps = (state) => ({
  state_ceo: state
});

export default connect(mapStateToProps)(Product)
