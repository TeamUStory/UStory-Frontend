import { useState, useEffect } from 'react';
import { api } from '../apis/index';
import { isAxiosError } from 'axios';

const useAxios = (url, onError) => {
    const [data, setData] = useState(null);    // API 요청 결과 데이터 저장
    const [error, setError] = useState(null);  // 요청 중 발생한 에러 저장
    const [loading, setLoading] = useState(true);  // 로딩 상태 저장

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api(url);  // axios 인스턴스를 사용하여 API 요청 수행
            setData(response.data);  // 응답 데이터 설정
          } catch (err) {
            if (isAxiosError(err)) {
              if (onError) {
                onError(err);
              } else {
                setError(err);
              }
            } else {
              console.error('axios 외부 에러 발생:', err.message);
            }
          } finally {
            setLoading(false);  // 로딩 상태 설정
          }
        };
    
        fetchData();
    }, [url, onError]);

    return { data, error, loading };
};

export default useAxios;