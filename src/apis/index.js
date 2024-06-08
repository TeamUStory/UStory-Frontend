import axios, { HttpStatusCode, isAxiosError } from 'axios';
import JWT from '@/apis/api/JWT';
import useAxios from '@/hooks/useAxios';

axios.defaults.baseURL = 'http://15.164.24.133:8080';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

export const api = axios.create();

// reject 했을때, error가 useAXios로 넘어가지 않을 시 -> throw Err 변경
// 요청
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); 

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },

  (req) => {
    if (req.data instanceof FormData) {
      req.headers['Content-Type'] = 'multipart/form-data';
    }
    return req;
  },
  (err) => {
    if (isAxiosError(err)) {
      if (err.response && err.response.status === HttpStatusCode.BadRequest) {
        console.error('Bad Request - 400');
      } else if (err.response && err.response.status === HttpStatusCode.NotFound) {
        console.error('Not Found - 404');
      } else {
        console.error('Request Error: ', err.message);
      }
    } else {
      console.error('axios 외부에서 발생한 에러: ', err.message);
    }
    return Promise.reject(err);
  }
);

// 응답
api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (isAxiosError(err)) {
      if (err.response && err.response.status === HttpStatusCode.BadRequest) {
        console.error('BadRequest - 400');
      } else if (err.response && err.response.status === HttpStatusCode.Unauthorized) {
        console.error('Unauthorized - 401');
        const { fetchData } = useAxios();
        fetchData(JWT.refresh())
      } else if (err.response && err.response.status === HttpStatusCode.InternalServerError) {
        console.error('Internal Server Error - 500');
      } else if (err.response && err.response.status === HttpStatusCode.NotFound) {
        console.error('Not Found - 404');
      } else {
        console.error('Response Error: ', err.message);
      }
    } else {
      console.error('axios 외부에서 발생한 에러: ', err.message);
    }
    return Promise.reject(err);
  }
);