import React, { Component } from 'react'
import geoUtils from '../utils/geo-utils'
import { counterUtils } from './../utils/counter-utils'

export default class FormLocation extends Component {
  constructor(props) {
    super(props)
    let initialId = counterUtils.getFreshId();
    this.state = {
      id: initialId,
      day: '',
      geouri: '',
      address: "",
      description: ''
    };
    // binding this
    this.handleInputChange = this.handleInputChange.bind(this);
    this._add = this._add.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  _add() {
    // umesto submit
    let ll;
    let fixed_coordinates = [];
    if (typeof this.state.geouri === 'string' && this.state.geouri !== '') {
      console.log(this.state.geouri);
      ll = geoUtils.extractL(this.state.geouri);
      console.log(ll);
      fixed_coordinates = [ll[1], ll[0]];
      console.log(fixed_coordinates);
    }
    let newLocation = {
      id: this.state.id,
      day: this.state.day,
      address: this.state.address,
      description: this.state.description,
      coordinates: fixed_coordinates
    }
    let cb = this.props.cb;
    if (typeof cb === 'function') {
      cb(newLocation); // predaje se parent komponenti da upise novu lokaciju
      //  praznimo formu
      let newId = counterUtils.getFreshId();
      this.setState({
        id: newId,
        day: '',
        address: "",
        description: '',
        geouri: ''
      });
    }
  }

  render() {
    /*
        {
          type: {
            type: String,
            default: 'Point',
            enum: ['Point']
          },
          coordinates: [Number],
          address: String,
          description: String,
          day: Number
        }
    */

    let maxDay = 30;
    if (this.props.duration > 1) {
      maxDay = this.props.duration
    }


    return (
      <>
        <div className="subform-location">

          <div className='form-group'>
            <label>Day</label>
            <input
              name="day"
              type="number"
              className="form-control"
              placeholder="Enter ..."
              step="1"
              min="1"
              max={maxDay}
              value={this.state.day}
              onChange={this.handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label>Location Geo URI</label>
            <input
              name="geouri"
              type="text"
              className="form-control"
              placeholder="geo:36.2556,-115.3242?z=11"
              value={this.state.geouri}
              onChange={this.handleInputChange}
            />
            <p>Use <a target="_blank" href="https://www.openstreetmap.org/">www.openstreetmap.org</a> to find desired location and then Share button (in right sidebar) to get Geo URI of desired location.</p>
          </div>

          <div className='form-group'>
            <label>Location Address</label>
            <textarea
              name="address"
              className="form-control"
              placeholder="Enter ..."
              rows="2"
              value={this.state.address}
              onChange={this.handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Enter ..."
              rows="2"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </div>

          <button
            type="button"
            className="btn btn-sm btn-info"
            onClick={this._add}
          ><i className="fas fa-map-marker-alt"></i> Add location</button>

        </div>
      </>
    )
  }
}
