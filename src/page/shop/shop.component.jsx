import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './shop.component.styles.scss';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import withSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

const ShopPage = () => {

  const { isLoading } = useSelector(createStructuredSelector({
    isLoading: selectIsCollectionFetching
  }));

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCollectionsStartAsync());
  }, [dispatch]);

  return (
    <div className='shop-page'>
      <Routes>
        <Route path="/" element={<CollectionsOverviewWithSpinner isLoading={isLoading} />} />
        <Route path=":collectionSlug" element={<CollectionPageWithSpinner isLoading={isLoading} />} />
      </Routes>
    </div>
  )
}

export default ShopPage;