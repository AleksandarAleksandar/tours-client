import React, { Component } from 'react'
import { routingUtils } from '../utils/routing-utils'
import { updateBrowserTitle, updateCurrentRoute } from '../redux/global/global-actions'
import { createTour, updateTour } from '../redux/shop/shop-actions'
import geoUtils from '../utils/geo-utils'
import { usersNeeded } from '../redux/user/user-actions'
import { singleTourNeeded } from '../redux/shop/shop-actions'
import { connect } from 'react-redux'
import { counterUtils } from '../utils/counter-utils'
import FormLocation from './FormLocation'
import FormPicture from './FormPicture'


import Swal from 'sweetalert2'


/* TODO: osmisliti korake nakon uspesnog submitovanja za create i update
*/

class AdminToursForm extends Component {
  constructor(props) {
    super(props)
    this._global = {}; // para state
    this._global.multicheckbox_state = {
      tours_fetched: false,
      users_fetched: false,
      users: [],
      guides_for_edit: []
    };
    this.state = {
      status: 'NONE',
      errors: {},
      multicheckbox: [],
      locations: [],
      pictures: [],

      category: 'biking',
      name: '',
      summary: '',
      description: '',
      difficulty: 'medium',
      duration: '',
      maxGroupSize: '',
      price: '',
      imageCover: 'tour-3-cover.jpg',

      startGeoUri: '',
      coordinates: [],
      startDescription: "",
      address: "",

      startDate: ''
    };

    // binding this
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._handleMultiChecbox = this._handleMultiChecbox.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if(name==='description') {
      value=value.trim();
    }
    if(name==='summary') {
      value=value.trim()
    }

    this.setState({
      [name]: value
    });

    if (name === 'startGeoUri') {
      let fixed_coordinates = [];
      if (typeof value === 'string' && value !== '') {
        let ll = geoUtils.extractL(value);
        console.log(ll);
        fixed_coordinates = [ll[1], ll[0]];
        console.log(fixed_coordinates);
        this.setState({
          coordinates: fixed_coordinates
        });
      }
    }
  }


  _handleMultiChecbox(event) {
    // event.target.checked
    console.log('*** MULTICHECKBOX CHANGE');
    let next_multicheckbox = this.state.multicheckbox.map((item) => {
      if (event.target.value === item.value) {
        return {
          value: item.value,
          label: item.label,
          checked: event.target.checked
        }
      } else {
        return item
      }
    });
    console.log(next_multicheckbox);
    this.setState({
      multicheckbox: next_multicheckbox
    })
  }

  _muliticheckboxHelper(what) {
    let do_multicheckbox = false;
    if (what === 'USERS') {
      this._global.multicheckbox_state.users_fetched = true;
    }
    if (what === 'GUIDES') {
      this._global.multicheckbox_state.tours_fetched = true;
    }
    let mode = this.props.mode;
    if (mode === 'UPDATE') {
      if (this._global.multicheckbox_state.users_fetched === true && this._global.multicheckbox_state.tours_fetched === true) {
        // kada su fetchovani i users i tours
        do_multicheckbox = true;
      }
    } else {
      // mode CREATE
      if (this._global.multicheckbox_state.users_fetched === true) {
        // kada su fetchovani users
        do_multicheckbox = true;
      }
    }

    if (do_multicheckbox) {
      // create new_multicheckboc
      let users = this._global.multicheckbox_state.users;
      let guides = users.filter((item) => {
        if (item.role === 'guide' || item.role === 'lead-guide') {
          return true;
        }
        return false;
      });
      console.log(guides);
      let new_multicheckbox = guides.map((item) => {
        let role = 'Guide';
        if (item.role === 'lead-guide') {
          role = 'Lead guide';
        }
        return ({
          value: item._id,
          label: item.name + ' (' + role + ')',
          role: item.role,
          checked: false
        })
      });
      // zatim drugi pass: inicijalno checkiranje checkboxova
      let edited_multicheckbox = new_multicheckbox.map((checkbox_item) => {
        this._global.multicheckbox_state.guides_for_edit.forEach((guide_id) => {
          if (guide_id === checkbox_item.value) {
            checkbox_item.checked = true;
          }
        });
        return checkbox_item;
      });
      console.log('helper kreirao multicheckbox: ');
      console.log(edited_multicheckbox);
      this.setState({
        multicheckbox: edited_multicheckbox
      });
    }

  }

