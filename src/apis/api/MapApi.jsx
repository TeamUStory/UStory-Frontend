import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MapApi = ({ width = '100%', height = '344px', borderRadius = "20px" }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Kakao 지도 API 스크립트 동적으로 추가
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
        document.body.appendChild(script);

        // 스크립트가 로드된 후에 지도를 생성하도록 함
        script.onload = () => {
            window.kakao.maps.load(() => {
                if (containerRef.current) {
                    const mapOption = {
                        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 9, // 지도의 확대 레벨
                    };
                    const map = new window.kakao.maps.Map(containerRef.current, mapOption);

                    // 크기를 변경한 이후에는 반드시 map.relayout 함수를 호출
                    const relayout = () => {
                        map.relayout();
                    };

                    // 예시: 지도 크기 변경 후 재배치
                    relayout();
                }
            });
        };

        // 컴포넌트 언마운트 시에 스크립트 제거
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            id="map"
            style={{ width: width, height: height, borderRadius: borderRadius}}
        ></div>
    );
};

MapApi.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    borderRadius: PropTypes.string
};

export default MapApi;
