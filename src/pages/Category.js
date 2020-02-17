import React from 'react'

import { connect } from 'react-redux'

import { selectCollection } from '../redux/shop/shop-selector'
import CollectionItem from '../components/PreviewItem'
import UniversalItems from '../components/UniversalItems'
import { toursNeeded } from './../redux/shop/shop-actions'
import shopActionTypes from '../redux/shop/shop-types'
// import { browserUtils } from './../utils/browser-utils'
import { updateBrowserTitle } from './../redux/global/global-actions'
import { routingUtils } from './../utils/routing-utils'
import Breadcrumbs from './../components/Breadcrumbs'
import SpinnerRow from './../components/SpinnerRow'
import { selectIsCollectionFetching, selectTours, selectCategories } from './../redux/shop/shop-selector'
import { createStructuredSelector } from 'reselect'


class Category extends React.Component {
  constructor(props) {
    super(props)
    console.log('constructor Category Page');
    console.log(this.props);
  }

  componentDidMount() {
    this.props.dispatch(toursNeeded())
    console.log('did mount Category Page');
    console.log(this.props);

    let thisPageRoute = routingUtils.getRouteData('CATEGORY');
    // browserUtils.updateTitle(thisPageRoute.browserTitle)
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
  }


  render() {
    let catId = this.props.match.params.id; // path='/category/:id'
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
    let categories = this.props.categories
    let category = categories[catId]

    if (category && category.title) {
      category.id = catId
    } else {
      category = {
        title: 'NEPOZNATA KATEGORIJA'
      }
    }
    let items = [];
    let filteredItems = []

    let jsxSpinner = (
      <SpinnerRow/>
    );

    if (this.props.isFetching === false) {
      console.log('test 3----------------------------------------------------------------- ');
      // console.log(this.props.state_ceo.shop);
      jsxSpinner = null;
      items = this.props.tours_items;
    }
    console.log('before filtering');
    console.log(items)
    console.log('kriterijum: ', catId);

    filteredItems = items.filter((item) => {
      console.log(item.category, category)
      if (catId === 'all') {
        return true;
      }
      if (item.category === catId) {
        return true
      } else {
        return false
      }
    });

    console.log('after filtering');
    console.log(filteredItems)

    let thisPageRoute = routingUtils.getRouteData('CATEGORY');
    let breadcrumbs = thisPageRoute.breadcrumbs;
    let activeRoute = thisPageRoute.routeName;

    return (
      <div className="category-page">

        <section className="section">
          <div className="inner">
            <div className="breadcrumbs-regular clearfix">
              <Breadcrumbs breadcrumbs={breadcrumbs} activeRoute={activeRoute} />
            </div>
            <h1>{category.title}</h1>
            <div className="">
              <UniversalItems title={category.title} category={category.id} items={filteredItems} limit={'ncemo da limitiramo ovde'} spinner={true} />
            </div>
          </div>
        </section>
      </div>
    )
  }
};

const mapStateToProps = createStructuredSelector({
  tours_items: selectTours,
  isFetching: selectIsCollectionFetching,
  categories: selectCategories
});
export default connect(mapStateToProps)(Category);
