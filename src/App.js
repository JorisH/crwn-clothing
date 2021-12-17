import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './page/homepage/homepage.component';
import './App.css';
import ShopPage from './page/shoppage/shop.component';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
      </Routes>
    </div>
  );
}

export default App;
