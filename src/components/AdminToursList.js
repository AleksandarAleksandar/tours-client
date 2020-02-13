import React from 'react'
import geoUtils from './../utils/geo-utils'
import { routingUtils } from './../utils/routing-utils'
import { formatUtils } from './../utils/format-utils'
import { browserUtils } from '../utils/browser-utils'
import { updateBrowserTitle, updateCurrentRoute } from './../redux/global/global-actions'
import { createTour, deleteTour } from './../redux/shop/shop-actions'
import { usersNeeded } from './../redux/user/user-actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toursNeeded } from './../redux/shop/shop-actions'
import Spinner from './Spinner'


class AdminToursList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'NONE',
      pricemin: 0,
      pricemax: 0,
      category: 'all',
      difficulty: 'all'
    };

    // binding this
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteTour = this.deleteTour.bind(this);
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

  deleteTour(id) {
    if (window.confirm("Do you really want to delete?")) {
      console.log('deleting... ', id);
      let callback = () => {
        // callback nakon uspelog brisanja
        window.alert("item deleted!"); // tokom alerta ce biti stopiran script na ovoj liniji
        // nakon sto kliknemo na OK u alertu, izvrsavanje se nastavlja
        browserUtils.reload(); // refreshujemo ovu stranu
      }
      this.props.dispatch(deleteTour(id, callback))
    }
  }


  componentDidMount() {
    let thisPageRoute = routingUtils.getRouteData('AP_TOURS_LIST');
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
    this.props.dispatch(updateCurrentRoute('AP_TOURS_LIST'))

    this.props.dispatch(toursNeeded())
  }


  render() {

    let items = [];
    let filteredItems = []
    let jsxSpinner = <Spinner />
    let jsxCategoriesDashboard = [];


    if (this.props.st.shop.isFetching === false) {
      jsxSpinner = null;
      console.log('test 3 ');
      console.log(this.props.st.shop);
      items = this.props.st.shop.tours_items;
    }

    filteredItems = items.filter((item) => {
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

    let jsxTableRows = filteredItems.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="t-right">{index + 1}</td>
          <td>{item.category}</td>
          <td>{item.name}</td>
          <td>{item.difficulty}</td>
          <td className="t-right">{item.duration}</td>
          <td className="price-field">{formatUtils.formatPrice(item.price)}</td>
          <td>
            <div className="btn-group">
              <Link to={'/product/' + item.id}>
                <button type="button" className="btn btn-block btn-success btn-xs" data-id={item.id}><i className="far fa-eye"></i> Open</button>
              </Link>
              <Link to={'/admin/tours/edit/' + item.id}>
                <button type="button" className="btn btn-block btn-primary btn-xs" data-id={item.id}><i className="fas fa-edit"></i> Edit</button>
              </Link>
              <button type="button"
                className="btn btn-block btn-danger btn-xs"
                data-id={item.id}
                onClick={() => { this.deleteTour(item.id) }}
              ><i className="fas fa-trash"></i> Delete</button>
            </div>
          </td>
        </tr>
      )
    })

    let jsxTableHeaderRow = (
      <tr>
        <th className="t-right">#</th>
        <th>Category</th>
        <th>Name</th>
        <th>Difficulty</th>
        <th className="t-right" >Duration</th>
        <th className="t-right" >Price</th>
        <th>Actions</th>
      </tr>
    )



    return (
      <>
        <div className="col-md-12">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title"><i className="fas fa-user-plus"></i> Add tour guide</h3>
            </div>
            <div className="card-body pad table-responsive">

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

              <table className="table table-striped">
                <thead>
                  {jsxTableHeaderRow}
                </thead>
                <tbody>
                  {jsxTableRows}
                </tbody>
              </table>
              {jsxSpinner}

            </div>
            <div className="card-footer">
              <Link to={'/admin/tours/add'}>
                <button type="submit" className="btn btn-success"><i className="fas fa-plus"></i> Add Tour</button>
              </Link>
            </div>
          </div>
        </div>

      </>
    )
  }
}
const mapStateToProps = (state) => ({
  st: state
});

export default connect(mapStateToProps)(AdminToursList)