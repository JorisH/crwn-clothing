import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './shop.component.styles.scss';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import Spinner from '../../components/spinner/spinner.component';

const CollectionPageContainer = lazy(() => import('../collection/collection.container'));
const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));

const ShopPage = () => {  

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCollectionsStart());
  }, [dispatch]);

  return (
    <div className='shop-page'>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<CollectionsOverviewContainer />} />
          <Route path=":collectionSlug" element={<CollectionPageContainer />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default ShopPage;