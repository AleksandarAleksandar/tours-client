import SHOP_DATA from './shop.data'
import ShopActionTypes from './shop-types'
import axios from 'axios'


let categories = {
  "running": {
    title: "RUNNING"
  },
  "hiking": {
    title: "HIKING"
  },
  "swimming": { title: "SWIMMING" },
  "biking": { title: "BIKING" }
}

const INITIAL_STATE = {
  collections: SHOP_DATA,
  isFetching: false,
  test_podatak: 'OVO JE TEST',
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
  }
}


// const shopReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };


const shopReducer = (state = INITIAL_STATE, action) => {
  let new_reviews;

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
        collections: action.payload,
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
          key: 'tu treba action.payload.key',
          key: action.payload.id,
          data: {}
        },
      }
    case ShopActionTypes.FETCH_SINGLE_TOUR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tour_item: action.payload.data,
        blabla: 'nista',
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
    default:
      return state
  }
}
export default shopReducer