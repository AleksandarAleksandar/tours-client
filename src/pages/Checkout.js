import React, { useEffect, useState, useReducer } from 'react'
import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'
import { routingUtils } from './../utils/routing-utils'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

// import { selectCartItems, selectCartTotal } from '../redux/cart/cart-selectors'

import CheckoutItem from '../components/CheckoutItem'
// import StripeCheckoutButton from '../components/StripeButton'
import Breadcrumbs from '../components/Breadcrumbs'
import { updateBrowserTitle } from './../redux/global/global-actions'
import { Link } from 'react-router-dom'
import { formatUtils } from './../utils/format-utils'

const Checkout = (props) => {

  /*
    componentDidMount() {
      // this.props.dispatch(toursNeeded())
      console.log('did mount Cart page');
      console.log(this.props);
  
      let thisPageRoute = routingUtils.getRouteData('CART');
      // browserUtils.updateTitle(thisPageRoute.browserTitle)
      this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
    }
  */
  // let breadcrumbs = []
  const [savedAddress, setSavedAddress] = useState('NEW')
  let toggleAddressForm = (event) => {
    setSavedAddress(event.target.value);
  }
  let savedAddressChecked = false;
  if (savedAddress === 'MY') {
    savedAddressChecked = true;
  }
  let cl_saved = "";
  if (savedAddressChecked === true) {
    cl_saved = "hide"
  }

  /*
  const [paymentMethod, setPaymentMethod] = useState('CARD')
  let paymentChecked = {
    paypal: false,
    card: true,
    bitcon: false
  }
  if (paymentMethod === 'PAYPAL') {
    paymentChecked = {
      paypal: true,
      card: false,
      bitcon: false
    }
  } else if (paymentMethod === 'BITCOIN') {
    paymentChecked = {
      paypal: false,
      card: false,
      bitcon: true
    }
  }
  */



  const mInitial = {
    paypal: false,
    card: false,
    bitcon: false
  }
  const mReducer = (state, action) => {
    switch (action) {
      case 'PAYPAL':
        return {
          ...mInitial, paypal: true
        }
      case 'CARD':
        return {
          ...mInitial, card: true
        }
      case 'BITCOIN':
        return {
          ...mInitial, bitcon: true
        }
      default:
        return state
    }
  }
  const [mState, mDispatch] = useReducer(mReducer, mInitial)
  // onChange={ (e) => { mDispatch('BITCOIN') } }
  // mState.paypal




  const [state, setState] = useState({})
  let handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setState({
      [name]: value
    });
  }


  useEffect(() => {
    // isto sto i componentDidMount()
    let thisPageRoute = routingUtils.getRouteData('CHECKOUT');
    // browserUtils.updateTitle(thisPageRoute.browserTitle)
    props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
  }, [])

  let thisPageRoute = routingUtils.getRouteData('CHECKOUT');
  let breadcrumbs = thisPageRoute.breadcrumbs;
  let activeRoute = thisPageRoute.routeName;

  let subtotal = formatUtils.formatPrice(800, '€')
  let tax = formatUtils.formatPrice(200, '€')
  let totalPrice = formatUtils.formatPrice(1000, '€');

  return (
    <>
      <div className="checkout-page">

        <section className="section">
          <div className="inner">

            <div className="breadcrumbs-regular clearfix">
              <Breadcrumbs breadcrumbs={breadcrumbs} activeRoute={activeRoute} />
            </div>
            <h1 className="text-left">Checkout</h1>

          </div>
        </section>

        <div className="inner">
          <div className="checkout-sections">

            <div className="checkout-sidebar">
              <section className="section section-summary">

                <div className='items cart-items grid-items'>
                  {/* {jsxCartItems}
              {jsxSpinner} */}
                </div>

                <h2>Order Summary</h2>

                <div className="checkout-summary-items">
                  <div className="item"><span>Subtotal </span><b>{subtotal}</b></div>
                  <div className="item"><span>Tax </span><b>{tax}</b></div>
                  <div className="item separator"></div>
                  <div className="item total"><span>Order total: </span><b>{totalPrice}</b></div>
                </div>

                <div className="add-to-cart-group">
                  <Link to={'/checkout'} className="btn btn-add-cart"><i className="fas fa-cart-plus"></i>Checkout</Link>
                </div>

              </section>
            </div>

            <div className="checkout-steps">
              <section className="section step-section">
                <h2>1. Billing Address</h2>
                <div className="billing-address-options">
                  <FormControl component="fieldset">
                    <RadioGroup name="billingAdress" value={'my'} onChange={toggleAddressForm}>
                      <FormControlLabel value="MY" control={<Radio />} label="Use my billing address" checked={savedAddressChecked} />
                      <span className="my-saved-address">My previous adress... placeholder....</span>
                      <FormControlLabel value="NEW" control={<Radio />} label="Use different billing address" checked={!savedAddressChecked} />
                    </RadioGroup>
                  </FormControl>

                  <div className={'billing-address-form-wrapper ' + cl_saved}>
                    <div className="material-ui-form billing-address-form">

                      <TextField
                        id="outlined-helperText"
                        label="Your name"
                        defaultValue=""
                        helperText="First and last name"
                        variant="outlined"
                        value={state.fullName}
                        onChange={handleInputChange}
                        name="fullName"
                      />

                      <TextField
                        id="outlined-helperText"
                        label="Your email"
                        defaultValue=""
                        helperText="We will answer on this email"
                        variant="outlined"
                        value={state.email}
                        onChange={handleInputChange}
                        name="email"
                      />

                      <TextField
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        rows="4"
                        defaultValue=""
                        variant="outlined"
                        value={state.message}
                        onChange={handleInputChange}
                        name="message"
                      />

                      <Button
                        variant="contained"
                        endIcon={<i class="fas fa-paper-plane"></i>}
                      >Send</Button>

                    </div>
                  </div>


                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={state.saveaddress} onChange={handleInputChange} value="saveaddress" />}
                      label="Save address for future use"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={state.makedefault} onChange={handleInputChange} value="makedefault" />}
                      label="Make this my default address"
                    />
                  </FormGroup>
                </div>

              </section>

              <section className="section step-section">
                <h2>2. ...</h2>
              </section>

              <section className="section step-section">
                <h2>3. Payment Method</h2>

                <FormControl component="fieldset">
                  <RadioGroup name="billingAdress" value={'my'} onChange={(e) => { mDispatch(e.target.value) }}>
                    <FormControlLabel value="PAYPAL" control={<Radio />} label="Pay with PayPal" checked={mState.paypal} />
                    <FormControlLabel value="BITCOIN" control={<Radio />} label="Pay with Bitcoin" checked={mState.bitcon} />
                    <FormControlLabel value="CARD" control={<Radio />} label="Pay with credit card" checked={mState.card} />
                  </RadioGroup>
                </FormControl>

                <div className={'payment-form-wrapper ' + cl_saved}>
                  <div className="material-ui-form payment-form form-items">

                    <div className="item col-1-1">
                      <TextField
                        id="outlined-helperText"
                        label="Card number"
                        defaultValue="1111222233334444"
                        helperText=""
                        variant="outlined"
                        value={state.cardnumber}
                        onChange={handleInputChange}
                        name="cardnumber"
                      />
                    </div>
                    <div className="item col-1-6">
                      <TextField
                        id="outlined-helperText"
                        type="number"
                        label="MM"
                        defaultValue=""
                        helperText="Expiry month"
                        variant="outlined"
                        value={state.cardmm}
                        onChange={handleInputChange}
                        name="cardmm"
                      />
                    </div>
                    <div className="item col-1-6">
                      <TextField
                        id="outlined-helperText"
                        type="number"
                        label="YY"
                        defaultValue=""
                        helperText="Expiry year"
                        variant="outlined"
                        value={state.cardyy}
                        onChange={handleInputChange}
                        name="cardyy"
                      />
                    </div>
                    <div className="item col-1-4">
                      <TextField
                        id="outlined-helperText"
                        type="number"
                        label="CVV"
                        defaultValue="123"
                        helperText=""
                        variant="outlined"
                        value={state.cardcvv}
                        onChange={handleInputChange}
                        name="cardcvv"
                      />
                    </div>
                    <div className="item col-1-1">
                      <TextField
                        id="outlined-helperText"
                        label="Full name"
                        defaultValue="MARKO MARKOVIC"
                        helperText="Name (as it appears on your card)"
                        variant="outlined"
                        value={state.cardname}
                        onChange={handleInputChange}
                        name="cardname"
                      />
                    </div>
                    <div className="item col-1-1">
                      <Button
                        variant="contained"
                        color="primary"
                      >Pay</Button>
                    </div>

                  </div>
                </div>


              </section>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  state_ceo: state
})
export default connect(mapStateToProps)(Checkout)
