import ShopActionTypes from './shop-types'
import convertCollectionsSnapshotToMap from './../../utils/convertCollectionsSnapshotToMap'
import axios from 'axios'
import { ajaxGet, ajaxPost, ajaxPatch, ajaxDelete } from '../../utils/ajax-abstraction'

import { apiLib } from '../../utils/api-lib'

// const API_URL_GET_TOURS = 'api/v1/tours';


/*
// nasa prva fetch funkcija koja direktno poziva axios ajax....
export const myFetchStartFirst = () => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    dispatch(fetchCollectionsStart);
    // step 2: odmah zapocinjemo fetchovanje asinhtono
    // nekiFetchAsync()
    axios.get(apiLib.apiToursGet())
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        dispatch(fetchCollectionsSuccess(response))
      })
  }
}
*/


// a ova je isto to ali ce da poziva nas abstraktni metod koji ne mora da bude axios...



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

// export const fetchCollectionsStartAsync = () => {
//   return dispatch => {
//     const collectionRef = firestore.collection('collections')
//     dispatch(fetchCollectionsStart())

//     collectionRef.get().then(async snapshot => {
//       const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
//       dispatch(fetchCollectionsSuccess(collectionsMap))
//     }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
//   }
// }
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
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    dispatch(fetchCollectionsStart());
    // step 2: odmah zapocinjemo fetchovanje asinhtono
    // nekiFetchAsync()
    ajaxGet(apiLib.apiToursGet())
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase fetchovanje je zavrseno')
        console.log(response);
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          dispatch(fetchCollectionsSuccess(pripremljeni_podaci_za_state))
        } else {
          dispatch(fetchCollectionsFailure())
        }

      })

    // ajaxPost(API_URL_GET_TOURS)
  }
}
export const singleTourNeeded = (id, cb) => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    dispatch(fetchSingleTourStart(id));
    // step 2: odmah zapocinjemo fetchovanje asinhtono
    // nekiFetchAsync()
    ajaxGet(apiLib.apiSingleTourGet(id))
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase fetchovanje je zavrseno')
        console.log(response);
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

    // ajaxPost(API_URL_GET_TOURS)
  }
}

export const tourStatsNeeded = (cb) => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    dispatch(fetchTourStatsStart());
    // step 2: odmah zapocinjemo fetchovanje asinhtono
    // nekiFetchAsync()
    ajaxGet(apiLib.apiTourStats())
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase fetchovanje je zavrseno')
        console.log(response);

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

    // ajaxPost(API_URL_GET_TOURS)
  }
}


export const reviewsNeeded = (id) => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    dispatch(fetchReviewsStart());
    // step 2: odmah zapocinjemo fetchovanje asinhtono
    // nekiFetchAsync()
    ajaxGet(apiLib.apiGetReviews(id))
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase fetchovanje je zavrseno')
        console.log(response);
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          dispatch(fetchReviewsSuccess(pripremljeni_podaci_za_state))
        } else {
          dispatch(fetchReviewsFailure())
        }

      })

    // ajaxPost(API_URL_GET_TOURS)
  }

}

export const reviewCreate = (data, cb, cb_error) => {
  return (dispatch) => {
    ajaxPost(apiLib.apiCreateReview(), data, cb_error)
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nas post request je zavrsen')
        console.log(response);
        if (response && response.data && response.data.status === "success") {
          // let pripremljeni_podaci_za_state = response.data.data;
          let pripremljeni_podaci_za_state = response.data.status;
          // dispatch(fetchReviewsSuccess(pripremljeni_podaci_za_state))
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
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nas post request je zavrsen')
        console.log(response);
        if (response && response.data && response.data.status === "success") {
          // let pripremljeni_podaci_za_state = response.data.data;
          let pripremljeni_podaci_za_state = response.data.status;
          // dispatch(fetchReviewsSuccess(pripremljeni_podaci_za_state))
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
        } else {
          // dispatch(fetchReviewsFailure())
          console.log('post request ERROR!!!');
          if (typeof cb_error === 'function') {
            cb_error(response);
          }
        }
      })
  }
}
export const createOrder = (data, cb, cb_error) => {
  return (dispatch) => {
    console.log('test create order ');
    console.log(data);
    ajaxPost(apiLib.apiCreateOrder(), data, cb_error)
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nas post request je zavrsen')

        console.log(response);
        if (response && response.data && response.data.status === "success") {
          // let pripremljeni_podaci_za_state = response.data.data;
          let pripremljeni_podaci_za_state = response.data.status;
          // dispatch(fetchReviewsSuccess(pripremljeni_podaci_za_state))
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
        } else {
          // dispatch(fetchReviewsFailure())
          console.log('post request ERROR!!!');
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
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nas PATCH request je zavrsen')
        console.log(response);
        if (response && response.data && response.data.status === "success") {
          // let pripremljeni_podaci_za_state = response.data.data;
          let pripremljeni_podaci_za_state = response.data.status;
          // dispatch(fetchReviewsSuccess(pripremljeni_podaci_za_state))
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
        } else {
          // dispatch(fetchReviewsFailure())
          console.log('post request ERROR!!!');
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
        // fetchovanje je zavrseno i uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nas DELETE request je zavrsen')
        console.log(response);
        if (response && response.status && response.status === 204) {
          if (typeof cb === 'function') {
            cb();
          }
        } else {
          // dispatch(fetchReviewsFailure())
          console.log('DELETE request ERROR!!!');
          if (typeof cb_error === 'function') {
            cb_error(response);
          }
        }

      })
  }
}

export const bookingsNeeded = () => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    dispatch(fetchBookingsStart());
    // step 2: odmah zapocinjemo fetchovanje asinhtono
    // nekiFetchAsync()
    ajaxGet(apiLib.apiGetBookings())
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase fetchovanje je zavrseno')
        console.log(response);
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          dispatch(fetchBookingsSuccess(pripremljeni_podaci_za_state))
        } else {
          dispatch(fetchBookingsFailure())
        }

      })

    // ajaxPost(API_URL_GET_TOURS)
  }

}
export const ordersNeeded = () => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    dispatch(fetchOrdersStart());
    // step 2: odmah zapocinjemo fetchovanje asinhtono
    // nekiFetchAsync()
    ajaxGet(apiLib.apiGetOrders())
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase fetchovanje je zavrseno')
        console.log(response);
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          dispatch(fetchOrdersSuccess(pripremljeni_podaci_za_state))
        } else {
          dispatch(fetchOrdersFailure())
        }

      })

    // ajaxPost(API_URL_GET_TOURS)
  }

}