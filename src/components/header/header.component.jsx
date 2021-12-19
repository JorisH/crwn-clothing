import React from 'react';
import './header.styles.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { useSelector } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = () => {

  const { currentUser, cartHidden } = useSelector(state => ({
    currentUser: state.user.currentUser,
    cartHidden: state.cart.hidden
  }));

  return (
    <div className='header'>
      <Link className='logo-container' to="/"><Logo className='logo' /></Link>
      <div className='options'>
        <Link className='option' to="/shop">SHOP</Link>
        <Link className='option' to="/contact">CONTACT</Link>
        {
          currentUser ?
            <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
            : <Link className='option' to="/signin">SIGN IN</Link>
        }        
        <CartIcon />
      </div>
      { cartHidden ? null : <CartDropdown /> }
    </div>
  )
};

export default Header;
