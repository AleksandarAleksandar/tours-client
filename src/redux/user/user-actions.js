import { userActionTypes } from './user-types'
import { apiLib } from '../../utils/api-lib'
import { ajaxGet, ajaxPost, ajaxPatch } from '../../utils/ajax-abstraction'
import { authUtils } from './../../utils/auth-utils'
import geoUtils from '../../utils/geo-utils'

/*
TODO:
posle uspesnog logina
{ 
   "status":"success",
   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDQ5MzdmMGJjNDdiMWYyODUyMmM1MCIsImlhdCI6MTU3ODMxNDUxMSwiZXhwIjoxNTg2MDkwNTExfQ.uQSeycPTECQnUUEu1-pzU8j0MS1pryiOblEhs_8Zcxw",
   "data":{ 
      "user":{ 
         "role":"admin",
         "_id":"5e04937f0bc47b1f28522c50",
         "name":"ale",
         "email":"aleksandar86vasiljevic@gmail.com",
         "__v":0
      }
   }
}

// jwt cookie u browseru
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDQ5MzdmMGJjNDdiMWYyODUyMmM1MCIsImlhdCI6MTU3ODMxNDUxMSwiZXhwIjoxNTg2MDkwNTExfQ.uQSeycPTECQnUUEu1-pzU8j0MS1pryiOblEhs_8Zcxw

// RODO error slcuaj:
{ 
   "status":"fail",
   "error":{ 
      "statusCode":400,
      "status":"fail",
      "isOperational":true
   },
   "message":"Please provide email and password",
   "stack":"Error: Please provide email and password\n    at exports.login.catchAsync 
   ......
}


{ 
   "status":"fail",
   "error":{ 
      "statusCode":400,
      "status":"fail",
      "isOperational":true
   },
   "message":"Please provide email and password",
   "stack":"Error: Please provide email and password\n    at exports.login.catchAsync 
   ........
}
*/

export const loginSuccess = (data) => {
  return (dispatch) => {
    // OVO KADA JE URADJENO LOGOVANJE PUTEM FORME
    /* TODO: 
    util za tumacenje jwt tokena
    storage utils za trajan upis tokena u browser
    odnosno cookie utils za citanje/pisanje tokena
    ...priakzati u console sve sto izvucemo
    */
    console.log('lofinSuccess ACTION')
    console.log('data segment')
    console.group(data.data);
    /*
user: {
  role: "admin"
  _id: "5e04937f0bc47b1f28522c50"
  name: "ale"
  email: "aleksandar86vasiljevic@gmail.com"
}
    */
    console.log('token segment')
    console.group(data.token); // token string....
    console.log('decoded jwt token');
    console.log(authUtils.jwtDecode(data.token));
    /*
    {
    id: "5e04937f0bc47b1f28522c50",
    iat: 1578328671,
    exp: 1586104671
    }
    */

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
    // OVO NAKON USPESNOG AUTOLOGINA ( koji se desava nakon POKRETANJA APLIKACIJE I NAKON FORME)
    /*
    {
      role: "admin"
      _id: "5e04937f0bc47b1f28522c50"
      name: "ale"
      email: "aleksandar86vasiljevic@gmail.com"
    }
    */
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
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    dispatch(fetchUsersStart());
    // step 2: odmah zapocinjemo fetchovanje asinhtono
    // nekiFetchAsync()
    ajaxGet(apiLib.apiGetUsers())
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase fetchovanje je zavrseno')
        console.log(response);
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

    // ajaxPost(API_URL_GET_TOURS)
  }

}



export const login = (data, cb, cb_error) => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    // dispatch(fetchUsersStart());

    // step 2: odmah zapocinjemo fetchovanje asinhtono
    ajaxPost(apiLib.apiLogin(), data, cb_error)
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase fetchovanje je zavrseno')
        console.log(response);
/*
{ 
   "status":"success",
   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjk3OGM0ZmRhNGViMmRmNDc2ZGY2MCIsImlhdCI6MTU4MTcwMjAyMCwiZXhwIjoxNTg5NDc4MDIwfQ.zl5CGJp7kUTe_-3a0RRFYnt590PaUvOwEOnWSnfuzSI",
   "data":{ 
      "user":{ 
         "role":"admin",
         "_id":"5e2978c4fda4eb2df476df60",
         "name":"Aleksandar Vasiljevic",
         "email":"aa@gmail.com",
    }
      }
*/
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data; // data.token i data.data
          dispatch(loginSuccess(pripremljeni_podaci_za_state)); // reducer ga ignorise za sada
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state); // ovo ce da pozove AUTOLOGIN proceduru
          }
        } else {
          // dispatch(loginFailure());
          /*
{ 
   "status":"fail",
   "error":{ 
      "statusCode":401,
      "status":"fail",
      "isOperational":true
   },
   "message":"Incorect email or password",
          */
        }

      })

    // ajaxPost(API_URL_GET_TOURS)
  }

}

