import React, { Component } from 'react'
import { routingUtils } from './../utils/routing-utils'
import { updateBrowserTitle, updateCurrentRoute } from './../redux/global/global-actions'
import { Link } from 'react-router-dom'


export default class AdminGuidesList extends Component {
  componentDidMount() {
    let thisPageRoute = routingUtils.getRouteData('AP_GUIDES_LIST');
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
    this.props.dispatch(updateCurrentRoute('AP_GUIDES_LIST'))
  }
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <h3>GUIDES LIST</h3>
            </div>
            <div className="col-lg-6">
              <Link to={'/admin/guides/add'} className="active">(+) Add guide</Link>
            </div>
          </div>
        </div>
      </>
    )
  }
}
