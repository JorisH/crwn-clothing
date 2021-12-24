import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './shop.component.styles.scss';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const ShopPage = () => {

  return (
    <div className='shop-page'>
      <Routes>
        <Route path="/" element={<CollectionsOverview />} />
        <Route path=":collectionSlug" element={<CollectionPage />} />
      </Routes>
    </div>
  )
}

export default ShopPage;