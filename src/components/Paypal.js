import React, { Component } from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout'

class Paypal extends Component {
  render() {

    const onSuccess = (payment) => {
      console.log(JSON.stringify(payment));
      this.props.onSuccess(payment)

    }
    const onCancel = (data) => {
      console.log(JSON.stringify(data));

    }
    const onError = error => {
      console.log(JSON.stringify(error));

    }
    let env = 'sandbox'
    let currency = 'EUR'
    let total = this.props.toPay

    const client = {
      sandbox: 'AbZW3vnO6nwWzTQwFF6mELBr-aQR52kdg3hyoBipCx4eB4F2EIZzLzYmR_rI4aHJ4PxNPju95L2C96u5',
      production: ''
    }

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: 'small',
            color: 'blue',
            shape: 'pill',
            label: 'checkout'
          }}
        />
      </div>
    )
  }
}
export default Paypal
