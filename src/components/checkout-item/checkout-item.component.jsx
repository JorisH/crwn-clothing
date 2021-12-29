import React from 'react';
import { useDispatch } from 'react-redux';

import './checkout-item.styles.scss';

import { clearItemFromCart, removeItem, addItem } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ item }) => {

  const { name, imageUrl, price, quantity } = item;
  const dispatch = useDispatch();

  return (
    <div className="checkout-item">
      <div className='image-container'>
        <img alt='item' src={imageUrl} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={() => dispatch(removeItem(item))}>&#10096;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => dispatch(addItem(item))}>&#10097;</div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={() => dispatch(clearItemFromCart(item))}>&#10005;</div>
    </div>
  )
}

export default CheckoutItem;