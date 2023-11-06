import SERVER_API from './config'

export const client = {
  serverApi: SERVER_API,
  setUrl: function (url) {
    this.serverApi = url;
  },
  send: async function (url, method = "GET",params = {}, body = null, api = null) {
    url = `${this.serverApi}${url}`;
    if (Object.keys(params).length) {
      url = url + "?" + new URLSearchParams(params).toString();
    }
    const headers = {
      "Content-Type": "application/json"
    };
    if (api) {
      headers["X-Api-Key"] = api;
    }
    const options = {
      method,
      headers:headers,
    };
    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);
    const data = await response.json();

    return { response, data };
  },

  get: function (url, params, api = null) {
    return this.send(url, "GET", params, null, api);
  },

  post: function (url, body, api = null) {
    return this.send(url, "POST",{}, body, api);
  },

  put: function (url, body, api = null) {
    return this.send(url, "PUT",{}, body, api);
  },

  patch: function (url, body, api = null) {
    return this.send(url, "PATCH",{}, body, api);
  },

  delete: function (url, api = null) {
    return this.send(url, "DELETE",{}, null, api);
  },
};