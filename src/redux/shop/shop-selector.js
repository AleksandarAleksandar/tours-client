import { createSelector } from 'reselect'

const selectShop = state => state.shop

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
)
export const selectTours = createSelector(
  [selectShop],
  shop => shop.tours_items
)
export const selectTour = createSelector(
  [selectShop],
  shop => shop.tour_item
)
export const selectCategories = createSelector(
  [selectShop],
  shop => shop.categories
)
export const selectTourAdvanced = createSelector(
  [selectShop],
  shop => shop.tour_advanced
)
export const selectStats = createSelector(
  [selectShop],
  shop => shop.stats
)
export const selectReviews = createSelector(
  [selectShop],
  shop => shop.reviews
)
export const selectBookings = createSelector(
  [selectShop],
  shop => shop.bookings
)
export const selectOrders = createSelector(
  [selectShop],
  shop => shop.orders
)
// export const selectIsCollectionLoaded = createSelector(
//   [selectShop],
//   shop => !!shop.collections
// )