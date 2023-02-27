import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [process.env.REACT_APP_API_BASE];
    const token = localStorage.getItem("access-token");

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest) =>
  axios
    .post(`${process.env.REACT_APP_API_BASE}/auth/refresh_token`, {
      refresh_token: localStorage.getItem("refresh-token"),
    })
    .then((tokenRefreshResponse) => {
      localStorage.setItem(
        "access-token",
        tokenRefreshResponse.data.accessToken
      );
      localStorage.setItem(
        "refresh-token",
        tokenRefreshResponse.data.refreshToken
      );

      failedRequest.response.config.headers["Authorization"] =
        tokenRefreshResponse.data.accessToken;
      return Promise.resolve();
    });

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(axios, refreshAuthLogic);

//
export const fetchProductList = async (key, id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_BASE}/product?page=1`
  );
  return data;
};

export const fetchOrders = async (key, id) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_BASE}/order`);
  return data;
};

export const fetchProduct = async (product_id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_BASE}/product/${product_id}`
  );
  return data;
};

export const fetchRegister = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_BASE}/auth/register`,
    input
  );
  return data;
};

export const fetchLogin = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_BASE}/auth/login`,
    input
  );
  return data;
};

export const fetchMe = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_BASE}/auth/me`);
  return data;
};

export const fetchLogout = async () => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_BASE}/auth/logout`,
    {
      refresh_token: localStorage.getItem("refresh-token"),
    }
  );
  return data;
};

export const postOrder = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_BASE}/order`,
    input
  );
  return data;
};

export const saveProduct = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_BASE}/product`,
    input
  );
  return data;
};
export const updateProduct = async (input, product_id) => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_API_BASE}/product/${product_id}`,
    input
  );
  return data;
};

export const deleteProduct = async (product_id) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_API_BASE}/product/${product_id}`
  );
  return data;
};
