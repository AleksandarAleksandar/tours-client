import { createSelector } from 'reselect'
// import { Collection } from 'mongoose'

const selectShop = state => state.shop

const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5
}

export const selectCollections = createSelector(
  [selectShop],
  shop => {
    console.log('test1');
    console.log(shop);
    return shop.collections
  }
);
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => {
    console.log('test');
    console.log(collections);
    return Object.keys(collections).map(key => collections[key])
  }
);

// export const selectCollection = collectionUrlParam =>
//   createSelector(
//     [selectCollections],
//     collections => collections ? collections[collectionUrlParam]
//       : null
//   )
export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  );

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
)

export const selectIsCollectionLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
)