import React, { Component } from 'react'
import { routingUtils } from '../utils/routing-utils'
import { updateBrowserTitle, updateCurrentRoute } from '../redux/global/global-actions'
import { connect } from 'react-redux'

class NotFound extends Component {
  componentDidMount() {
    let thisPageRoute = routingUtils.getRouteData('NOT_FOUND');
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
    this.props.dispatch(updateCurrentRoute('NOT_FOUND'))
  }

  render() {
    return (
      <>
        <div>ROUTE NOT FOUND</div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  st: state
});

export default connect(mapStateToProps)(NotFound)