  handleSubmit(event) {
    event.preventDefault();
    // alert('An essay was submitted: ' + this.state.value);
    console.log('SUBMIT');
    let mode = this.props.mode;

    let guidesPrepared = [];
    this.state.multicheckbox.forEach((item) => {
      if (item.checked === true) {
        console.log(item);
        guidesPrepared.push(
          // formType: item.value,
          // ref: 'User'
          item.value
        )
      }
    });
    let picturesPrepared = [];
    this.state.pictures.forEach((item) => {
      picturesPrepared.push(item.url)
    })

    let startDate = new Date(this.state.startDate);
    let startDates = [startDate];
    let submitData = {
      category: this.state.category,
      name: this.state.name,
      summary: this.state.summary,
      description: this.state.description,
      difficulty: this.state.difficulty,
      duration: this.state.duration,
      maxGroupSize: this.state.maxGroupSize,
      price: this.state.price,

      imageCover: this.state.imageCover,
      startLocation: {
        type: "Point",
        description: this.state.startDescription,
        coordinates: this.state.coordinates,
        address: this.state.address
      },
      locations: this.state.locations,
      images: picturesPrepared,
      guides: guidesPrepared,
      startDates: startDates
    }
    console.log(submitData);
    let callbackSuccess = (response) => {
      console.log('...callback u Komponenti nakon "success" post zahteva :)');
      console.log(response);
      // alert('podaci su uspesno sacuvani');
      // prikazi SUCCESS info i pocisti polja forme
      this.setState({
        status: "SUCCESS",
      })
      let success_msg = 'New tour created!';
      if (mode === "UPDATE") {
        success_msg = "Tour updated!"
      }
      Swal.fire(
        'Success!',
        success_msg,
        'success'
      ).then(() => {
        console.log('then posle swal');
      })
      this._formInit(); // praznimo formu
    }
    let callbackFail = (res) => {
      console.log('...callback u Komponenti nakon "ERROR" post zahteva :(');
      console.log(res);
      if (res && res.data && res.data.status === "error") {
        let errors = {}
        if (res.data.error && res.data.error.errors) {
          errors = res.data.error.errors
          console.log('errors');
          console.log(errors);
        }
        this.setState({
          status: "ERROR",
          statusMessage: res.data.message,
          errors: errors
        })
      }
    }

    if (mode === 'CREATE') {
      this.props.dispatch(createTour(submitData, callbackSuccess, callbackFail));
    } else if (mode === "UPDATE") {
      let id = this.props.match.params.id;
      this.props.dispatch(updateTour(id, submitData, callbackSuccess, callbackFail));
    }

  }

  _formInit(data) {
    // prazni formu ili setuje inicijalne podatke u polja forme
    let mode = this.props.mode;
    if (mode === "CREATE") {
      this.setState({
        errors: {},
        multicheckbox: [],
        locations: [],
        pictures: [],

        category: 'biking',
        name: '',
        summary: '',
        description: '',
        difficulty: 'medium',
        duration: '',
        maxGroupSize: '',
        price: '',
        imageCover: 'tour-3-cover.jpg',

        startGeoUri: '',
        coordinates: [],
        startDescription: "",
        address: "",

        startDate: ''
      })
    } else {
      // mode UPDATE
      console.log('_formInit(data) ');
      console.log(data);
      /*
      startLocation: {type: "Point", description: "pocetni summary...asaasd", coordinates: Array(2), address: "pocetni summary...asaasd"}
    ratingsAverage: 4.5
    ratingsQuantity: 0
    images: []
    startDates: []
    secretTour: false
    guides: (4) ["5c8a23412f8fb814b56fa18c", "5c8a1f292f8fb814b56fa184", "5c8a21d02f8fb814b56fa189", "5c8a22c62f8fb814b56fa18b"]
    _id: "5e1070fc9201e300c8da01d4"
    category: "swimming"
    name: "swimming sicilia"
    summary: "pocetni summary...asaasd"
    description: "pocetni summary...asaasd"
    difficulty: "medium"
    duration: 13
    maxGroupSize: 22
    price: 666
    imageCover: "tour-3-cover.jpg"
    locations: (2) [
    {
      type: "Point"
      coordinates: (2) [15.5841, 38.0654]
      _id: "5e1070fc9201e300c8da01d6"
      address: "Hegelstrasse 6"
      description: "asdasdasd"
      day: 4
    }
    , {…}]
    slug: "swimming-sicilia"
    __v: 0
    durationWeeks: 1.8571428571428572
    reviews: []
    id: "5e1070fc9201e300c8da01d4"
      */

      // popunjavnje locations u formatu koji omogucava brisanje...
      if (data) {
        let newLocations = data.locations.map((item) => {
          let newId = counterUtils.getFreshId()
          let newLocation = {
            id: newId,
            day: item.day,
            address: item.address,
            description: item.description,
            coordinates: item.coordinates
          }
          return newLocation;
        });
        let newPictures = data.images.map((item) => {
          let newId = counterUtils.getFreshId()
          let newPicture = {
            id: newId,
            url: item
          }
          return newPicture
        })
        let startDate = new Date(data.startDates[0]);
        this.setState({
          multicheckbox: [],
          locations: newLocations,
          pictures: newPictures,

          category: data.category,
          name: data.name,
          summary: data.summary,
          description: data.description,
          difficulty: data.difficulty,
          duration: data.duration,
          maxGroupSize: data.maxGroupSize,
          price: data.price,
          imageCover: data.imageCover,

          startGeoUri: '',
          coordinates: data.startLocation.coordinates,
          startDescription: data.startLocation.description,
          address: data.startLocation.address,

          startDate: startDate
        })
        this._global.multicheckbox_state.guides_for_edit = data.guides;
        this._muliticheckboxHelper('GUIDES');
      }
    }
  }


