import axios, { HttpStatusCode, isAxiosError } from 'axios';

axios.defaults.baseURL = 'https://api.ustory.me/api';
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
  async (err) => {
    if (isAxiosError(err)) {
      if (err.response && err.response.status === HttpStatusCode.BadRequest) {
        console.error('BadRequest - 400');
      } else if (err.response && err.response.status === HttpStatusCode.Unauthorized) {
        console.error('Unauthorized - 401');
        
        // 토큰 만료 시 재발급 api
        try {
          const newAccessToken = await refresh();
          err.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return api.request(err.config);
        } catch (refreshErr) {
          console.error('토큰 재발급 중 오류 발생', refreshErr);
          return Promise.reject(refreshErr);
        }

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

// 엑세스 토큰 재발급
export const refresh = async () => {
  try {
    const res = await api.post('/jwt/re-issue');
    
    if (res?.data) {
      let newAccessToken = res.data;
      console.log('토큰 재발급 성공', newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
    } else {
      throw new Error('No value present');
    }
  } catch (err) {
    console.error('토큰 재발급 실패', err);
    throw err;
  }
};