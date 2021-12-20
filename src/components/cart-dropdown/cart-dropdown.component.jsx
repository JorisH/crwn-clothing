import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import './cart-dropdown.styles.scss';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';

const CartDropdown = () => {

  const { cartItems } = useSelector(createStructuredSelector({
    cartItems: selectCartItems
  }));

  const navigate = useNavigate();

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {
          cartItems.length ? (
            cartItems.map(cartItem => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
          ) : <span className='empty-message'>Your cart is empty</span>
        }
      </div>
      <CustomButton onClick={() => navigate('/checkout')}>GO TO CHECKOUT</CustomButton>
    </div>
  );
}

export default CartDropdown;

