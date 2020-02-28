import React from 'react'
import Breadcrumbs from './../components/Breadcrumbs'
import { toursNeeded } from './../redux/shop/shop-actions'
import { contactUs } from './../redux/user/user-actions'
import { routingUtils } from './../utils/routing-utils'
import { updateBrowserTitle } from './../redux/global/global-actions'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'


class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      fullName: '',
      message: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(toursNeeded())
    let thisPageRoute = routingUtils.getRouteData('CONTACT');
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    let submitData = {
      email: this.state.email,
      fullName: this.state.fullName,
      message: this.state.message
    }
    let callbackSuccess = (response) => {
      this.setState({
        status: "SUCCESS",
      })
      Swal.fire(
        'Success!',
        'Message sent successfully',
        'success'
      ).then(() => {
      })
      this.setState({
        email: '',
        fullName: '',
        message: ''
      })
    }

    let cb_error = (response) => {
      let message = 'Unknown error. Mail not sent!';
      if (response && response.data && response.data.message) {
        message = response.data.message;
      }

      Swal.fire(
        'Error!',
        message,
        'error'
      ).then(() => {
      })
    }

    this.props.dispatch(contactUs(submitData, callbackSuccess, cb_error));
  }


  render() {

    let thisPageRoute = routingUtils.getRouteData('CONTACT');
    let breadcrumbs = thisPageRoute.breadcrumbs;
    let activeRoute = thisPageRoute.routeName;


    return (
      <div className="shop-page">

        <section className="section">
          <div className="inner">
            <div className="breadcrumbs-regular clearfix">
              <Breadcrumbs breadcrumbs={breadcrumbs} activeRoute={activeRoute} />
            </div>
            <h1>Contact us</h1>
            <div className="cetegories-dashboard">

              <div className="contact-form-wrapper">
                <div className="material-ui-form contact-form">


                  <TextField
                    id="outlined-helperText"
                    label="Your name"
                    // helperText="First and last name"
                    variant="outlined"
                    value={this.state.fullName}
                    onChange={this.handleInputChange}
                    name="fullName"
                  />

                  <TextField
                    id="outlined-helperText"
                    label="Your email"
                    // helperText="We will answer on this email"
                    variant="outlined"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    name="email"
                  />

                  <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows="4"
                    variant="outlined"
                    value={this.state.message}
                    onChange={this.handleInputChange}
                    name="message"
                  />

                  <Button
                    variant="contained"
                    endIcon={<i className="fas fa-paper-plane"></i>}
                    onClick={this.handleSubmit}
                  >Send</Button>

                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    )
  }
}

export default Contact