  componentDidMount() {
    let mode = this.props.mode;
    let routeName = 'AP_TOURS_ADD';
    if (mode === 'UPDATE') {
      routeName = 'AP_TOURS_EDIT'
    }
    let thisPageRoute = routingUtils.getRouteData(routeName);
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
    this.props.dispatch(updateCurrentRoute(routeName))

    //
    let cb_users_success = (users) => {
      this._global.multicheckbox_state.users = users;
      this._muliticheckboxHelper('USERS');
    }

    this.props.dispatch(usersNeeded(cb_users_success));
    if (mode === 'UPDATE') {
      let id = this.props.match.params.id;
      this.props.dispatch(singleTourNeeded(id))
    }

  }

  componentDidUpdate(prevProps) {
    if (this.props.state_ceo.shop.tour_advanced !== prevProps.state_ceo.shop.tour_advanced) {
      let tour_advanced = this.props.state_ceo.shop.tour_advanced;
      if (tour_advanced.isFetching === false) {
        // ? TODO: treba bezbedinije da ne bi se stalno izvrsavalo
        this._formInit(tour_advanced.data);
      }
    }
  }



  render() {
    console.log(this.props);
    let mode = this.props.mode;
    let id = 'ID_PLACEHOLDER';
    if (mode === 'UPDATE') {
      id = this.props.match.params.id; // prop match mu salje router u Admin.js
      // console.log('match');
      // console.log(this.props.match);
    }
    console.log('match');
    console.log(this.props.match);



    let jsxStatus = null;
    let status = this.state.status;
    if (status === 'SUCCESS') {
      let success_msg = 'Tour added succcessfully'
      if (mode === "UPDATE") {
        success_msg = "Tour updated successfully"
      }
      jsxStatus = (
        <div className="info-box bg-success">
          <span className="info-box-icon"><i className="far fa-thumbs-up"></i></span>
          <div className="info-box-content">
            <span className="info-box-text">{success_msg}</span>
          </div>
        </div>
      )
    } else if (status === 'ERROR') {
      jsxStatus = (
        <div className="info-box bg-danger">
          <span className="info-box-icon"><i className="far fa-thumbs-down"></i></span>
          <div className="info-box-content">
            <span className="info-box-text">ERROR</span>
            <span className="info-box-text">{this.state.statusMessage}</span>
          </div>
        </div>
      )
    }

    let users = [];
    let usersFetching = this.props.state_ceo.user.users.isFetching;
    if (usersFetching === false) {
      users = this.props.state_ceo.user.users.data;
    }

    let guides = this.state.multicheckbox;
    let jsxOptionsGuides = guides.map((item, index) => {
      /*
      return (
        <option key={item._id} value={item._id}> {item.name}</option >
      )
      */
      let checked = item.checked;
      return (
        <div key={item.value} className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-inputISKLJUCENO"
            value={item.value}
            checked={item.checked}
            onChange={this._handleMultiChecbox}
          />
          <label className="custom-control-labelISKLJUCENo">{item.label}</label>
        </div>
      );
    })


    let cb_delete_location = (id) => {
      console.log('callback delete location ', id);
      let locations = [...this.state.locations]; // pure clone
      let newLocations = locations.filter((item) => {
        if (item.id === id) {
          return false; // delete
        } else {
          return true; // keep
        }
      })
      this.setState({ locations: newLocations })
    }

    let cb_add_location = (newLocation) => {
      console.log('callback add location');
      console.log(newLocation);
      let locations = [...this.state.locations, newLocation];
      this.setState({ locations: locations })
    }

    let jsxLocationsArr = this.state.locations.map((item) => {
      let loc = '???';
      let ll = [item.coordinates[1], item.coordinates[0]];
      if (item.coordinates) {
        loc = item.coordinates[0] + ' ' + item.coordinates[1]
      }
      console.log('loc');
      console.log(item);
      let googleMapURL = geoUtils.createGooleMapsURL(ll)
      let openStreetMapURL = geoUtils.createOpenStreetMapURL(ll, 10)
      let href = openStreetMapURL;
      return (
        <div key={item.id} className={'id_is_' + item.id}><a href={href}>Day: {item.day} , Coordinates: {loc} , ... </a><button
          type="button"
          className="btn btn-outline-danger btn-xs"
          onClick={() => { cb_delete_location(item.id) }}
        ><i className="fas fa-times"></i></button></div>
      )
    })
    let jsxStartLocationLink = null;
    if (this.state.coordinates) {
      let coordinates = this.state.coordinates;
      let startll = [coordinates[1], coordinates[0]];
      if (typeof startll[0] === 'number') {
        let href_start = geoUtils.createOpenStreetMapURL(startll, 10)
        jsxStartLocationLink = (
          <a href={href_start}>Open start location on map</a>
        );
      }
    }
    let jsxLocations = (
      <>
        {jsxStartLocationLink}
        {jsxLocationsArr}
      </>
    );


    let cb_delete_picture = id => {
      console.log('callback delete picture ', id);
      let pictures = [...this.state.pictures]; // pure clone
      let newPictures = pictures.filter((item) => {
        if (item.id === id) {
          return false; // delete
        } else {
          return true; // keep
        }
      })
      this.setState({ pictures: newPictures })
    }

    let cb_add_picture = (newPicture) => {
      console.log('callback add picture');
      console.log(newPicture);
      let pictures = [...this.state.pictures, newPicture];
      this.setState({ pictures: pictures })
      this.setState({ imageCover: pictures[0].url })
    }

    console.log('pictures');
    console.log(this.state.pictures);
    let jsxPictures = this.state.pictures.map((item) => {
      return (
        <div key={item.id} className={'id_is_' + item.id}>Picture name/url: {item.url}
          <button
            type="button"
            className="btn btn-outline-danger btn-xs"
            onClick={() => { cb_delete_picture(item.id) }}
          ><i className="fas fa-times"></i></button>
        </div>
      )
    })

    let submitTitle = "Submit new tour"
    if (mode === 'UPDATE') {
      submitTitle = 'Update tour'
    }


    /*
    {name: {…}, summary: {…}, duration: {…}, maxGroupSize: {…}, price: {…}}
    name: {message: "A tour must have name", name: "ValidatorError", properties: {…}, kind: "required", path: "name", …}
    summary: {message: "A tour must have summary", name: "ValidatorError", properties: {…}, kind: "required", path: "summary", …}
    duration: {message: "A tour must have duration", name: "ValidatorError", properties: {…}, kind: "required", path: "duration", …}
    maxGroupSize: {message: "A tour must have group size", name: "ValidatorError", properties: {…}, kind: "required", path: "maxGroupSize", …}
    price: {message: "A tour must have a price", name: "ValidatorError", properties: {…}, kind: "required", path: "price", …}
    __proto__: Object
    */

    const ERROR_CL = ' is-invalid';
    let errors_cl = {};
    let jsxErrors = {};
    let errors = this.state.errors
    if (errors.name) {
      errors_cl.name = ERROR_CL
      jsxErrors.name = (<span id="exampleInputEmail1-error" className="error invalid-feedback">{errors.name.message}</span>)
    }
    if (errors.summary) {
      errors_cl.summary = ERROR_CL
      jsxErrors.summary = (<span id="exampleInputEmail1-error" className="error invalid-feedback">{errors.summary.message}</span>)
    }
    if (errors.duration) {
      errors_cl.duration = ERROR_CL
      jsxErrors.duration = (<span id="exampleInputEmail1-error" className="error invalid-feedback">{errors.duration.message}</span>)
    }
    if (errors.maxGroupSize) {
      errors_cl.maxGroupSize = ERROR_CL
      jsxErrors.maxGroupSize = (<span id="exampleInputEmail1-error" className="error invalid-feedback">{errors.maxGroupSize.message}</span>)
    }
    if (errors.price) {
      errors_cl.price = ERROR_CL
      jsxErrors.price = (<span id="exampleInputEmail1-error" className="error invalid-feedback">{errors.price.message}</span>)
    }



    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="col-md-12">
            <div className="card card-primary card-outline">
              <div className="card-header">
                <h3 className="card-title"><i className="fas  fa-user-plus"></i> Add tour guide</h3>
              </div>
              <div className="card-body pad table-responsive">

                {jsxStatus}

                <div className='form-group'>
                  <label>Category</label>
                  <select
                    name="category"
                    className="form-control"
                    value={this.state.category}
                    onChange={this.handleInputChange}
                  >
                    <option value="biking">Biking</option>
                    <option value="hiking">Hiking</option>
                    <option value="running">Running</option>
                    <option value="swimming">Swimming</option>
                  </select>
                </div>

                <div className='form-group'>
                  <label>Name</label>
                  <input
                    name="name"
                    type="text"
                    className={"form-control " + errors_cl.name}
                    placeholder="Enter ..."
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                  {jsxErrors.name}
                </div>

                <div className='form-group'>
                  <label>Summary</label>
                  <input
                    name="summary"
                    type="text"
                    className={'form-control ' + errors_cl.summary}
                    placeholder="Enter ..."
                    value={this.state.summary}
                    onChange={this.handleInputChange}
                  />
                  {jsxErrors.summary}

                </div>

                <div className='form-group'>
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="Enter ..."
                    rows="4"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                  />
                </div>

                <div className='form-group'>
                  <label>Difficulty</label>
                  <select
                    name="difficulty"
                    className="form-control"
                    value={this.state.difficulty}
                    onChange={this.handleInputChange}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="difficult">Difficult</option>
                  </select>
                </div>

                <div className='form-group'>
                  <label>Guides</label>

                  {jsxOptionsGuides}

                </div>

                <div className='form-group'>
                  <label>Duration</label>
                  <input
                    name="duration"
                    type="number"
                    className={"form-control " + errors_cl.duration}
                    placeholder="Enter ..."
                    step="1"
                    min="1"
                    max="30"
                    value={this.state.duration}
                    onChange={this.handleInputChange}
                  />
                  {jsxErrors.duration}

                </div>
                <div className='form-group'>
                  <label>Max group size</label>
                  <input
                    name="maxGroupSize"
                    type="number"
                    className={"form-control " + errors_cl.maxGroupSize}
                    placeholder="Enter ..."
                    step="1"
                    min="1"
                    max="30"
                    value={this.state.maxGroupSize}
                    onChange={this.handleInputChange}
                  />
                  {jsxErrors.maxGroupSize}

                </div>

                <div className='form-group'>
                  <label>Price</label>
                  <input
                    name="price"
                    type="number"
                    className={"form-control " + errors_cl.price}
                    placeholder="Enter ..."
                    value={this.state.price}
                    onChange={this.handleInputChange}
                  />
                  {jsxErrors.price}

                </div>

                <div className='form-group'>
                  <label>Start Location Description</label>
                  <textarea
                    name="startDescription"
                    className="form-control"
                    placeholder="Enter ..."
                    rows="3"
                    value={this.state.startDescription}
                    onChange={this.handleInputChange}
                  />
                </div>

                <div className='form-group'>
                  <label>Start Location Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    placeholder="Enter ..."
                    rows="3"
                    value={this.state.address}
                    onChange={this.handleInputChange}
                  />
                </div>



                <div className='form-group'>
                  <label>Start Location Geo URI</label>
                  <input
                    name="startGeoUri"
                    type="text"
                    className="form-control"
                    placeholder="geo:36.2556,-115.3242?z=11"
                    value={this.state.startGeoUri}
                    onChange={this.handleInputChange}
                  />
                  <p>Use <a target="_blank" href="https://www.openstreetmap.org/">www.openstreetmap.org</a> to find desired location and then Share button (in right sidebar) to get Geo URI of desired location.</p>
                </div>


                <h2>Locations</h2>
                {jsxLocations}
                <FormLocation cb={cb_add_location} duration={this.state.duration} />

                <div className='form-group'>
                  <label>Start date (YYYY-MM-DD)</label>
                  <input
                    name="startDate"
                    type="text"
                    className="form-control"
                    placeholder="2020-01-30"
                    value={this.state.startDate}
                    onChange={this.handleInputChange}
                  />
                </div>

              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">{submitTitle}</button>
              </div>

            </div>
          </div>
        </form>

        <h2>Pictures</h2>
        {jsxPictures}
        <FormPicture cb={cb_add_picture} />
      </>
    )
  }
}

// 2021-07-20T09:00:00.000Z

const mapStateToProps = (state) => ({
  state_ceo: state
});

export default connect(mapStateToProps)(AdminToursForm)