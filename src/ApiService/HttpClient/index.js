import { merge } from "lodash-es";

const defaultHeaders = {
  "Content-Type": "application/json",
};
class ResponseError extends Error {
  constructor(data, message = "Response Error!") {
    super(message);
    this.name = "ResponseError";
    if (!this.data || this.data.length == 0) {
      let errorList = [];
      if (typeof data === "object" && data !== null) {
        const errors = Object.keys(data);
        errors.forEach((key) => {
          data[key].forEach((err) => errorList.push(`${key} : ${err}`));
        });
      }
      errorList.push(message);
      this.data = errorList;
    }
  }
}
export async function defaultErrorHandler(response) {
  // handle error depending on http response status codes
  const responseData = await response.json();
  switch (response.status) {
    case 400: {
      throw new ResponseError(responseData, "Invalid Data!");
    }
    case 401: {
      localStorage.removeItem("authToken");
      throw new ResponseError(responseData, "You session has expired!");
    }
    case 403: {
      throw new ResponseError(
        responseData,
        "You are not authorized to access this page!"
      );
    }
    case 404: {
      throw new ResponseError(responseData, "Endpoint not found!");
    }
    case 429: {
      throw new ResponseError(responseData, "Too many requests!");
    }
    case 500: {
      throw new ResponseError(responseData, "Internal server error!");
    }
    default: {
      break;
    }
  }
}

export function combineURLs(baseURL, relativeURL) {
  if (relativeURL.startsWith("http")) {
    return relativeURL;
  }
  const combinedUrl = relativeURL
    ? `${baseURL.replace(/\/+$/, "")}/${relativeURL.replace(/^\/+/, "")}`
    : baseURL;
  return combinedUrl;
}

export function createURL(apiEndpoint, path, { query }) {
  let resourcePath = path;
  let baseURL = apiEndpoint;

  let resourceURL;
  resourceURL = new URL(combineURLs(baseURL, resourcePath));

  if (query) {
    const searchParams = new URLSearchParams(query);
    resourceURL.search = searchParams.toString();
  }
  return resourceURL;
}

class HttpFetch {
  constructor({ endpoint, tokenName, authHeader, authTokenPrefix }) {
    this.endpoint = endpoint;
    this.tokenName = tokenName;
    this.authHeader = authHeader;
    this.authTokenPrefix = authTokenPrefix;
  }

  handleResponse = async (response) => {
    if (response.ok) {
      if (response.status === 204) {
        // success, but no response content, return empty string
        return response.text();
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        // success, and response type json, return the json content
        return response.json();
      }
      // success, and response type unknown, return the entire response
      return response;
    }
    // request not successful, call errorHandler with request param
    // since the function awaits, if it throws any error, that will
    // be passed on to the catch block.
    return await defaultErrorHandler(response);
  };

  getHeaders = async ({ requireAuth = true }) => {
    const headersInstance = new Headers();
    const allHeaders = merge({}, defaultHeaders);

    if (requireAuth && this.tokenName) {
      const accessToken = await localStorage.getItem(this.tokenName);
      allHeaders[this.authHeader] = `${this.authTokenPrefix} ${accessToken}`;
    }
    for (const key in allHeaders) {
      const element = allHeaders[key];
      headersInstance.set(key, element);
    }
    return headersInstance;
  };

  fetchURL = async (method, path, { data, query = {}, requireAuth } = {}) => {
    if (!this.endpoint) {
      throw new Error("API endpoint is not defined");
    }
    const requestHeaders = await this.getHeaders({
      requireAuth,
    });
    const url = createURL(this.endpoint, path, {
      query,
    });
    let body;
    if (data) {
      body = JSON.stringify(data);
    }
    return fetch(url.toString(), {
      body,
      headers: Object.fromEntries(requestHeaders),
      method,
    }).then((response) => this.handleResponse(response));
  };

  getUrl = async (...rest) => this.fetchURL("GET", ...rest);

  postUrl = async (...rest) => this.fetchURL("POST", ...rest);

  patchUrl = async (...rest) => this.fetchURL("PATCH", ...rest);

  deleteUrl = async (...rest) => this.fetchURL("DELETE", ...rest);
}

const apiBase = new HttpFetch({
  endpoint: "http://localhost:8000/",
  tokenName: "authToken",
  authHeader: "Authorization",
  authTokenPrefix: "Token",
});
export default apiBase;
