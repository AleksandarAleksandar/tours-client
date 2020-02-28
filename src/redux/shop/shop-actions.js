import ShopActionTypes from './shop-types'
import { ajaxGet, ajaxPost, ajaxPatch, ajaxDelete } from '../../utils/ajax-abstraction'
import { apiLib } from '../../utils/api-lib'

export const toursfetchSucces = data => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: data
})

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
})
export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

export const fetchSingleTourStart = (id) => ({
  type: ShopActionTypes.FETCH_SINGLE_TOUR_START,
  payload: {
    key: id
  }
})
export const fetchSingleTourSuccess = (collectionsMap, id) => ({
  type: ShopActionTypes.FETCH_SINGLE_TOUR_SUCCESS,
  payload: {
    key: id,
    data: collectionsMap
  }
})
export const fetchSingleTourFailure = collectionsMap => ({
  type: ShopActionTypes.FETCH_SINGLE_TOUR_FAILURE
})

export const fetchTourStatsStart = () => ({
  type: ShopActionTypes.FETCH_TOUR_STATS_START
})
export const fetchTourStatsSuccess = (data) => ({
  type: ShopActionTypes.FETCH_TOUR_STATS_SUCCESS,
  payload: data
})
export const fetchTourStatsFailure = () => ({
  type: ShopActionTypes.FETCH_TOUR_STATS_FAILURE
})

export const fetchReviewsStart = () => ({
  type: ShopActionTypes.FETCH_REVIEWS_START
})
export const fetchReviewsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_REVIEWS_SUCCESS,
  payload: collectionsMap
})
export const fetchReviewsFailure = () => ({
  type: ShopActionTypes.FETCH_REVIEWS_FAILURE
})

export const fetchBookingsStart = () => ({
  type: ShopActionTypes.FETCH_BOOKINGS_START
})
export const fetchBookingsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_BOOKINGS_SUCCESS,
  payload: collectionsMap
})
export const fetchBookingsFailure = () => ({
  type: ShopActionTypes.FETCH_BOOKINGS_FAILURE
})

export const fetchOrdersStart = () => ({
  type: ShopActionTypes.FETCH_ORDERS_START
})
export const fetchOrdersSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_ORDERS_SUCCESS,
  payload: collectionsMap
})
export const fetchOrdersFailure = () => ({
  type: ShopActionTypes.FETCH_ORDERS_FAILURE
})



export const toursNeeded = () => {
  return (dispatch) => {
    dispatch(fetchCollectionsStart());
    ajaxGet(apiLib.apiToursGet())
      .then((response) => {
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          dispatch(fetchCollectionsSuccess(pripremljeni_podaci_za_state))
        } else {
          dispatch(fetchCollectionsFailure())
        }
      })
  }
}
export const singleTourNeeded = (id, cb) => {
  return (dispatch) => {
    dispatch(fetchSingleTourStart(id));
    ajaxGet(apiLib.apiSingleTourGet(id))
      .then((response) => {
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          dispatch(fetchSingleTourSuccess(pripremljeni_podaci_za_state, id))
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state)
          }
        } else {
          dispatch(fetchSingleTourFailure())
        }
      })
  }
}

export const tourStatsNeeded = (cb) => {
  return (dispatch) => {
    dispatch(fetchTourStatsStart());
    ajaxGet(apiLib.apiTourStats())
      .then((response) => {
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data.data.stats;
          dispatch(fetchTourStatsSuccess(pripremljeni_podaci_za_state))
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state)
          }
        } else {
          dispatch(fetchTourStatsFailure())
        }
      })
  }
}


export const reviewsNeeded = (id) => {
  return (dispatch) => {
    dispatch(fetchReviewsStart());
    ajaxGet(apiLib.apiGetReviews(id))
      .then((response) => {
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          dispatch(fetchReviewsSuccess(pripremljeni_podaci_za_state))
        } else {
          dispatch(fetchReviewsFailure())
        }
      })
  }

}

export const reviewCreate = (data, cb, cb_error) => {
  return (dispatch) => {
    ajaxPost(apiLib.apiCreateReview(), data, cb_error)
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          let pripremljeni_podaci_za_state = response.data.status;
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
        } else {
        }
      })
  }

}

export const createTour = (data, cb, cb_error) => {
  return (dispatch) => {
    ajaxPost(apiLib.apiTourCreate(), data, cb_error)
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          let pripremljeni_podaci_za_state = response.data.status;
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
        } else {
          if (typeof cb_error === 'function') {
            cb_error(response);
          }
        }
      })
  }
}
export const paymentStripe = (data, cb, cb_error) => {
  return (dispatch) => {
    ajaxPost(apiLib.apiPaymentStripe(), data, cb_error)
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          let pripremljeni_podaci_za_state = response.data;
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
        } else {
          if (typeof cb_error === 'function') {
            cb_error(response);
          }
        }
      })
  }
}

export const paymentPaypal = (data, cb, cb_error) => {
  return (dispatch) => {
    ajaxPost(apiLib.apiPaymentPaypal(), data, cb_error)
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          let pripremljeni_podaci_za_state = response.data;
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
        } else {
          if (typeof cb_error === 'function') {
            cb_error(response);
          }
        }
      })
  }
}



export const updateTour = (id, data, cb, cb_error) => {
  return (dispatch) => {
    ajaxPatch(apiLib.apiTourUpdate(id), data, cb_error)
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          let pripremljeni_podaci_za_state = response.data.status;
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
        } else {
          if (typeof cb_error === 'function') {
            cb_error(response);
          }
        }
      })
  }
}

export const deleteTour = (id, cb, cb_error) => {
  return (dispatch) => {
    ajaxDelete(apiLib.apiTourDelete(id))
      .then((response) => {
        if (response && response.status && response.status === 204) {
          if (typeof cb === 'function') {
            cb();
          }
        } else {
          if (typeof cb_error === 'function') {
            cb_error(response);
          }
        }
      })
  }
}

export const bookingsNeeded = () => {
  return (dispatch) => {
    dispatch(fetchBookingsStart());
    ajaxGet(apiLib.apiGetBookings())
      .then((response) => {
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          dispatch(fetchBookingsSuccess(pripremljeni_podaci_za_state))
        } else {
          dispatch(fetchBookingsFailure())
        }
      })
  }

}
export const ordersNeeded = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    ajaxGet(apiLib.apiGetOrders())
      .then((response) => {
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          dispatch(fetchOrdersSuccess(pripremljeni_podaci_za_state))
        } else {
          dispatch(fetchOrdersFailure())
        }

      })
  }
}