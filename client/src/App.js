import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.scss';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./page/homepage/homepage.component'));
const ShopPage = lazy(() => import('./page/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./page/sing-in-and-sign-up/sing-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./page/checkout/checkout.component'));

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
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/shop/*' element={<ShopPage />} />
            <Route path='/signin' element={<SignInOrNavigateToHome />} />
            <Route path='/checkout' element={<CheckoutPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
