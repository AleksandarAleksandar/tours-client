import { userActionTypes } from './user-types'
import { apiLib } from '../../utils/api-lib'
import { ajaxGet, ajaxPost, ajaxPatch } from '../../utils/ajax-abstraction'
import { authUtils } from './../../utils/auth-utils'
import geoUtils from '../../utils/geo-utils'



export const loginSuccess = (data) => {
  return (dispatch) => {
    dispatch({
      type: userActionTypes.LOGIN_SUCCESS,
      payload: data
    });
  }
}


export const loginFailure = () => ({
  type: userActionTypes.LOGIN_FAILURE
})

export const autologinSuccess = (data) => {
  return (dispatch) => {
    dispatch({
      type: userActionTypes.AUTOLOGIN_SUCCESS,
      payload: data
    });
  }
}

export const autologinFailure = () => ({
  type: userActionTypes.AUTOLOGIN_FAILURE
})

export const logoutSuccess = () => ({
  type: userActionTypes.LOGOUT_SUCCESS
})

export const logoutFailure = () => ({
  type: userActionTypes.LOGOUT_FAILURE
})


export const fetchUsersStart = () => ({
  type: userActionTypes.FETCH_USERS_START
})
export const fetchUsersSuccess = collectionsMap => ({
  type: userActionTypes.FETCH_USERS_SUCCESS,
  payload: collectionsMap
})
export const fetchUsersFailure = collectionsMap => ({
  type: userActionTypes.FETCH_USERS_FAILURE
})

export const setCurrentUser = user => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user
})



export const usersNeeded = (cb) => {
  return (dispatch) => {
    dispatch(fetchUsersStart());
    ajaxGet(apiLib.apiGetUsers())
      .then((response) => {
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          dispatch(fetchUsersSuccess(pripremljeni_podaci_za_state))
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state)
          }
        } else {
          dispatch(fetchUsersFailure())
        }
      })
  }

}



export const login = (data, cb, cb_error) => {
  return (dispatch) => {
    ajaxPost(apiLib.apiLogin(), data, cb_error)
      .then((response) => {
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data; 
          dispatch(loginSuccess(pripremljeni_podaci_za_state));
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
        } else {
        }
      })
  }
}

export const autologin = (cb, cb_error) => {
  return (dispatch) => {
    ajaxGet(apiLib.apiAutologin())
      .then((response) => {
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data.data.user;
          dispatch(autologinSuccess(pripremljeni_podaci_za_state));
        } else {
          dispatch(autologinFailure())
        }
      })
      .catch((response) => {
        if (response && response.status === 'fail') {
        }
        dispatch(autologinFailure())
      });
  }

}


export const logout = (cb, cb_error) => {
  return (dispatch) => {
    ajaxGet(apiLib.apiLogout())
      .then((response) => {
        if (response && response.data && response.data.status === 'success') {
          dispatch(logoutSuccess())
          if (typeof cb === 'function') {
            cb(response);
          }
        } else {
          dispatch(logoutFailure());
        }
      })
  }
}


export const register = (data, cb, cb_error) => {
  return (dispatch) => {
    ajaxPost(apiLib.apiRegister(), data, cb_error)
      .then((response) => {
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data.data;
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
          dispatch(registerSubmitSuccess(pripremljeni_podaci_za_state))
        } else {
        }
      });
  }
}

export const registerSubmitSuccess = (data) => {
  return (dispatch) => {
    dispatch({
      type: 'REGISTER_SUBMIT_SUCCESS',
      payload: data
    })
  }
}

export const passwordChange = (data, cb, cb_error) => {
  return (dispatch) => {
    ajaxPatch(apiLib.apiPasswordChange(), data, cb_error)
      .then((response) => {
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data;
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
        } else {
        }
      });
  }
}

export const passwordForgot = (data, cb, cb_error) => {
  return (dispatch) => {
    ajaxPost(apiLib.apiPasswordForgot(), data, cb_error)
      .then((response) => {
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data;
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
        } else {
        }
      });
  }
}


export const passwordReset = (data, cb, cb_error, token) => {
  return (dispatch) => {
    ajaxPatch(apiLib.apiPasswordReset(token), data, cb_error)
      .then((response) => {
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data;
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
        } else {
        }
      });
  }
}


export const detectMyLocation = () => {
  return (dispatch) => {
    dispatch({ type: '*** INFOlocation detection' });
    let cb = (position) => {
      if (position === false) {
        dispatch({
          type: 'USER_LOCATION_DETECTION_NOT_POSSIBLE'
        });
      } else {
        if (position.coords && typeof position.coords.latitude === 'number' && typeof position.coords.longitude === 'number') {
          let ll = [position.coords.latitude, position.coords.longitude]
          dispatch({
            type: 'USER_LOCATION_DETECTED',
            payload: ll
          })
        } else {
          dispatch({
            type: 'USER_LOCATION_DETECTION_NOT_POSSIBLE'
          });
        }
      }
    }
    geoUtils.getMyLocation(cb);
  }
}


export const contactUs = (data, cb, cb_error) => {
  return (dispatch) => {
    dispatch({ type: '*** INFO sending email' });
    ajaxPost(apiLib.apiContactUs(), data, cb_error)
      .then((response) => {
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data;
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state);
          }
        } else {
        }
      })
  }
}
