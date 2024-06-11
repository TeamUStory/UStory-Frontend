import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const MapApi = ({ width = '100%', height = '344px', borderRadius = "20px", coordinateX, coordinateY}) => {
    const containerRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        // Kakao 지도 API 스크립트 동적으로 추가
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false&libraries=drawing`;
        document.body.appendChild(script);

        // 스크립트가 로드된 후에 지도를 생성하도록 함
        script.onload = () => {
            window.kakao.maps.load(() => {
                if (containerRef.current) {
                    const mapOption = { // 지도를 표시할 div
                        center : new window.kakao.maps.LatLng(coordinateX, coordinateY), // 지도의 중심좌표 
                        level : 4 // 지도의 확대 레벨 
                    };
                    const map = new window.kakao.maps.Map(containerRef.current, mapOption);
                    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다

                    const markerPosition  = new window.kakao.maps.LatLng(coordinateX, coordinateY); 
                    
                    // 마커를 생성합니다
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition
                    });

                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);
                }
            });
        };

        // 컴포넌트 언마운트 시에 스크립트 제거
        return () => {
            document.body.removeChild(script);
        };
    }, [coordinateX, coordinateY, location.pathname]);

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
    borderRadius: PropTypes.string,
    coordinateX:PropTypes.number,
    coordinateY:PropTypes.number,
};

export default MapApi;
