import React from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./collections-overview.scss";

import { selectCollections } from "../../redux/shop/shop.selectors";
import CollectionPreview from "../collection-preview/collection-preview.component";

const CollectionsOverview = () => {

  const { collections } = useSelector(createStructuredSelector({
    collections: selectCollections
  }));

  return (
    <div className="collections-overview">
      {
        Object.values(collections).map(({ id, ...otherProps }) => (
          <CollectionPreview key={id} {...otherProps} />
        ))
      }
    </div>
  )
}

export default CollectionsOverview;