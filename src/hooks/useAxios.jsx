import { useState } from 'react';
import axios, { isAxiosError } from 'axios';

const useAxios = () => {
    const [data, setData] = useState(null);    // API 요청 결과 데이터 저장
    const [error, setError] = useState(null);  // 요청 중 발생한 에러 저장
    const [loading, setLoading] = useState(false);  // 로딩 상태 저장

    const fetchData = async (axiosParams, onError) => {
        setLoading(true); // 요청 시작 시 로딩 상태 설정
        try {
            const response = await axios.request(axiosParams);  // API 요청 수행
            setData(response.data);  // 응답 데이터 설정
        } catch (err) {
            if (isAxiosError(err)) {
                if (onError) {
                    onError(err);
                } else {
                    setError(err);
                    throw err; // 에러를 errorboundary에 던짐
                }
            } else {
                console.error('axios 외부 에러 발생:', err.message);
                throw err; // 에러를 errorboundary에 던짐
            }
        } finally {
            setLoading(false);  // 요청 완료 시 로딩 상태 설정
        }
    };

    return { data, error, loading, fetchData };
};

export default useAxios;
