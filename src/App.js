import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import HomePage from './page/homepage/homepage.component';
import ShopPage from './page/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './page/sing-in-and-sign-up/sing-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import CheckoutPage from './page/checkout/checkout.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

const App = () => {

  const dispatch = useDispatch();
  
  const { currentUser } = useSelector(createStructuredSelector({
    currentUser: selectCurrentUser    
  }));

  React.useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) { // sign in        
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          dispatch(setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          }));
        })
      } else { // sign out
        dispatch(setCurrentUser(null));
      }
    });

    return (() => {
      unsubscribeFromAuth();
    });
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
