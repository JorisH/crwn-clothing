import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {

  const { cartItems } = useSelector(state => ({
    cartItems: selectCartItems(state)
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

