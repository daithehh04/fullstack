export const client = {
  serverApi: import.meta.env.VITE_SERVER_API,
  send: async function (url, params={}, method = "GET", body = null) {
    // url = SERVER_API + url;
    url = `${this.serverApi}${url}`;
    if (Object.keys(params).length) {
      url = url + "?" + new URLSearchParams(params).toString();
    }
    const headers = {
      "Content-Type": "application/json",
    };
    const options = {
      method,
      headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    const data = await response.json();

    return { response, data };
  },

  get: function (url,params) {
    return this.send(url,params);
  },

  post: function (url, body) {
    return this.send(url, "POST", body);
  },

  put: function (url, body) {
    return this.send(url, "PUT", body);
  },

  patch: function (url, body) {
    return this.send(url, "PATCH", body);
  },

  delete: function (url) {
    return this.send(url, "DELETE");
  },
};