export const autologin = (cb, cb_error) => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    // step 2: odmah zapocinjemo fetchovanje asinhrono
    ajaxGet(apiLib.apiAutologin())
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase AUTOLOGIN fetchovanje je zavrseno')
        console.log(response);
        /*
        LOGGED IN
        { 
        "status":"success",
        "data":{ 
          "user":{ 
            "role":"admin",
            "_id":"5e04937f0bc47b1f28522c50",
            "name":"ale",
            "email":"aleksandar86vasiljevic@gmail.com",
          "__v":0
          }
        }
        }
        */
        if (response && response.data && response.data.status === 'success') {
          console.log('ULOGOVANI SMO :)');
          let pripremljeni_podaci_za_state = response.data.data.user;
          console.log(pripremljeni_podaci_za_state);
          dispatch(autologinSuccess(pripremljeni_podaci_za_state));
        } else {
          dispatch(autologinFailure())
        }

      })
      .catch((response) => {
        console.log('catch error');
        // OVO SE NECE DESITI NIKADA JER GRESKU PRVI UHVATI ajaxGet...
        if (response && response.status === 'fail') {
          console.log('NISMO ULOGOVANI :(');
        }
        dispatch(autologinFailure())
        /*
        NOT LOGGED IN
        { 
        "status":"fail",
        "error":{ 
        "statusCode":401,
        "status":"fail",
        "isOperational":true
        },
        "message":"You are not loged in",
        "stack":"Error: You are not loged in\n    at exports.protect.catchAsync 
        ...
        }
        */

      });

    // ajaxPost(API_URL_GET_TOURS)
  }

}


export const logout = (cb, cb_error) => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto

    // step 2: odmah zapocinjemo fetchovanje asinhtono
    ajaxGet(apiLib.apiLogout())
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase LOGOUT fetchovanje je zavrseno')
        console.log(response);
        // {"status":"success"}
        if (response && response.data && response.data.status === 'success') {
          dispatch(logoutSuccess())
          if (typeof cb === 'function') {
            cb(response); // ovaj callback je za sada formalnost...
          }
        } else {
          dispatch(logoutFailure());
        }
      })
  }
}


export const register = (data, cb, cb_error) => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    // step 2: odmah zapocinjemo fetchovanje asinhrono
    ajaxPost(apiLib.apiRegister(), data, cb_error)
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase fetchovanje je zavrseno')
        console.log(response);
        /*
        { 
           "status":"success",
           "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjk2ZDljOGQyMThiMTAwNDFjMzgxYiIsImlhdCI6MTU3OTc3MzM0MCwiZXhwIjoxNTg3NTQ5MzQwfQ.YPMWIuuZGo6R2i1o0fA5URU1mk8LZpymYfb3BZ_CEo8",
           "data":{ 
              "user":{ 
                 "role":"user",
                 "active":true,
                 "_id":"5e296d9c8d218b10041c381b",
                 "name":"Aleksandar Vasiljevic",
                 "email":"aleksss@gmail.com",
                 "__v":0
              }
           }
        */
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data.data; // data.token i data.data
          // dispatch(loginSuccess(pripremljeni_podaci_za_state)); // reducer ga ignorise za sada
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state); // ovo ce da pozove AUTOLOGIN proceduru
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
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    // step 2: odmah zapocinjemo fetchovanje asinhrono
    ajaxPatch(apiLib.apiPasswordChange(), data, cb_error)
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase fetchovanje je zavrseno')
        console.log(response);
        /*
        { 
           "status":"success",
           "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjk3OWQzYzc3ZGVjMzJkNGMyZTY4MCIsImlhdCI6MTU3OTc4MTk3OCwiZXhwIjoxNTg3NTU3OTc4fQ.4PiyPHkfvhzbDmyZOvWfwJIUU09d5NwRG4oiSsOW6ws",
           "data":{ 
              "user":{ 
                 "role":"user",
                 "_id":"5e2979d3c77dec32d4c2e680",
                 "name":"Aleksandar Vasiljevic",
                 "email":"hola@gmail.com",
                 "__v":0,
                 "passwordChangedAt":"2020-01-23T12:19:37.250Z"
              }
           }
        }
        */
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data; // data.token i data.data
          // dispatch(loginSuccess(pripremljeni_podaci_za_state)); // reducer ga ignorise za sada
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state); // ovo ce da pozove AUTOLOGIN proceduru
          }
          // dispatch(registerSubmitSuccess(pripremljeni_podaci_za_state))
        } else {
        }
      });

  }
}

