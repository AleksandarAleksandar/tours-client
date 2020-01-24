import React, { Component } from 'react'
import { routingUtils } from './../utils/routing-utils'
import { updateBrowserTitle, updateCurrentRoute } from './../redux/global/global-actions'
import { Link } from 'react-router-dom'


export default class AdminWelcome extends Component {
  componentDidMount() {
    let thisPageRoute = routingUtils.getRouteData('AP');
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
    this.props.dispatch(updateCurrentRoute('AP'))
  }

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <h3>welcome</h3>
              col lg 6


                  </div>

            <div className="col-lg-6">
              col lg 6


                  </div>
          </div>

        </div>
      </>
    )
  }
}
