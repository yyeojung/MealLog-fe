import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;
const PROD_BACKEND = import.meta.env.VITE_PROD_BACKEND;
const NODE_ENV = import.meta.env.NODE_ENV;

console.log(NODE_ENV);

const URL = NODE_ENV === "production" ? PROD_BACKEND : LOCAL_BACKEND;

const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    // authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

// 요청 시 토큰 헤더에 설정
api.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  },
);

// 응답 시 에러 처리
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  },
);

export default api;
