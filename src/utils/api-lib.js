// library of all api urls
import { config } from './config'
import { liveConfig } from './live-config'

export const apiLib = {};


const STATIC_AVATAR_FOLDER = '/static/img/users/'
const STATIC_AVATAR_DEFAULT = '/static/img/users/default.jpg';
const STATIC_COVER_FOLDER = '/static/img/tours/'


const API_PREFIX_LOCAL = 'http://localhost:3000/';
const API_PREFIX_PROD = config.API_PREFIX_PROD

let apiPrefix = () => {
  let prefix = API_PREFIX_PROD;
  if (liveConfig.isDevEnv() === true) {
    prefix = API_PREFIX_LOCAL;
  }
  return prefix;
}


const API_URL_LOGIN = 'api/v1/users/login'
const API_URL_AUTOLOGIN = 'api/v1/users/me'
const API_URL_LOGOUT = 'api/v1/users/logout'
const API_URL_REGISTER = 'api/v1/users/signUp'
const API_URL_PASSWORD_CHANGE = 'api/v1/users/updateMyPassword'
const API_URL_PASSWORD_FORGOT = 'api/v1/users/forgotPassword'
const API_URL_PASSWORD_RESET = 'api/v1/users/resetPassword/'
const API_URL_CONTACT_US = 'api/v1/users/contactus'
const API_URL_GET_TOURS = 'api/v1/tours'; 
const API_URL_GET_SINGLE_TOUR = 'api/v1/tours/'
const API_URL_GET_REVIEWS = 'api/v1/reviews/'
const API_URL_GET_USERS = 'api/v1/users/'
const API_URL_CREATE_TOUR = 'api/v1/tours/'
const API_URL_TOUR_STATS = 'api/v1/tours/tour-stats'
const API_URL_GET_BOOKINGS = 'api/v1/bookings/list'
const API_URL_GET_ORDERS = 'api/v1/orders/list'
// const API_URL_CREATE_ORDER = 'api/v1/orders/checkout-session/'
const API_URL_PAYMENT_STRIPE = 'api/v1/orders/stripe-payment/'
const API_URL_PAYMENT_PAYPAL = 'api/v1/orders/paypal-payment/'

// URLs

apiLib.staticAvatar = (fileName) => {
  return STATIC_AVATAR_FOLDER + fileName;
}
apiLib.staticAvatarDefault = () => {
  return STATIC_AVATAR_DEFAULT;
}
apiLib.staticCover = (fileName) => {
  if (typeof fileName === 'string') {
    if (fileName.includes('http:') || fileName.includes('https:')) {
      return fileName
    }
  }
  return STATIC_COVER_FOLDER + fileName
}

apiLib.productUrl = (id) => {
  return "/product/" + id;
}
apiLib.categoryUrl = (id) => {
  return "/category/" + id;
}


// API URLs
apiLib.apiLogin = () => {
  return apiPrefix() + API_URL_LOGIN;
};
apiLib.apiAutologin = () => {
  return apiPrefix() + API_URL_AUTOLOGIN;
};
apiLib.apiLogout = () => {
  return apiPrefix() + API_URL_LOGOUT;
};
apiLib.apiRegister = () => {
  return apiPrefix() + API_URL_REGISTER;
};
apiLib.apiPasswordChange = () => {
  return apiPrefix() + API_URL_PASSWORD_CHANGE;
};
apiLib.apiPasswordForgot = () => {
  return apiPrefix() + API_URL_PASSWORD_FORGOT;
};
apiLib.apiPasswordReset = (token) => {
  return apiPrefix() + API_URL_PASSWORD_RESET + token;
};
apiLib.apiContactUs = () => {
  return apiPrefix() + API_URL_CONTACT_US;
};

apiLib.apiToursGet = () => {
  return apiPrefix() + API_URL_GET_TOURS;
};

apiLib.apiToursGet = () => {
  return apiPrefix() + API_URL_GET_TOURS;
};
apiLib.apiSingleTourGet = (id) => {
  return apiPrefix() + API_URL_GET_SINGLE_TOUR + id;
};
apiLib.apiGetReviews = () => {
  return apiPrefix() + API_URL_GET_REVIEWS;
}
apiLib.apiCreateReview = () => {
  return apiPrefix() + API_URL_GET_REVIEWS
}
apiLib.apiGetsingleUser = (id) => {
  return apiPrefix() + API_URL_GET_USERS + id;
}
apiLib.apiGetUsers = () => {
  return apiPrefix() + API_URL_GET_USERS;
}

apiLib.apiTourCreate = () => {
  return apiPrefix() + API_URL_CREATE_TOUR;
}

apiLib.apiTourUpdate = (id) => {
  return apiPrefix() + API_URL_CREATE_TOUR + id;
}

apiLib.apiTourDelete = (id) => {
  return apiPrefix() + API_URL_CREATE_TOUR + id;
}

apiLib.apiTourStats = () => {
  return apiPrefix() + API_URL_TOUR_STATS
}

/*
apiLib.apiBookTour = (id) => {
  return apiPrefix() + API_URL_BOOK_TOUR + id;
};
*/
apiLib.apiGetBookings = () => {
  return apiPrefix() + API_URL_GET_BOOKINGS
}

apiLib.apiGetOrders = () => {
  return apiPrefix() + API_URL_GET_ORDERS
}
apiLib.apiPaymentStripe = () => {
  return apiPrefix() + API_URL_PAYMENT_STRIPE
}
apiLib.apiPaymentPaypal = () => {
  return apiPrefix() + API_URL_PAYMENT_PAYPAL
}