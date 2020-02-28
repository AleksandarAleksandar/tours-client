import React from 'react'
import Breadcrumbs from './../components/Breadcrumbs'
import { Link } from 'react-router-dom'
import { reviewCreate } from './../redux/shop/shop-actions'
import Rating from '@material-ui/lab/Rating'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { routingUtils } from './../utils/routing-utils'
import { updateBrowserTitle } from './../redux/global/global-actions'
import { selectIsCollectionFetching, selectTours } from './../redux/shop/shop-selector'
import SpinnerRow from './SpinnerRow'
import { singleTourNeeded } from './../redux/shop/shop-actions'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      review: '',
      rating: 3,
      status: 'INITIAL'
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    let id = this.props.match.params.id; // path='/category/:id'

    const dataToSubmit = {
      review: this.state.review,
      rating: this.state.rating,
      tour: id
    }
    let cb = (response) => {
      this.setState({
        status: 'SUCCESS'
      })
    }
    let cb_error = res => {
      if (res.data && (res.data.status === 'fail' || res.data.status === 'error')) {
        this.setState({
          status: 'ERROR',
          statusMessage: res.data.message
        })
      }

    }
    this.props.dispatch(reviewCreate(dataToSubmit, cb, cb_error))
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    let thisPageRoute = routingUtils.getRouteData('REVIEW_CREATE');
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))

    let id = this.props.match.params.id;
    this.props.dispatch(singleTourNeeded(id))
  }

  render() {

    let thisPageRoute = routingUtils.getRouteData('REVIEW_CREATE');
    let breadcrumbs = thisPageRoute.breadcrumbs;
    let activeRoute = thisPageRoute.routeName;

    let mode = 'CREATE'
    let id = this.props.match.params.id;
    let { isFetching, tours_items } = this.props

    let jsxTourName = '...';
    let jsxSpinner = <SpinnerRow />
    if (isFetching === false && tours_items && tours_items.name) {
      jsxSpinner = null;
      jsxTourName = (
        <Link to={'/product/' + id}>{tours_items.name}</Link >
      );
    }

    let jsxStatus = null;
    let jsxError = null;
    let status = this.state.status;
    if (status === 'SUCCESS') {
      let success_msg = 'Review added succcessfully'
      if (mode === "UPDATE") {
        success_msg = "Review updated successfully"
      }
      jsxStatus = (
        <div className="info-box bg-success">
          <span className="info-box-icon"><i className="far fa-thumbs-up"></i></span>
          <div className="info-box-content">
            <span className="info-box-text">{success_msg}</span>
          </div>
        </div>
      )
    } else if (this.state.status === 'ERROR') {
      jsxError = (
        <div className="alert alert-danger alert-dismissible">
          <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
          <h5><i className="icon fas fa-exclamation-triangle"></i> Error!</h5>
          {this.state.statusMessage}
        </div>
      );
    }

    return (
      <div className="shop-page">

        <section className="section">
          <div className="inner">
            <div className="breadcrumbs-regular clearfix">
              <Breadcrumbs breadcrumbs={breadcrumbs} activeRoute={activeRoute} />
            </div>
            <h1>Write a review</h1>
            <div className="cetegories-dashboard">

              <div className="contact-form-wrapper">
                <h3>Write a review for {jsxTourName}</h3>
                {jsxStatus}
                {jsxError}
                <div className="material-ui-form contact-form">

                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Your rating</Typography>
                    <Rating
                      name="rating"
                      value={this.state.rating}
                      onChange={this.handleInputChange}
                    />
                  </Box>

                  <TextField
                    id="outlined-multiline-static"
                    label="Review text"
                    multiline
                    rows="4"
                    variant="outlined"
                    value={this.state.review}
                    onChange={this.handleInputChange}
                    name="review"
                  />
                  <Button
                    variant="contained"
                    endIcon={<i className="fas fa-paper-plane"></i>}
                    onClick={this.handleSubmit}
                  >Send</Button>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  tours_items: selectTours,
  isFetching: selectIsCollectionFetching
});

export default connect(mapStateToProps)(ReviewForm)
