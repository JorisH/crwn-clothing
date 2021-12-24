import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const selectShop = state => state.shop;

export const selectCollectionsAsObject = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsAsArray = createSelector(
  [selectCollectionsAsObject],
  collections => Object.values(collections)
)

export const selectCollection = memoize((collectionSlug) => createSelector(
  [selectCollectionsAsObject],
  collections => collections[collectionSlug]
));