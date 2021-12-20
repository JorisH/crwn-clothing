import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './checkout.styles.scss';

import { selectCartItems, selectTotalPrice } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

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
    </div>
  )
}
export default CheckoutPage;