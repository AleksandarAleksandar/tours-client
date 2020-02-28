import ShopActionTypes from './shop-types'

let categories = {
  "running": { title: "RUNNING" },
  "hiking": { title: "HIKING" },
  "swimming": { title: "SWIMMING" },
  "biking": { title: "BIKING" }
}

const INITIAL_STATE = {
  isFetching: false,
  tours_items: [],
  errorMessage: undefined,
  categories: categories,
  reviews: {
    isFetching: false,
    data: []
  },
  stats: {
    isFetching: false,
    data: []
  },
  bookings: {
    isFetching: false,
    data: []
  },
  orders: {
    isFetching: false,
    data: []
  }
}


const shopReducer = (state = INITIAL_STATE, action) => {
  let new_reviews, new_bookings, new_orders;

  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true
      }
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tours_items: action.payload
      }
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }

    case ShopActionTypes.FETCH_TOUR_STATS_START:
      return {
        ...state,
        stats: {
          isFetching: true,
          data: []
        }
      }
    case ShopActionTypes.FETCH_TOUR_STATS_SUCCESS:
      return {
        ...state,
        stats: {
          isFetching: false,
          data: action.payload
        }
      }
    case ShopActionTypes.FETCH_TOUR_STATS_FAILURE:
      return {
        ...state,
        stats: {
          isFetching: false,
          data: []
        }
      }

    case ShopActionTypes.FETCH_REVIEWS_START:
      new_reviews = {
        isFetching: true,
        data: state.reviews.data
      }
      return {
        ...state,
        reviews: new_reviews
      }

    case ShopActionTypes.FETCH_REVIEWS_SUCCESS:
      new_reviews = {
        isFetching: false,
        data: action.payload
      }
      return {
        ...state,
        reviews: new_reviews
      }

    case ShopActionTypes.FETCH_REVIEWS_FAILURE:
      new_reviews = {
        isFetching: false,
        data: []
      }
      return {
        ...state,
        reviews: new_reviews
      }

    case ShopActionTypes.FETCH_SINGLE_TOUR_START:
      return {
        ...state,
        isFetching: true,
        tour_advanced: {
          isFetching: true,
          key: action.payload.id,
          data: {}
        },
      }
    case ShopActionTypes.FETCH_SINGLE_TOUR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tour_item: action.payload.data,
        tour_advanced: {
          isFetching: false,
          key: action.payload.id,
          data: action.payload.data
        },
        opet_paylaod: action.payload
      }
    case ShopActionTypes.FETCH_SINGLE_TOUR_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }

    case ShopActionTypes.FETCH_BOOKINGS_START:
      new_bookings = {
        isFetching: true,
        data: state.bookings.data
      }
      return {
        ...state,
        bookings: new_bookings
      }

    case ShopActionTypes.FETCH_BOOKINGS_SUCCESS:
      new_bookings = {
        isFetching: false,
        data: action.payload
      }
      return {
        ...state,
        bookings: new_bookings
      }

    case ShopActionTypes.FETCH_BOOKINGS_FAILURE:
      new_bookings = {
        isFetching: false,
        data: []
      }
      return {
        ...state,
        bookings: new_bookings
      }

    case ShopActionTypes.FETCH_ORDERS_START:
      new_orders = {
        isFetching: true,
        data: state.bookings.data
      }
      return {
        ...state,
        orders: new_orders
      }

    case ShopActionTypes.FETCH_ORDERS_SUCCESS:
      new_orders = {
        isFetching: false,
        data: action.payload
      }
      return {
        ...state,
        orders: new_orders
      }

    case ShopActionTypes.FETCH_ORDERS_FAILURE:
      new_orders = {
        isFetching: false,
        data: []
      }
      return {
        ...state,
        orders: new_orders
      }
    default:
      return state
  }
}
export default shopReducer
