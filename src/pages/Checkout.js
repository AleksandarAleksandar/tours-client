import React, { useEffect, useState, useReducer, setInputs } from 'react'
import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'
import { routingUtils } from './../utils/routing-utils'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createOrder } from './../redux/shop/shop-actions'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import StripePayment from './StripePayment'
import Paypal from './../components/Paypal'

// import { selectCartItems, selectCartTotal } from '../redux/cart/cart-selectors'

import CheckoutItem from '../components/CheckoutItem'
// import StripeCheckoutButton from '../components/StripeButton'
import Breadcrumbs from '../components/Breadcrumbs'
import { updateBrowserTitle } from './../redux/global/global-actions'
import { Link } from 'react-router-dom'
import { formatUtils } from './../utils/format-utils'
import Swal from 'sweetalert2'


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
  // onChange={ (e) => { mDispatch('BITCOIN') } }
  // mState.paypal

  //dodao useReducer da handluje input change. Zasto mora da se salje objekat sa username: '' itd kada moze da se kreira properti kada se unese input?

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

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInputValues({ [name]: value });
  };
  console.log('hello');
  console.log(inputValues);



  // const [state, setState] = useState({})
  // let handleInputChange = (event) => {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;
  //   console.log('opalio');


  //   setState({
  //     [name]: value
  //   });
  // }


  //   const handleInputChange = (event) => {
  //   event.persist();
  //   setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  //   console.log('opalio');

  // }

  useEffect(() => {
    // isto sto i componentDidMount()
    let thisPageRoute = routingUtils.getRouteData('CHECKOUT');
    // browserUtils.updateTitle(thisPageRoute.browserTitle)
    props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
  }, [])

  let thisPageRoute = routingUtils.getRouteData('CHECKOUT');
  let breadcrumbs = thisPageRoute.breadcrumbs;
  let activeRoute = thisPageRoute.routeName;


  let items = props.state_ceo.cart.cartItems; // itemsi iz carta koji na backendu moraj uda se upisu u tabelu 
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


  const onToken = token => {
    console.log(token);
    /*
    // primer koda koji koristi samo jedan item pri kupovini
    const id = '5c88fa8cf4afda39709c2955'
    props.dispatch(createOrder({ amount: price, tourId: id, token }))
    */
    // axios({
    //   url: `http://127.0.0.1:3002/api/v1/bookings/checkout-session/5c88fa8cf4afda39709c2955`,
    //   method: 'post',
    //   data: {
    //     amount: price,
    //     token
    //   }
    //   }).then(response => {
    //     alert('success')
    //     console.log(token, response);
    //   }).catch(error => {
    //     alert('unsuccessfull')
    //     console.log(error);
    //   })

    // NOVO kod koji koristi ceo array itema iz carta
    let items = props.state_ceo.cart.cartItems; // itemsi iz carta koji na backendu moraj uda se upisu u tabelu OrderItems odnosno bookings...
    console.log(items);
    let total = 0;
    let tours = [];
    let jsxCartItems = items.forEach((item) => {
      // return <CheckoutItem key={item.id} cartItem={item} />
      total += item.price * item.quantity;
      tours.push(item.id); // popunjava array sam osa ID-ovima od tura...yyy
    })

    let submitData = {
      amount: total,
      tours: tours,
      token
    }
    console.log(submitData)

    props.dispatch(createOrder(submitData))
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('submit');
    // const id = '5c88fa8cf4afda39709c2955'
    // // props.dispatch(bookTour(id))
    // try{
    // const session = await axios(`http://127.0.0.1:3002/api/v1/bookings/checkout-session/${id}`)
    // console.log(session);
    // await
    // }catch (err) {
    //   console.log(err);

    // }
    // onToken = async token => {
    //   console.log(token);
    // let session = await axios({
    //   method: 'GET',
    //   url: `http://localhost:3002/api/v1/bookings/checkout-session/5c88fa8cf4afda39709c2955`
    // })
    // console.log(session);
    // alert('Payment successfull')
    // }
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
      // console.log('then posle swal');
    })
  }

  let jsxFeedback;

  const transactionError = data => {
    console.log(data);

  }
  const transactionCanceled = data => {
    console.log(data);

  }
  const transactionSuccess = (data) => {

    let items = props.state_ceo.cart.cartItems; // itemsi iz carta koji na backendu moraj uda se upisu u tabelu OrderItems odnosno bookings...
    // console.log(items);
    let total = 0;
    let tours = [];
    let jsxCartItems = items.forEach((item) => {
      // return <CheckoutItem key={item.id} cartItem={item} />
      total += item.price * item.quantity;
      tours.push(item.id); // popunjava array sam osa ID-ovima od tura...yyy
    })

    let submitData = {
      amount: total,
      tours: tours,
      data
    }
    console.log(submitData);
    axios.post(`http://localhost:3002/api/v1/users/successbuy`, submitData).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }


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
                  <div className="item"><span>Subtotal </span><b>{subtotalDisplay}</b></div>
                  <div className="item"><span>Tax </span><b>{taxDisplay}</b></div>
                  <div className="item separator"></div>
                  <div className="item total"><span>Order total: </span><b>{totalDisplay}</b></div>
                </div>

                {/* <div className="add-to-cart-group">
                  <Link to={'/checkout'} className="btn btn-add-cart"><i className="fas fa-cart-plus"></i>Checkout</Link>
                </div> */}

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
                        value={inputValues.fullName}
                        onChange={handleInputChange}
                        name="fullName"
                      />

                      <TextField
                        id="outlined-helperText"
                        label="Your email"
                        defaultValue=""
                        helperText="We will answer on this email"
                        variant="outlined"
                        value={inputValues.email}
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
                        value={inputValues.message}
                        onChange={handleInputChange}
                        name="message"
                      />

                      <Button
                        variant="contained"
                        endIcon={<i className="fas fa-paper-plane"></i>}

                      >Send</Button>

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
                    <FormControlLabel value="PAYPAL" control={<Radio />} label="Pay with PayPal" checked={mState.paypal} />


                    <Paypal
                      toPay={total}
                      transactionError={(data) => transactionError(data)}
                      transactionCanceled={(data) => transactionCanceled(data)}
                      onSuccess={(data) => transactionSuccess(data)}
                    />

                    {jsxFeedback}

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
                              defaultValue="1111222233334444"
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
                              defaultValue="123"
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
                              defaultValue="MARKO MARKOVIC"
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

const mapStateToProps = state => ({
  state_ceo: state
})
export default connect(mapStateToProps)(Checkout)
