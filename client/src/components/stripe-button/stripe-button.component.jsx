import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const stripeAmount = price * 100;
  const stripeKey = "pk_test_51KABQSCG0E5ZDPs2tAeLKFaMzalOoroBmmnjPp4Cp4iToyxw3GHewHToOkUJOCKu049J1YFkA0ffQWc8RxhYvewi00qW91be60"
  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: stripeAmount,
        token
      }
    }).then(response => {
      alert(("Payment successful"));
    }).catch(error => {
      console.log("Payment error: ", JSON.parse(error));
      alert(
        "There was an issue with your payment. Please make sure you use the provided credit card."
      );
    });
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