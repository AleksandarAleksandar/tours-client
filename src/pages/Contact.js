import React from 'react'


import Breadcrumbs from './../components/Breadcrumbs'
import { Route } from 'react-router-dom'
// import CollectionsOverviewContainer from '../components/CollectionOverviewContainer'
// import CollectionPageContainer from '../components/CollectionPageContainer'
import CollectionOverview from './../components/CollectionsOverview'
import CategoryPage from './Category'
import { toursNeeded } from './../redux/shop/shop-actions'

import UniversalItems from './../components/UniversalItems'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { fetchCollectionsStart } from './../redux/shop/shop-actions'
// import { browserUtils } from './../utils/browser-utils'
import { routingUtils } from './../utils/routing-utils'
import { updateBrowserTitle } from './../redux/global/global-actions'
import { selectCollections } from './../redux/shop/shop-selector'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';


class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      fullName: '',
      message: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  componentDidMount() {
    this.props.dispatch(toursNeeded())
    let thisPageRoute = routingUtils.getRouteData('CONTACT');
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  render() {

    let thisPageRoute = routingUtils.getRouteData('CONTACT');
    let breadcrumbs = thisPageRoute.breadcrumbs;
    let activeRoute = thisPageRoute.routeName;


    return (
      <div className="shop-page">

        <section className="section">
          <div className="inner">
            <div className="breadcrumbs-regular clearfix">
              <Breadcrumbs breadcrumbs={breadcrumbs} activeRoute={activeRoute} />
            </div>
            <h1>Contact us</h1>
            <div className="cetegories-dashboard">

              <div className="contact-form-wrapper">
                <div className="material-ui-form contact-form">


                  <TextField
                    id="outlined-helperText"
                    label="Your name"
                    defaultValue=""
                    helperText="First and last name"
                    variant="outlined"
                    value={this.state.fullName}
                    onChange={this.handleInputChange}
                    name="fullName"
                  />

                  <TextField
                    id="outlined-helperText"
                    label="Your email"
                    defaultValue=""
                    helperText="We will answer on this email"
                    variant="outlined"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    name="email"
                  />

                  <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows="4"
                    defaultValue=""
                    variant="outlined"
                    value={this.state.message}
                    onChange={this.handleInputChange}
                    name="message"
                  />

                  <Button
                    variant="contained"
                    endIcon={<i class="fas fa-paper-plane"></i>}
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
    
    export default Contact
