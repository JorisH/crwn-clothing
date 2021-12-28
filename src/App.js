import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './page/homepage/homepage.component';
import ShopPage from './page/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './page/sing-in-and-sign-up/sing-in-and-sign-up.component';
import CheckoutPage from './page/checkout/checkout.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

const App = () => {

  const { currentUser } = useSelector(createStructuredSelector({
    currentUser: selectCurrentUser
  }));

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  const SignInOrNavigateToHome = () => (
    currentUser ? <Navigate to="/" /> : <SignInAndSignUpPage />
  );

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop/*' element={<ShopPage />} />
        <Route path='/signin' element={<SignInOrNavigateToHome />} />
        <Route path='/checkout' element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
