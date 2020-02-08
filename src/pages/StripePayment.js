import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

function StripePayment() {
  const price = 999;
  const priceForStripe = price;
  const publishableKey = 'pk_test_uwo2ixsEAZeoQqmFkHcEAW9O00CYR7upAk';
  const onToken = async token => {
    console.log(token);
    const session = await axios(
      `http://127.0.0.1:3002/api/v1/bookings/checkout-session/5c88fa8cf4afda39709c2955`
    )
    console.log(session);
    alert('Payment successfull')

  }
  return (
    <StripeCheckout
      label="Pay now"
      name="Tours"
      biilingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay now'
      token={onToken}
      stripeKey={publishableKey}

    />
  )
}
export default StripePayment
