import React from "react"
import StripeCheckout from "react-stripe-checkout"

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_51Hf4dqH8eW7KtDamwn1WqdwHnfrpx1QhvC3qkvxySJ3rStzU3nSe4Ta2bHGM2mTNXiRWnYDJEJn2JrdFv03MRfwa001yuZ2x5m";

  const onToken = token => {
    console.log(token)
    alert("Payment Successful")
  }

  return (
    <StripeCheckout 
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton