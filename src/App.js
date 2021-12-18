import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './page/homepage/homepage.component';
import ShopPage from './page/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './page/sing-in-and-sign-up/sing-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

const App = () => {

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) { // sign in        
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        })
      } else { // sign out
        setUser(null);
      }
    });

    return (() => {
      unsubscribeFromAuth();
    });
  }, []);

  return (
    <div>
      <Header user={user} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/signin' element={<SignInAndSignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
