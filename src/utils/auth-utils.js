
import { storageUtils } from './storage-utils'
import { autologin, logout } from './../redux/user/user-actions'

// https://github.com/auth0/node-jsonwebtoken#readme
var jwt = require('jsonwebtoken');

export const authUtils = {};

authUtils.jwtDecode = (token) => {
  var decoded = jwt.decode(token);
  return decoded;
}

// TODO: metod da uzme token iz cookie sa argumentom KEY a key je naziv cookiea

let config = {
  solution: 'STORAGE'
}
/* ostale mogu biti na primer:
cookie...
*/

authUtils.storeToken = (tokenName, token) => {
  if (config.solution === "STORAGE") {
    storageUtils.upsert(tokenName, token);
  }
}

authUtils.deleteToken = (tokenName) => {
  if (config.solution === "STORAGE") {
    storageUtils.delete(tokenName)
  }
}

authUtils.getToken = (key) => {
  if (config.solution === "STORAGE") {
    return storageUtils.get(key);
  }
}

const appConfig = {
  tokenStorageKey: 'stoken',
  use_jwt: true,
  useCookieToken: true,
  useHeaderToken: true
};

authUtils.autoLoginProcedure = (dispatch) => {
  console.log(' ...AUTOLOGIN PROCEDURE');
  // ovo je procedura univerzalna koja treba da se obavi svaki put kad se aplikacija startuje i nakon login, nakon logout...
  let token = authUtils.getToken(appConfig.tokenStorageKey);
  let decoded;
  if (appConfig.use_jwt === true) {
    decoded = authUtils.jwtDecode;
  }
  if (appConfig.useCookieToken === true) {
    // TODO
  }
  if (appConfig.useHeaderToken === true) {
    // TODO: pozvati funkciju iz AJAX UTILS koja vrsi podesavanja za ajax pozive
  }

  let cb = (data) => {
    console.log('autologin make calback...');
    console.log(data);
  }

  dispatch(autologin(cb));

}


authUtils.logoutProcedure = (dispatch) => {
  console.log(' ...LOGOUT PROCEDURE');
  // ovo je procedura univerzalna koja treba da se obavi svaki put kad se aplikacija startuje i nakon login, nakon logout...

  authUtils.deleteToken(appConfig.tokenStorageKey)

  if (appConfig.useCookieToken === true) {
    // TODO
  }
  if (appConfig.useHeaderToken === true) {
    // TODO: pozvati funkciju iz AJAX UTILS koja vrsi podesavanja za ajax pozive
  }

  let cb = (data) => {
    console.log('logout utils make calback...');
    console.log(data);
  }

  dispatch(logout(cb));

}






