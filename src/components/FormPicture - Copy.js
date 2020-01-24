import React, { Component } from 'react'
import geoUtils from '../utils/geo-utils'
import { counterUtils } from './../utils/counter-utils'
import SpinnerRow from './SpinnerRow'

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

    if (name === 'fileuploadfield') {
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
    let file = this.state.the_file;

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

      var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      var xhr = new XMLHttpRequest();
      var fd = new FormData();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      /*
      // Reset the upload progress bar
      document.getElementById('progress').style.width = 0;

      // Update progress (can be used to show progress indicator)
      xhr.upload.addEventListener("progress", function (e) {
        var progress = Math.round((e.loaded * 100.0) / e.total);
        document.getElementById('progress').style.width = progress + "%";

        console.log(`fileuploadprogress data.loaded: ${e.loaded},
  data.total: ${e.total}`);
      });
      */

      xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
          // File uploaded successfully
          var response = JSON.parse(xhr.responseText);
          // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
          var url = response.secure_url;

          /*
          // Create a thumbnail of the uploaded image, with 150px width
          var tokens = url.split('/');
          tokens.splice(-2, 0, 'w_150,c_scale');
          var img = new Image(); // HTML5 Constructor
          img.src = tokens.join('/');
          img.alt = response.public_id;
          document.getElementById('gallery').appendChild(img);
          */

          console.log('FINISHED');
          console.log(url);
          _cb_on_complete(url);

        }
      };

      fd.append('upload_preset', unsignedUploadPreset);
      fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
      fd.append('file', file);
      xhr.send(fd);
    } // end of uploadFile


    uploadFile(file)
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
                name="fileuploadfield"
                accept="image/png, image/jpeg"
                id="avatar"
                className="form-control"
              />
            </div>

            <div className='form-group'>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={this._upload}
              ><i class="fas fa-cloud-upload-alt"></i> Upload</button>

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
          ><i class="far fa-image"></i> Add picture</button>

        </div >
      </>
    )
  }
}
