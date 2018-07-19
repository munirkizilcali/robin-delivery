export function myFetch(url, options = {}) {
  const baseUrl = "http://localhost:3000/api/v1";
  const finalUrl = baseUrl + url;
  let finalOptions = {};
  if (url === "/user_token") {
    finalOptions = {
      ...options,
      method: "POST",
      headers: { "content-type": "application/json" }
    };
  } else {
    if (!!localStorage.token) {
      finalOptions = {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`
        }
      };
    } else {
      return Promise.reject(new Error("No Token Info Found"));
    }
  }

  // if (options.credentials == null) options.credentials = "same-origin";
  return fetch(finalUrl, finalOptions).then(function(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      let error = new Error(response.statusText || response.status);
      error.response = response;
      return Promise.reject(error);
    }
  });
}
