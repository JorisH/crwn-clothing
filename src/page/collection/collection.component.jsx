import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/shop/shop.selectors";

import "./collection.styles.scss";

const CollectionPage = () => {

  const { collectionSlug } = useParams();

  const { collection: { title, items} } = useSelector(createStructuredSelector({
    collection: selectCollection(collectionSlug)
  }));

  

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