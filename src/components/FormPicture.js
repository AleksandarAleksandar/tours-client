import React, { Component } from 'react'
import geoUtils from '../utils/geo-utils'
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
      console.log('*********************');
      console.log(event.target);
      this.setState({ the_file: event.target.files[0] });
    }
  }



  _add() {
    // umesto submit
    let newPicture = {
      id: this.state.id,
      url: this.state.url
    }
    let cb = this.props.cb;
    if (typeof cb === 'function') {
      cb(newPicture); // predaje se parent komponenti da upise novu lokaciju
      //  praznimo formu
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
    console.log('upload');
    // let file = this.state.the_file;

    let _cb_on_complete = (url) => {
      this.setState({
        isFetching: false,
        url: url
      })
    }

    // sSTEP 1
    this.setState({
      isFetching: true,
      url: ''
    })


    const cloudName = 'elukas';
    const unsignedUploadPreset = 'testUpload';

    // *********** Upload file to Cloudinary ******************** //
    function uploadFile(file) {

      const cloudName = 'tbaustin';
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const timestamp = Date.now() / 1000;
      const uploadPreset = 'cnh7rzwp';

      let formData = new FormData();
      formData.append("api_key", '');
      formData.append("file", file);
      formData.append("public_id", "sample_image");
      formData.append("timestamp", timestamp);
      formData.append("upload_preset", uploadPreset);

      axios.post(url, formData)
        .then((result) => {
          console.log('AXIOS UPLOAD SUCCESS :)');
          console.log(result);

          console.log('FINISHED');
          let url = result.data.secure_url;
          console.log(url);
          _cb_on_complete(url);
        })
        .catch((err) => {
          console.log(err);
        })



    }


    let the_file = this.state.the_file;
    uploadFile(the_file)
  }



  render() {
    /*
    images: [String],
    
    "images": ["tour-2-1.jpg", "tour-2-2.jpg", "tour-2-3.jpg"],
    */
    let jsxSpinner = null;
    if (this.state.isFetching === true) {
      jsxSpinner = <SpinnerRow />
    }

    return (
      <>
        <div className="subform-picture">

          <form method="post" enctype="multipart/form-data">

            <div className='form-group'>
              <label>Choose file o upload</label>
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
            type="button"
            className="btn btn-sm btn-info"
            onClick={this._add}
          ><i className="far fa-image"></i> Add picture</button>

        </div >
      </>
    )
  }
}

/*
{
"public_id":"sample_image",
"version":1579261196,
"signature":"e4c2a1608e6f297c7d957aa48ae60b3da4c5f505",
"width":297,
"height":297,
"format":"png",
"resource_type":"image",
"created_at":"2020-01-17T11:39:56Z",
"tags":[

],
"bytes":81489,
"type":"upload",
"etag":"32b0331ad8eef6cef2d4b731ea0d7304",
"placeholder":false,
"url":"http://res.cloudinary.com/tbaustin/image/upload/v1579261196/sample_image.png",
"secure_url":"https://res.cloudinary.com/tbaustin/image/upload/v1579261196/sample_image.png",
"existing":false,
"original_filename":"logo-green-round"
}
*/