export const passwordForgot = (data, cb, cb_error) => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    // step 2: odmah zapocinjemo fetchovanje asinhrono
    ajaxPost(apiLib.apiPasswordForgot(), data, cb_error)
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase fetchovanje je zavrseno')
        console.log(response);
        /*
        { 
           "status":"success",
           "message":"token sent to email"
        }
        */
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data; // data.token i data.data
          // dispatch(loginSuccess(pripremljeni_podaci_za_state)); // reducer ga ignorise za sada
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state); // ovo ce da pozove AUTOLOGIN proceduru
          }
          // dispatch(registerSubmitSuccess(pripremljeni_podaci_za_state))
        } else {
        }
      });

  }
}


export const passwordReset = (data, cb, cb_error, token) => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    console.log('thunk fething...');
    // step 1: odmah dispatchujemo action da je fetchovanje zapoceto
    // step 2: odmah zapocinjemo fetchovanje asinhrono
    ajaxPatch(apiLib.apiPasswordReset(token), data, cb_error)
      .then((response) => {
        // fetchovanje je zavrsen oi uspelo
        // step 3: cemo dispatchovati action da je fetchovanje zavrseno ASINHRONO kad se fetchovanje zavrsi.
        console.log('nase fetchovanje je zavrseno')
        console.log(response);
        /*
        { 
          "status":"fail",
          "error":{ 
              "statusCode":400,
              "status":"fail",
              "isOperational":true
          },
          "message":"Token is invalid",
          "stack":"Error: Token is invalid\n    at exports.resetPassword.catchAsync (C:\\projekti\\backend\\controllers\\authControler.js:178:17)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        }
        */
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data; // data.token i data.data
          // dispatch(loginSuccess(pripremljeni_podaci_za_state)); // reducer ga ignorise za sada
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state); // ovo ce da pozove AUTOLOGIN proceduru
          }
          // dispatch(registerSubmitSuccess(pripremljeni_podaci_za_state))
        } else {
        }
      });

  }
}


export const detectMyLocation = () => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    dispatch({ type: '*** INFO poceli smo da detektujemo lokaciju' });

    let cb = (position) => {
      // step 2: callback koji ce biti pozvan kada se detekcija obavi.
      if (position === false) {
        //
        dispatch({
          type: 'USER_LOCATION_DETECTION_NOT_POSSIBLE'
        });
      } else {
        /*
  coords: GeolocationCoordinates
    latitude: 51.118372
    longitude: 6.8915451
    altitude: null
    accuracy: 25
    altitudeAccuracy: null
    heading: null
    speed: null
  __proto__: GeolocationCoordinates
  timestamp: 1581155134049
        */
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

    // step 1: odmah zapocinjemo proces detekcije lokaciej u browseru.
    geoUtils.getMyLocation(cb);
  }
}


export const contactUs = (data, cb, cb_error) => {
  return (dispatch) => {
    // ovo je tipican redux thunk...
    dispatch({ type: '*** INFO sending email' });

    ajaxPost(apiLib.apiContactUs(), data, cb_error)
      .then((response) => {
        console.log('contact ', response)
/*
{ 
   "status":"error",
   "error":{ 
      "code":"EENVELOPE",
      "command":"API",
      "statusCode":500,
      "status":"error"
   },
   "message":"No recipients defined",
   "stack":"Error: No recipients defined\n 
*/
/*
{ 
   "status":"success",
   "message":"Email sent with no errors."
}
*/
        if (response && response.data && response.data.status === 'success') {
          let pripremljeni_podaci_za_state = response.data; // data.token i data.data
          // dispatch(loginSuccess(pripremljeni_podaci_za_state)); // reducer ga ignorise za sada
          if (typeof cb === 'function') {
            cb(pripremljeni_podaci_za_state); // ovo ce da pozove AUTOLOGIN proceduru
          }
          // dispatch(registerSubmitSuccess(pripremljeni_podaci_za_state))
        } else {
        }
      })

  }
}
