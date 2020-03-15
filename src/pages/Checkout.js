import React, { useEffect, useState, useReducer } from 'react'
import { connect } from 'react-redux'
import { routingUtils } from './../utils/routing-utils'
import StripeCheckout from 'react-stripe-checkout'
import { Link, Redirect } from 'react-router-dom'
import { paymentStripe, paymentPaypal } from './../redux/shop/shop-actions'
import { emptyCart } from '../redux/cart/cart-actions'
import { selectCartItems } from './../redux/cart/cart-selectors'
import { createStructuredSelector } from 'reselect'
import Breadcrumbs from '../components/Breadcrumbs'
import { updateBrowserTitle } from './../redux/global/global-actions'
import { formatUtils } from './../utils/format-utils'
import Swal from 'sweetalert2'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const Checkout = (props) => {
  let jsxRedirect = null;
  const [needRedirect, setNeedRedirect] = useState(false)
  const [savedAddress, setSavedAddress] = useState('MY')
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
  const mInitial = {
    paypal: false,
    card: false,
    bitcon: false,
    stripe: false
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
      case 'STRIPE':
        return {
          ...mInitial, stripe: true
        }
      default:
        return state
    }
  }
  const [mState, mDispatch] = useReducer(mReducer, mInitial)
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {}
  );
  let cl_card = '';
  if (mState.card !== true) {
    cl_card = ' hide'
  }
  let cl_stripe = ''
  if (mState.stripe !== true) {
    cl_stripe = ' hide'
  }
  let cl_paypal = ''
  if (mState.paypal !== true) {
    cl_paypal = ' hide'
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInputValues({ [name]: value });
  };

  useEffect(() => {
    let thisPageRoute = routingUtils.getRouteData('CHECKOUT');
    props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
  }, [])

  let thisPageRoute = routingUtils.getRouteData('CHECKOUT');
  let breadcrumbs = thisPageRoute.breadcrumbs;
  let activeRoute = thisPageRoute.routeName;


  let items = props.cartItems; 
  if (!Array.isArray(items)) {
    items = [];
  }
  let subtotal = 0;
  items.forEach((item) => {
    subtotal += (item.price * item.quantity)
  })
  let subtotalDisplay = formatUtils.formatPrice(subtotal, '€')
  let tax = 0;
  let taxDisplay = formatUtils.formatPrice(tax, '€')
  let total = subtotal + tax;
  let totalDisplay = formatUtils.formatPrice(total, '€');


  let cb_order_success = (response) => {
    Swal.fire(
      'Payment successfull!',
      'You will receive receipt on your emaill',
      'success'
    ).then(() => {
      setNeedRedirect(true)
    })
    props.dispatch(emptyCart())
  }
  if (needRedirect === true) {
    jsxRedirect = (
      <Redirect to="/profile" />
    );
  }

  const onToken = token => {
    let items = props.cartItems; 
    console.log(items);
    let total = 0;
    let tours = [];
    let jsxCartItems = items.forEach((item) => {
      total += item.price * item.quantity;
      tours.push(item.id); 
    })
    let submitData = {
      amount: total,
      tours: tours,
      token
    }
    props.dispatch(paymentStripe(submitData, cb_order_success))
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
  }
  const publishableKey = 'pk_test_uwo2ixsEAZeoQqmFkHcEAW9O00CYR7upAk';
  let counter = 0;
  let jsxTableRows = items.map((item) => {
    counter++;
    let tourid = item.tour;
    return (
      <tr key={item._id} data-tour-id={item._id}>
        <td>{counter}</td>
        <td><Link to={'/product/' + tourid}>{item.name}</Link></td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
      </tr>
    )
  })

  let payWithCardMessage = () => {
    Swal.fire(
      'Error!',
      'Card payment functionality not available at the moment, please use Stripe instead',
      'error'
    ).then(() => {
    })
  }

  const handlePaypalTransaction = () => {
    let items = props.cartItems; 
    let total = 0;
    let tours = [];
    let jsxCartItems = items.forEach((item) => {
      total += item.price * item.quantity;
      tours.push(item.id);
    })
    let submitData = {
      amount: total,
      tours: tours
    }
    let cb_order_success = response => {
      let redirectUrl = response.redirectUrl;
      window.open(redirectUrl, '_blank');
    }
    props.dispatch(paymentPaypal(submitData, cb_order_success))
  }

  return (
    <>
      {jsxRedirect}
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
                </div>

                <h2>Order Summary</h2>

                <div className="checkout-summary-items">
                  <div className="item"><span>Subtotal </span><b>{subtotalDisplay}</b></div>
                  <div className="item"><span>Tax </span><b>{taxDisplay}</b></div>
                  <div className="item separator"></div>
                  <div className="item total"><span>Order total: </span><b>{totalDisplay}</b></div>
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
                        label="Full name"
                        defaultValue=""
                        helperText="First and last name"
                        variant="outlined"
                        value={inputValues.fullName}
                        onChange={handleInputChange}
                        name="fullName"
                      />

                      <TextField
                        id="outlined-helperText"
                        label="Your street name and house number"
                        defaultValue=""
                        helperText="Address"
                        variant="outlined"
                        value={inputValues.address}
                        onChange={handleInputChange}
                        name="address"
                      />

                      <TextField
                        id="outlined-helperText"
                        label="Town/City"
                        defaultValue=""
                        helperText="Town"
                        variant="outlined"
                        value={inputValues.town}
                        onChange={handleInputChange}
                        name="town"
                      />

                      <TextField
                        id="outlined-helperText"
                        label="Postcode"
                        defaultValue=""
                        helperText="Postcode"
                        variant="outlined"
                        value={inputValues.postcode}
                        onChange={handleInputChange}
                        name="postcode"
                      />

                      <TextField
                        id="outlined-helperText"
                        label="Country"
                        defaultValue=""
                        helperText="Country"
                        variant="outlined"
                        value={inputValues.country}
                        onChange={handleInputChange}
                        name="country"
                      />

                    </div>
                  </div>


                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={inputValues.saveaddress} onChange={handleInputChange} value="saveaddress" />}
                      label="Save address for future use"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={inputValues.makedefault} onChange={handleInputChange} value="makedefault" />}
                      label="Make this my default address"
                    />
                  </FormGroup>
                </div>

              </section>

              <section className="section step-section">
                <h2>2. Order Review</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tour name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {jsxTableRows}
                  </tbody>
                </table>
              </section>

              <section className="section step-section">
                <h2>3. Payment Method</h2>

                <FormControl component="fieldset">
                  <RadioGroup name="billingAdress" value={'my'} onChange={(e) => { mDispatch(e.target.value) }}>
                    <FormControlLabel value="PAYPAL" disabled={false} control={<Radio />} label="Pay with PayPal" checked={mState.paypal} />

                    <div className={'payment-form-paypal-wrapper ' + cl_paypal}>
                      {/* <Paypal
                        toPay={total}
                        transactionError={(data) => transactionError(data)}
                        transactionCanceled={(data) => transactionCanceled(data)}
                        onSuccess={(data) => transactionSuccess(data)}
                      /> */}

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handlePaypalTransaction}
                      ><i class="fab fa-cc-paypal"></i>
                      </Button >
                    </div>

                    <FormControlLabel value="STRIPE" control={<Radio />} label="Pay with Stripe" checked={mState.stripe} />

                    <div className={'payment-form-stripe-wrapper ' + cl_stripe}>
                      <p>NOTE: Please use following information to test payment functionality: <br />
                        card number: 4242 4242 4242 4242 <br />
                        date: any future date<br />
                        cvc: any
                      </p>
                      <StripeCheckout
                        label="Pay now"
                        name="Tours"
                        biilingAddress
                        shippingAddress
                        description={`Your total is $${total}`}
                        amount={total * 100}
                        panelLabel='Pay now'
                        token={onToken}
                        stripeKey={publishableKey}
                      />
                    </div>

                    <FormControlLabel value="BITCOIN" control={<Radio disabled />} label="Pay with Bitcoin" checked={mState.bitcon} />
                    <FormControlLabel value="CARD" control={<Radio />} label="Pay with credit card" checked={mState.card} />

                    <div className={'payment-form-card-wrapper ' + cl_card}>
                      <form onSubmit={handleSubmit}>
                        <div className="material-ui-form payment-form form-items">
                          <div className="item col-1-1">
                            <TextField
                              id="outlined-helperText"
                              label="Card number"
                              defaultValue=""
                              helperText=""
                              variant="outlined"
                              value={inputValues.cardnumber}
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
                              value={inputValues.cardmm}
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
                              value={inputValues.cardyy}
                              onChange={handleInputChange}
                              name="cardyy"
                            />
                          </div>
                          <div className="item col-1-4">
                            <TextField
                              id="outlined-helperText"
                              type="number"
                              label="CVV"
                              defaultValue=""
                              helperText=""
                              variant="outlined"
                              value={inputValues.cardcvv}
                              onChange={handleInputChange}
                              name="cardcvv"
                            />
                          </div>
                          <div className="item col-1-1">
                            <TextField
                              id="outlined-helperText"
                              label="Full name"
                              defaultValue=""
                              helperText="Name (as it appears on your card)"
                              variant="outlined"
                              value={inputValues.cardname}
                              onChange={handleInputChange}
                              name="cardname"
                            />
                          </div>
                          <div className="item col-1-1">
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              onClick={payWithCardMessage}
                            >Pay</Button >
                          </div>
                        </div>
                      </form>
                    </div>

                  </RadioGroup>
                </FormControl>

              </section>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});
export default connect(mapStateToProps)(Checkout)
