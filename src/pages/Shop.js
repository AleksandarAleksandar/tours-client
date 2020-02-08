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
import SpinnerRow from '../components/SpinnerRow'

class Shop extends React.Component {
  componentDidMount() {
    // const { fetchCollectionsStart } = this.props
    // fetchCollectionsStart()
    this.props.dispatch(toursNeeded())

    let thisPageRoute = routingUtils.getRouteData('SHOP');
    // browserUtils.updateTitle(thisPageRoute.browserTitle)
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))

  }

  render() {
    const { match } = this.props
    let items = [];
    let filteredItems = []
    let jsxCategoriesDashboard = [];
    let jsxSpinner = <SpinnerRow/>

    if (this.props.st.shop.isFetching === false) {
      jsxSpinner=null;
      console.log('test 3 ');
      console.log(this.props.st.shop);
      items = this.props.st.shop.tours_items;

    }

    let filtered = {};
    // let categories = {
    //   "running": {
    //     title: "RUNNING"
    //   },
    //   "hiking": {
    //     title: "HIKING"
    //   },
    //   "swimming": { title: "SWIMMING" },
    //   "biking": { title: "BIKING" }
    // }
    let categories = this.props.st.shop.categories
    Object.keys(categories).forEach((catId) => {
      filtered[catId] = items.filter((item) => {
        // console.log(item.category, category)
        if (catId === 'all') {
          return true;
        }
        if (item.category === catId) {
          return true
        } else {
          return false
        }
      })
      //
      let title = categories[catId].title;
      let titleLinkRoute = '/category/' + catId;
      jsxCategoriesDashboard.push(
        <UniversalItems key={catId} title={title} titleLinkRoute={titleLinkRoute} items={filtered[catId]} limit={'bez limita'} spinner={true} slider={true} />
      )

    })


    let thisPageRoute = routingUtils.getRouteData('SHOP');
    let breadcrumbs = thisPageRoute.breadcrumbs;
    let activeRoute = thisPageRoute.routeName;


    return (
      <div className="shop-page">

        <section className="section">
          <div className="inner">
            <div className="breadcrumbs-regular clearfix">
              <Breadcrumbs breadcrumbs={breadcrumbs} activeRoute={activeRoute} />
            </div>
            <h1>Ovo je shop stranica sa 4 kategorije</h1>
            <div className="cetegories-dashboard">
              {jsxCategoriesDashboard}
              {jsxSpinner}
            </div>
          </div>
        </section>

      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  st: state
});

export default connect(mapStateToProps)(Shop)
