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
        <div className="error-page">

          <section className="section">
            <div className="inner">
              <div className="breadcrumbs-regular clearfix">
              </div>
              <h1>NOT FOUND</h1>
              <div className="t-center">
                <p className="t-center">Route not found</p>
                <p className="t-center"><img className="oops-img" src="/static/img/oops.jpg" /></p>
                
              </div>
            </div>
          </section>

        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(NotFound)