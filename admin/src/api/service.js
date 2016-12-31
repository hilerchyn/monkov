import store from '../store'
const apihost = 'http://localhost:3000/'

function parseResponse(response) {
  return Promise.all([
    response.status, response.statusText, response.json()
  ])
}

function checkStatus([status, statusText, data]) {
  if (status >= 200 && status < 300) {
    return data;
  } else {
    if (401 === status) {
      if ('token expired' === data.error) {
        alert('token expired,please relogin');
      } else if ('invalid token' === data.error) {
        store.dispatch('deleteToken')
      }
    }
    let error = new Error(statusText);
    error.status = status;
    error.error_message = data;
    return Promise.reject(error);
  }
}

export default {
  get(url, param = {}, headers = {}, host = apihost) {
    let reqHeaders = new Headers()
    reqHeaders.append('Accept', 'application/json');
    store.state.token.token && reqHeaders.append('Authorization', 'Bearer ' + store.state.token.token)
    var query = []
    Object
      .keys(param)
      .forEach((item) => {
        query.push(`${item}=${encodeURIComponent(param[item])}`)
      })
    var params = query.length
      ? '?' + query.join('&')
      : '' // fixme
    url = host + url + params
    console.log(host, params)
    var init = {
      method: 'GET',
      headers: reqHeaders,
      credentials: "include",
      cache: 'default',
      mode: 'cors'
    }
    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  patch(url, param = {}, headers = {}, host = apihost) {
    let reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')
    store.state.token.token && reqHeaders.append('Authorization', 'Bearer ' + store.state.token.token)
    url = host + url

    var init = {
      method: 'PATCH',
      headers: reqHeaders,
      credentials: "include",
      mode: 'cors',
      body: JSON.stringify(param)
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  post(url, param = {}, headers = {}, host = apihost) {
    let reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')
    store.state.token.token && reqHeaders.append('Authorization', 'Bearer ' + store.state.token.token)
    url = host + url
    var init = {
      method: 'POST',
      headers: reqHeaders,
      credentials: "include",
      mode: 'cors',
      body: JSON.stringify(param)
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  put(url, param = {}, headers = {}, host = apihost) {
    let reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')
    store.state.token.token && reqHeaders.append('Authorization', 'Bearer ' + store.state.token.token)
    url = host + url

    var init = {
      method: 'PUT',
      headers: reqHeaders,
      credentials: "include",
      mode: 'cors',
      body: JSON.stringify(param)
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  delete(url, param = {}, headers = {}, host = apihost) {
    let reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')
    store.state.token.token && reqHeaders.append('Authorization', 'Bearer ' + store.state.token.token)
    url = host + url

    var init = {
      method: 'DELETE',
      credentials: "include",
      headers: reqHeaders,
      mode: 'cors'
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  }

}
