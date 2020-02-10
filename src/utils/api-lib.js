// biblioteka svih APi url-ova i ostalih URL-ova

export const apiLib = {};

const config = {
  environment: 'LIVE',
  simulate: true
}

const STATIC_AVATAR_FOLDER = '/static/img/users/'
const STATIC_AVATAR_DEFAULT = '/static/img/users/default.jpg';
const STATIC_COVER_FOLDER = '/static/img/tours/'

const PRIMER_API_PREFIX = 'htttps://api.nekisajt.com/services/';
const PRIMER_API_PREFIX_DEV = 'htttps://testapi.nekisajt.com/services/';

const API_PREFIX = 'http://localhost:3000/';
// const API_POSTS_GET = '/api/v1/posts';


const API_URL_LOGIN = 'api/v1/users/login'
const API_URL_AUTOLOGIN = 'api/v1/users/me'
const API_URL_LOGOUT = 'api/v1/users/logout'
const API_URL_REGISTER = 'api/v1/users/signUp'
const API_URL_PASSWORD_CHANGE = 'api/v1/users/updateMyPassword'
const API_URL_PASSWORD_FORGOT = 'api/v1/users/forgotPassword'
const API_URL_PASSWORD_RESET = 'api/v1/users/resetPassword/'
const API_URL_CONTACT_US = '/api/v1/users/contactus'
const API_URL_GET_TOURS = 'api/v1/tours'; // opsi sve ture, nefiltrirane
const API_URL_GET_SINGLE_TOUR = 'api/v1/tours/'
const API_URL_GET_REVIEWS = '/api/v1/reviews/'
const API_URL_GET_USERS = '/api/v1/users/'
const API_URL_CREATE_TOUR = '/api/v1/tours/'
const API_URL_TOUR_STATS = '/api/v1/tours/tour-stats'
const API_URL_BOOK_TOUR = '/api/v1/bookings/checkout-session/'
const API_URL_GET_BOOKINGS = '/api/v1/bookings/list'
const API_URL_GET_ORDERS = '/api/v1/orders/list'
const API_URL_CREATE_ORDER = '/api/v1/orders/checkout-session/'







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
  return API_PREFIX + API_URL_LOGIN;
};
apiLib.apiAutologin = () => {
  return API_PREFIX + API_URL_AUTOLOGIN;
};
apiLib.apiLogout = () => {
  return API_PREFIX + API_URL_LOGOUT;
};
apiLib.apiRegister = () => {
  return API_PREFIX + API_URL_REGISTER;
};
apiLib.apiPasswordChange = () => {
  return API_PREFIX + API_URL_PASSWORD_CHANGE;
};
apiLib.apiPasswordForgot = () => {
  return API_PREFIX + API_URL_PASSWORD_FORGOT;
};
apiLib.apiPasswordReset = (token) => {
  return API_PREFIX + API_URL_PASSWORD_RESET + token;
};
apiLib.apiContactUs = () => {
  return API_PREFIX + API_URL_CONTACT_US;
};

apiLib.apiToursGet = () => {
  return API_PREFIX + API_URL_GET_TOURS;
};

apiLib.apiToursGet = () => {
  return API_PREFIX + API_URL_GET_TOURS;
};
apiLib.apiSingleTourGet = (id) => {
  return API_PREFIX + API_URL_GET_SINGLE_TOUR + id;
};
apiLib.apiGetReviews = () => {
  return API_PREFIX + API_URL_GET_REVIEWS;
}
apiLib.apiCreateReview = () => {
  return API_PREFIX + API_URL_GET_REVIEWS
}
apiLib.apiGetsingleUser = (id) => {
  return API_PREFIX + API_URL_GET_USERS + id;
}
apiLib.apiGetUsers = () => {
  return API_PREFIX + API_URL_GET_USERS;
}

apiLib.apiTourCreate = () => {
  return API_PREFIX + API_URL_CREATE_TOUR;
}

apiLib.apiTourUpdate = (id) => {
  return API_PREFIX + API_URL_CREATE_TOUR + id;
}

apiLib.apiTourDelete = (id) => {
  return API_PREFIX + API_URL_CREATE_TOUR + id;
}

apiLib.apiTourStats = () => {
  return API_PREFIX + API_URL_TOUR_STATS
}

/*
apiLib.apiBookTour = (id) => {
  return API_PREFIX + API_URL_BOOK_TOUR + id;
};
*/
apiLib.apiGetBookings = () => {
  return API_PREFIX + API_URL_GET_BOOKINGS
}

apiLib.apiGetOrders = () => {
  return API_PREFIX + API_URL_GET_ORDERS
}
apiLib.apiCreateOrder = () => {
  return API_PREFIX + API_URL_CREATE_ORDER
}


/*
// a)
// apiLib.apiPostsGet_var = API_PREFIX + API_POSTS_GET;

// b)
apiLib.apiPostsGet = () => {
  if (limit) {
    url = prefix + API_POSTS_GET + '?limit=' + limit;
  }
  return prefix + API_POSTS_GET;
};

apiLib.apiPostsGet = (userId, limit, after) => {
  let url = '';
  let prefix = API_PREFIX;
  if (config.envirnment === 'DEV') {
    prefix = API_PREFIX_DEV;
  }
  if (limit) {
    url = prefix + API_POSTS_GET + '?limit=' + limit;
  }
  if (after) {
    url = prefix + API_POSTS_GET + '?limit=' + limit; + '&after=' + after;
  }
  if (config.simulate === true) {
    ulr = 'localhost/simulacijaapija/posts.json';
  }
  return url;
};

*/



/*
/api/va/posts?limit=10
/api/va/posts
/api/v1/posts/all/get
/api/v1/posts/single/get
*/










