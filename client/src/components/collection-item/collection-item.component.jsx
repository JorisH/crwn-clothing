import React from 'react';
import { useDispatch } from 'react-redux';

import './collection-item.styles.scss'

import { addItem } from '../../redux/cart/cart.actions';
import CustomButton from '../custom-button/custom-button.component';

const CollectionItem = ({ item }) => {

  const { name, price, imageUrl } = item;
  const dispatch = useDispatch();

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>&euro;{price}</span>
      </div>
      <CustomButton inverted onClick={() => dispatch(addItem(item))}>Add to cart</CustomButton>
    </div>
  )
}

export default CollectionItem;