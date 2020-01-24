// ovde vrsimo apstrakciju funkcija koje obavljaju ajax/fetchovanja sa servera...

import axios from 'axios'
import { futimes } from 'fs';
import { networkInterfaces } from 'os';
import { API_URL_GET_TOURS } from './api-lib'
import { myFetchStartFirst } from '../redux/shop/shop-actions';

let config = {
  solution: 'AXIOS'
}

let axiosPostConfig = {
  headers: {
    'X-MyFirstHeader': 'value headera'
  }
}


const ajaxErrorHandle = (err) => {
  console.log('AJAX uhvatili smo gresku');
  console.error(err);
}

export const ajaxGet = async function (url) {
  if (config.solution === 'AXIOS') {
    // axios je vec asinhroni i poziv axios metoda axios.get() odmah vraca promise.
    // i mi taj promise vracamo sada.
    // ona funkcija koja ga je pozcvala nasu asinhronu funkciju ajaxGet() treba da ima .then() da bi uhvatila podatke kad se obecanej ispuni.
    return axios.get(url)
      .then((response) => {
        console.log(response);
        return response;
      }, error => ajaxErrorHandle(error));

    /*
  .catch(error => console.log('BAD', error))
.then(response => {
  console.log('GOOD', response)
  return response
});
*/

    // .catch((err) => { ajaxErrorHandle(err) })
  }
}

export const ajaxPost = async function (url, data, cb_error) {
  let error_handle = ajaxErrorHandle
  if (typeof cb_error === 'function') {
    error_handle = cb_error
  }
  if (config.solution === 'AXIOS') {
    return axios.post(url, data, axiosPostConfig).catch((err) => { error_handle(err.response) })
  }
}

export const ajaxPatch = async function (url, data, cb_error) {
  let error_handle = ajaxErrorHandle
  if (typeof cb_error === 'function') {
    error_handle = cb_error
  }
  if (config.solution === 'AXIOS') {
    return axios.patch(url, data, axiosPostConfig).catch((err) => { error_handle(err.response) })
  }
}

export const ajaxDelete = async function (url) {
  if (config.solution === 'AXIOS') {
    return axios.delete(url, axiosPostConfig).catch((err) => { ajaxErrorHandle(err) })
  }
}