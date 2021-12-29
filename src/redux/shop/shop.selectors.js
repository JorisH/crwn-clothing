import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const selectShop = state => state.shop;

export const selectCollectionsAsObject = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsAsArray = createSelector(
  [selectCollectionsAsObject],
  collections => collections ? Object.values(collections) : []
)

export const selectCollection = memoize((collectionSlug) => createSelector(
  [selectCollectionsAsObject],
  collections => collections ? collections[collectionSlug] : null
));

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
)