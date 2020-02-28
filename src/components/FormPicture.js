import React, { Component } from 'react'
import { counterUtils } from './../utils/counter-utils'
import SpinnerRow from './SpinnerRow'
import axios from 'axios'

export default class FormPicture extends Component {
  constructor(props) {
    super(props)
    let initialId = counterUtils.getFreshId();
    this.state = {
      id: initialId,
      isFetching: false,
      data: {},
      url: ''
    };
    // binding this
    this.handleInputChange = this.handleInputChange.bind(this);
    this._add = this._add.bind(this);
    this._upload = this._upload.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if (name === 'thefile') {
      this.setState({ the_file: event.target.files[0] });
    }
  }

  _add() {
    let newPicture = {
      id: this.state.id,
      url: this.state.url
    }
    let cb = this.props.cb;
    if (typeof cb === 'function') {
      cb(newPicture); 
      let newId = counterUtils.getFreshId();
      this.setState({
        id: newId,
        isFetching: false,
        data: {},
        url: ''
      });
    }
  }

  _upload() {
    let _cb_on_complete = (url) => {
      this.setState({
        isFetching: false,
        url: url
      })
    }
    this.setState({
      isFetching: true,
      url: ''
    })


    // *********** Upload file to Cloudinary ******************** //
    function uploadFile(file) {
      const cloudName = 'dcimz9cam';
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const timestamp = Date.now() / 1000;
      const uploadPreset = 'mbpsrnvj';

      let formData = new FormData();
      formData.append("api_key", '211348262474915');
      formData.append("file", file);
      formData.append("public_id", file.name);
      formData.append("timestamp", timestamp);
      formData.append("upload_preset", uploadPreset);

      axios.post(url, formData)
        .then((result) => {
          let url = result.data.secure_url;
          _cb_on_complete(url);
        })
        .catch((err) => {
        })
    }
    let the_file = this.state.the_file;
    uploadFile(the_file)
  }

  render() {
    let jsxSpinner = null;
    if (this.state.isFetching === true) {
      jsxSpinner = <SpinnerRow />
    }
    let addIsDisabled = false;
    if (!this.state.url || this.state.url === '') {
      addIsDisabled = true;
    }
    let uploadIsDisabled = true;
    if (this.state.the_file) {
      uploadIsDisabled = false
    } else {
      addIsDisabled = true;
    }
    return (
      <>
        <div className="subform-picture">

          <form method="post" encType="multipart/form-data">

            <div className='form-group'>
              <label>Choose file to upload</label>
              <input
                type="file"
                name="thefile"
                accept="image/png, image/jpg, image/jpeg"
                id="avatar"
                className="form-control"
                onChange={this.handleInputChange}
              />
            </div>

            <div className='form-group'>
              <button
                disabled={uploadIsDisabled}
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={this._upload}
              ><i className="fas fa-cloud-upload-alt"></i> Upload</button>

              {jsxSpinner}
            </div>

          </form>

          <div className='form-group'>
            <label>Picture name/url</label>
            <input
              name="url"
              type="text"
              className="form-control"
              placeholder="tour-2-3.jpg"
              value={this.state.url}
              onChange={this.handleInputChange}
            />
          </div>

          <p>...</p>

          <button
            disabled={addIsDisabled}
            type="button"
            className="btn btn-sm btn-info"
            onClick={this._add}
          ><i className="far fa-image"></i> Add picture</button>

        </div >
      </>
    )
  }
}