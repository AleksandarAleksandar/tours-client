import { userActionTypes } from './user-types'

const INITIAL_STATE = {
  currentUser: null,
  auth: {
    isFetching: true,
    isLoggedIn: false,
    me: {
      token: '',
      id: '',
      role: '',
      username: '',
      email: '',
      nickname: ''
    }
  },
  users: {
    isFetching: false,
    data: []
  }
}

const userReducer = (state = INITIAL_STATE, action) => {
  let users;
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    case userActionTypes.AUTOLOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          isFetching: false,
          isLoggedIn: true,
          me: {
            id: action.payload._id,
            role: action.payload.role,
            username: action.payload.name,
            email: action.payload.email,
            nickname: action.payload.name
          }
        },
      }
    case userActionTypes.AUTOLOGIN_FAILURE:
      return {
        ...state,
        auth: {
          isFetching: false,
          isLoggedIn: false,
          me: {
            token: '',
            id: '',
            role: '',
            username: '',
            email: '',
            nickname: ''
          }
        }
      }
    case userActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        auth: {
          isFetching: false,
          isLoggedIn: false,
          me: {
            token: '',
            id: '',
            role: '',
            username: '',
            email: '',
            nickname: ''
          }
        }
      }

    case userActionTypes.FETCH_USERS_START:
      return {
        ...state,
        users: {
          isFetching: true,
          data: []
        }
      }
    case userActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: {
          isFetching: false,
          data: action.payload
        }
      }
    case userActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        users: {
          isFetching: false,
          data: []
        }
      }
    default:
      return state;
  }

}
export default userReducer