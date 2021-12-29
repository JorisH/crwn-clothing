import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss'

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { signOutStart } from '../../redux/user/user.actions';

const Header = () => {

  const currentUser = useSelector(selectCurrentUser);
  const cartHidden = useSelector(selectCartHidden);
  const dispatch = useDispatch();

  return (
    <div className='header'>
      <Link className='logo-container' to="/"><Logo className='logo' /></Link>
      <div className='options'>
        <Link className='option' to="/shop">SHOP</Link>
        <Link className='option' to="/contact">CONTACT</Link>
        {
          currentUser ?
            <div className='option' onClick={() => dispatch(signOutStart())}>SIGN OUT</div>
            : <Link className='option' to="/signin">SIGN IN</Link>
        }
        <CartIcon />
      </div>
      {cartHidden ? null : <CartDropdown />}
    </div>
  )
};

export default Header;
