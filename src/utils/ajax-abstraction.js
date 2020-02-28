// here we make abstraction of functions that make fetching from the server

import axios from 'axios'

let config = {
  solution: 'AXIOS'
}


let axiosConfigurator = {};
axiosConfigurator.axiosPostConfig = {
  headers: {
    'X-MyFirstHeader': 'value headera'
  }
}
axiosConfigurator.setHeader = (key, value) => {
  axiosConfigurator.axiosPostConfig.headers[key] = value;
}

const ajaxErrorHandle = (err) => {
}

export const ajaxGet = async function (url) {
  if (config.solution === 'AXIOS') {
    return axios.get(url, axiosConfigurator.axiosPostConfig)
      .then((response) => {
        return response;
      }, error => ajaxErrorHandle(error));
  }
}

export const ajaxPost = async function (url, data, cb_error) {
  let error_handle = ajaxErrorHandle
  if (typeof cb_error === 'function') {
    error_handle = cb_error
  }
  if (config.solution === 'AXIOS') {
    return axios.post(url, data, axiosConfigurator.axiosPostConfig).catch((err) => { error_handle(err.response) })
  }
}

export const ajaxPatch = async function (url, data, cb_error) {
  let error_handle = ajaxErrorHandle
  if (typeof cb_error === 'function') {
    error_handle = cb_error
  }
  if (config.solution === 'AXIOS') {
    return axios.patch(url, data, axiosConfigurator.axiosPostConfig).catch((err) => { error_handle(err.response) })
  }
}

export const ajaxDelete = async function (url) {
  if (config.solution === 'AXIOS') {
    return axios.delete(url, axiosConfigurator.axiosPostConfig).catch((err) => { ajaxErrorHandle(err) })
  }
}

export { axiosConfigurator };