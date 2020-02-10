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
  constructor() {
    super()
    this.state = {
      search: '',

      pricemin: 0,
      pricemax: 0,
      category: 'all',
      difficulty: 'all'
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.search = this.search.bind(this)

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let prepared_val = value;

    // fix za polja koja moraju da se tretiraju kao brojevi (integeri)
    if (name === 'pricemin' || name === "pricemax") {
      prepared_val = parseInt(value);
    }

    this.setState({
      [name]: prepared_val
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    alert('A search query was submitted: ' + this.state.search);
    let query = this.state.search;

  }

  componentDidMount() {
    // const { fetchCollectionsStart } = this.props
    // fetchCollectionsStart()
    this.props.dispatch(toursNeeded())

    let thisPageRoute = routingUtils.getRouteData('SHOP');
    // browserUtils.updateTitle(thisPageRoute.browserTitle)
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))

  }

  search(items) {
    console.log('search')
    console.log(items)
    let query = this.state.search;

    let query_filter = (items, query) => {
      if (typeof query === 'string') {
        query = query.trim()
        if (query !== '') {
          // do search
          let results = []
          // step 1) search query filtering
          items.forEach((item) => {
            if (item.name.toUpperCase().includes(query.toUpperCase())) {
              results.push(item)
            }
          })
          return results;

        } else {
          return items
        }
      } else {
        return items
      }
    }

    // FILTERING 1) search query filtering
    let search_results = query_filter(items, query);


    // FILTERING 2) classic filtering...
    let filteredItems = search_results.filter((item) => {
      let total_test = true;
      let price_min = 0;
      if (this.state.pricemin > 0) {
        price_min = this.state.pricemin
      }
      let price_max = 0;
      if (this.state.pricemax > 0) {
        price_max = this.state.pricemax
      }
      // testing
      let test_1 = () => {
        let test = true;
        if (item.price >= price_min) {
          // test = true;
          // sam oako je prosao prvi test radimo drugi
          if (price_max > 0 && price_max >= price_min) {
            if (item.price <= price_max) {
              // test = true;
            } else {
              test = false;
            }
          }
        } else {
          test = false;
        }
        return test;
      }
      // console.log(item.price, price_min, price_max, item.price < price_max);

      let test_2 = () => {
        let test = true;
        if (this.state.category === "all") {
          // true
        } else {
          if (this.state.category !== item.category) {
            test = false;
          }
        }
        return test;
      }

      let test_3 = () => {
        let test = true;
        if (this.state.difficulty === "all") {

        } else {
          if (this.state.difficulty !== item.difficulty) {
            test = false
          }
        }
        return test
      }

      // executing tests
      if (!test_1()) {
        total_test = false;
      }
      if (!test_2()) {
        total_test = false;
      }
      if (!test_3()) {
        total_test = false
      }
      return total_test;

    })


    // STEP 3) output
    console.log(filteredItems)
    return filteredItems;
  }


  render() {
    const { match } = this.props
    let items = [];
    let filteredItems = []
    let isFetching = true;
    let jsxCategoriesDashboard = [];
    let jsxSpinner = <SpinnerRow />

    let searchResults = []
    if (this.props.st.shop.isFetching === false) {
      isFetching = false;
      jsxSpinner = null;
      console.log('state.shop ');
      console.log(this.props.st.shop);
      items = this.props.st.shop.tours_items; // unfiltered
      let unfiltered_items = this.props.st.shop.tours_items; // unfiltered
      searchResults = this.search(unfiltered_items)
    }

    /*
    let jsxSearchResults = searchResults.map((item) => {
      return (
        <div>+ {item.name}</div>
      )
    })
    */
    let jsxSearchResults = <UniversalItems title={''} items={searchResults} limit={'bez limita'} spinner={isFetching} slider={false} />



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
            <div className="shop-filter">
              <div className="search-row">
                <form onSubmit={this.handleSubmit}>
                  <input
                    name="search"
                    type="text"
                    value={this.state.search}
                    onChange={this.handleInputChange}
                  />
                </form>
              </div>


              <div className="form-group">
                <div className="filters-panel">
                  <h4>Filter</h4>

                  <div className="row">

                    <div className="col xs-2">
                      <div className="form-group">
                        <label>Price min.</label>
                        <input
                          name="pricemin"
                          type="number"
                          className="form-control"
                          placeholder="0"
                          value={this.state.pricemin}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col xs-2">
                      <div className="form-group">
                        <label>Price max.</label>
                        <input
                          name="pricemax"
                          type="number"
                          className="form-control"
                          placeholder="0"
                          value={this.state.pricemax}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col xs-4">
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          name="category"
                          className="form-control"
                          value={this.state.category}
                          onChange={this.handleInputChange}
                        >
                          <option value="all">All Categories</option>
                          <option value="biking">Biking</option>
                          <option value="hiking">Hiking</option>
                          <option value="running">Running</option>
                          <option value="swimming">Swimming</option>
                        </select>
                      </div>
                    </div>

                    <div className="col xs-3">
                      <div className="form-group">
                        <label>Difficulty</label>
                        <select
                          name="difficulty"
                          className="form-control"
                          value={this.state.difficulty}
                          onChange={this.handleInputChange}
                        >
                          <option value="all">All Difficulties</option>
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="difficult">Difficult</option>
                        </select>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>
            <div className="search-results">
              {jsxSearchResults}
            </div>

            <div className="cetegories-dashboard">
              <h1>Cateogories</h1>
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
