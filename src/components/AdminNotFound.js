import React, { Component } from 'react'
import { routingUtils } from '../utils/routing-utils'
import { updateBrowserTitle, updateCurrentRoute } from '../redux/global/global-actions'

export default class AdminNotFound extends Component {
  componentDidMount() {
    let thisPageRoute = routingUtils.getRouteData('AP_NOT_FOUND')
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
    this.props.dispatch(updateCurrentRoute('AP_NOT_FOUND'))
  }

  render() {
    return (
      <>
        <div>ADMIN PANEL PAGE NOT FOUND</div>
      </>
    )
  }
}
