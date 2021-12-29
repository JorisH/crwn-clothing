import React from "react";
import { useSelector } from "react-redux";

import "./collections-overview.scss";

import { selectCollectionsAsArray } from "../../redux/shop/shop.selectors";
import CollectionPreview from "../collection-preview/collection-preview.component";

const CollectionsOverview = () => {

  const collections = useSelector(selectCollectionsAsArray);

  return (
    <div className="collections-overview">
      {
        collections.map(({ id, ...otherProps }) => (
          <CollectionPreview key={id} {...otherProps} />
        ))
      }
    </div>
  )
}

export default CollectionsOverview;