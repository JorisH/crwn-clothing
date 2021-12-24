import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './checkout.styles.scss';

import { selectCartItems, selectTotalPrice } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

const CheckoutPage = () => {

  const { cartItems, totalPrice } = useSelector(createStructuredSelector({
    cartItems: selectCartItems,
    totalPrice: selectTotalPrice
  }))

  return (
    <div className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {
        cartItems.map(item => <CheckoutItem key={item.id} item={item} />)
      }
      <div className='total'>TOTAL: ${totalPrice}</div>
      <div className='test-warning'>
        *Please use the following test credit card for payments*
        <br />
        VISA: 4242 4242 4242 4242 | MASTERCARD: 5555 5555 5555 4444
        <br />
        Expiry date: any future date - CVC: any 3 digits
      </div>

      <StripeCheckoutButton price={totalPrice} />
    </div>
  )
}
export default CheckoutPage;