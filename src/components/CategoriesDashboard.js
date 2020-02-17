import React from 'react'
import { connect } from 'react-redux'
import { toursNeeded } from '../redux/shop/shop-actions'
import UniversalItems from './UniversalItems'
import SpinnerRow from './SpinnerRow'
import { selectIsCollectionFetching, selectTours, selectCategories } from './../redux/shop/shop-selector'
import { createStructuredSelector } from 'reselect'


class CategoriesDashboard extends React.Component {
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
    this.props.dispatch(toursNeeded())
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
    let { tours_items, isFetching, categories } = this.props
    console.log(this.props);
    console.log('............ssssssssssssssssssss......................x');
    
    let items = [];
    // isFetching = true;
    let jsxCategoriesDashboard = [];
    let jsxSpinner = <SpinnerRow />

    let searchResults = []
    if (isFetching === false) {
      isFetching = false;
      jsxSpinner = null;
      items = tours_items; // unfiltered
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
    let categ = categories;
    console.log('.......xxxxxxxxxxxxxxxxxxxxxxx.......................');
    console.log(categ);
    
    Object.keys(categ).forEach((catId) => {
      filtered[catId] = items.filter((item) => {
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
      let title = categ[catId].title;
      let titleLinkRoute = '/category/' + catId;
      jsxCategoriesDashboard.push(
        <UniversalItems key={catId} title={title} titleLinkRoute={titleLinkRoute} items={filtered[catId]} limit={'no limit'} spinner={isFetching} slider={true} />
      )

    })


    return (
      <div className="cetegories-dashboard">
        <h1>Cateogories</h1>
        {jsxCategoriesDashboard}
        {jsxSpinner}
      </div>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  tours_items: selectTours,
  isFetching: selectIsCollectionFetching,
  categories: selectCategories
});

export default connect(mapStateToProps)(CategoriesDashboard)
