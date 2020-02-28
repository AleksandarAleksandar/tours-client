
import { config } from './config';
import { storageUtils } from './storage-utils'
import { autologin, logout } from './../redux/user/user-actions'
import { axiosConfigurator } from './ajax-abstraction'

// https://github.com/auth0/node-jsonwebtoken#readme
var jwt = require('jsonwebtoken');

export const authUtils = {};

authUtils.jwtDecode = (token) => {
  var decoded = jwt.decode(token);
  return decoded;
}

// TODO: metod da uzme token iz cookie sa argumentom KEY a key je naziv cookiea

let solution = 'STORAGE'; // what we use to store token localy

/*
const appConfig = {
  TOKEN_STORAGE_KEY: 'stoken',
  TOKEN_HEADER_KEY: 'X-AuthToken',
  use_jwt: true,
  useCookieToken: true,
  useHeaderToken: true
};..
*/

authUtils.storeToken = (tokenName, token) => {
  if (solution === "STORAGE") {
    storageUtils.upsert(tokenName, token);
  }
}

authUtils.deleteToken = (tokenName) => {
  if (solution === "STORAGE") {
    storageUtils.delete(tokenName)
  }
}

authUtils.getToken = (key) => {
  if (solution === "STORAGE") {
    return storageUtils.get(key);
  }
}

authUtils.afterLoginFormProcedure = (token) => {
  authUtils.storeToken(config.TOKEN_STORAGE_KEY, token);
}

authUtils.autoLoginProcedure = (dispatch) => {
  let token = authUtils.getToken(config.TOKEN_STORAGE_KEY);
  let decoded;
  if (config.use_jwt === true) {
    decoded = authUtils.jwtDecode;
  }
  if (config.useCookieToken === true) {
    // TODO
  }
  if (config.useHeaderToken === true) {
    // TODO: pozvati funkciju iz AJAX UTILS koja vrsi podesavanja za ajax pozive
    let token_value = 'Bearer ' + token;

    axiosConfigurator.setHeader(config.TOKEN_HEADER_KEY, token_value); // set axios header
  }

  let cb = (data) => {
    console.log('autologin make calback...');
    console.log(data);
  }

  dispatch(autologin(cb));

}


authUtils.logoutProcedure = (dispatch) => {
  console.log(' ...LOGOUT PROCEDURE');

  authUtils.deleteToken(config.TOKEN_STORAGE_KEY)

  if (config.useCookieToken === true) {
    // TODO
  }
  if (config.useHeaderToken === true) {
    // TODO: pozvati funkciju iz AJAX UTILS koja vrsi podesavanja za ajax pozive
    axiosConfigurator.setHeader(config.TOKEN_HEADER_KEY, ''); // set axios header to empty token
  }

  let cb = (data) => {
  }

  dispatch(logout(cb));

}






