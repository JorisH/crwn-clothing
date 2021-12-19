import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import './shop.component.styles.scss';
import SHOP_DATA from './shop.data';

const ShopPage = () => {

  const collections = SHOP_DATA;

  return (
    <div className='shop-page'>
      {
        collections.map(({ id, ...otherProps }) => (
          <CollectionPreview key={id} {...otherProps} />
        ))
      }
    </div>
  )
}

export default ShopPage;