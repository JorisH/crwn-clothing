import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./collection.styles.scss";

import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/shop/shop.selectors";

const CollectionPage = () => {

  const { collectionSlug } = useParams();
  const { title, items } = useSelector(selectCollection(collectionSlug));

  return (
    <div className="collection-page">
      <h2 className='title'>{title}</h2>
      <div className="items">
        {
          items
            .map((item) => (
              <CollectionItem key={item.id} item={item} />
            ))
        }
      </div>
    </div>
  )
};

export default CollectionPage;