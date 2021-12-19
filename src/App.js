import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './page/homepage/homepage.component';
import ShopPage from './page/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './page/sing-in-and-sign-up/sing-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

const App = () => { 

  const dispatch = useDispatch();

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

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/signin' element={<SignInAndSignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
