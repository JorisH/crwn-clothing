import React from "react";
import StripeCheckout from "react-stripe-checkout"

const StripeCheckoutButton = ({ price }) => {
  const stripeAmount = price * 100;
  const stripeKey = "pk_test_51KABQSCG0E5ZDPs2tAeLKFaMzalOoroBmmnjPp4Cp4iToyxw3GHewHToOkUJOCKu049J1YFkA0ffQWc8RxhYvewi00qW91be60"
  const onToken = (token) => {
    alert("Payment Succesful");
    console.log(token)
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={stripeAmount}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={stripeKey}
    />
  );
}

export default StripeCheckoutButton;