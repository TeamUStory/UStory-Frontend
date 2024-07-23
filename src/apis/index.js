import axios, { HttpStatusCode, isAxiosError } from 'axios';

axios.defaults.baseURL = 'https://api.ustory.me/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

export const api = axios.create();

// 엑세스 토큰 재발급
export const refresh = async () => {
  try {
    const res = await api.post('/jwt/re-issue');
    
    if (res?.data) {
      let newAccessToken = res.data.refreshAccessToken;
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

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); 

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    if (error.data instanceof FormData) {
      error.headers['Content-Type'] = 'multipart/form-data';
    }
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === HttpStatusCode.Unauthorized) {
          console.error('Unauthorized - 401');

          // 토큰 만료 시 재발급 api 호출 및 재시도 로직
          try {
            const newAccessToken = await refresh();
            if (newAccessToken) {
              error.config.headers.Authorization = `Bearer ${newAccessToken}`;
              return api.request(error.config);
            }
          } catch (refreshError) {
            console.error('토큰 재발급 중 오류 발생', refreshError);
            return Promise.reject(refreshError);
          }
        } else if (error.response.status === HttpStatusCode.BadRequest) {
          console.error('Bad Request - 400');
        } else if (error.response.status === HttpStatusCode.InternalServerError) {
          console.error('Internal Server Error - 500');
        } else if (error.response.status === HttpStatusCode.NotFound) {
          console.error('Not Found - 404');
        } else {
          console.error('Response Error: ', error.message);
        }
      } else {
        console.error('Response Error: ', error.message);
      }
    } else {
      console.error('axios 외부에서 발생한 에러: ', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;