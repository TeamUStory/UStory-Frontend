import { useState, useCallback } from 'react';
import { isAxiosError } from 'axios';
import { useErrorBoundary } from 'react-error-boundary';
import { api } from "@/apis/index";

const useAxios = () => {
    const [data, setData] = useState(null);    // API 요청 결과 데이터 저장
    const [loading, setLoading] = useState(false);  // 로딩 상태 저장
    const { showBoundary } = useErrorBoundary();

    // fetch Data onError를 선택할 수 있는 인자로 넘기기 => errorboundary를 사용하기 위함
    // onError를 안쓸때 생각
    // axiosParams
    const fetchData = useCallback(async (axiosParams, onError) => {
        setLoading(true); // 요청 시작 시 로딩 상태 설정

        try {
            const response = await api.request(axiosParams);  // API 요청 수행
            setData(response.data);  // 응답 데이터 설정
        } catch (err) {
            if (isAxiosError(err)) {
                if (onError) {
                    onError(err);
                } else {
                    showBoundary(err);
                }
            } else {
                console.error('알수없는 에러 발생 :', err.message);
                showBoundary(err);
            }
        } finally {
            setLoading(false);  // 요청 완료 시 로딩 상태 설정
        }
    }, [showBoundary]);

    return { data, loading, fetchData };
};

export default useAxios;