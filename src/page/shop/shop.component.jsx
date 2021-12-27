import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './shop.component.styles.scss';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import withSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

const ShopPage = () => {

  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useDispatch();

  React.useEffect(() => {    
    const collectionRef = firestore.collection('collections');
    const unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(updateCollections(collectionsMap));
      setIsLoading(false);
    });

    return (() => {
        unsubscribeFromSnapshot()
    });
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