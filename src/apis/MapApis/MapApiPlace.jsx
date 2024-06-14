import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const MapApiPlace = ({ width = "100%", height = "344px", borderRadius = "20px", coordinateX, coordinateY, level = 4 }) => {
    const containerRef = useRef(null);
    const location = useLocation();
    const kakaoApiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;

    useEffect(() => {
        const scriptId = "kakao-map-script";
        
        if (!document.getElementById(scriptId)) {
            // Kakao 지도 API 스크립트 동적으로 추가
            const script = document.createElement("script");
            script.id = scriptId;
            script.async = true;
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false&libraries=drawing`;
            document.body.appendChild(script);

            script.onload = () => {
                window.kakao.maps.load(initializeMap);
            };
        } else {
            window.kakao.maps.load(initializeMap);
        }

        function initializeMap() {
            if (containerRef.current) {
                const defaultCoordinateX = coordinateX ? Number(coordinateX) : 37.566826;
                const defaultCoordinateY = coordinateY ? Number(coordinateY) : 126.9786567;

                const mapOption = {
                    center: new window.kakao.maps.LatLng(defaultCoordinateX, defaultCoordinateY),
                    level: level,
                };
                const map = new window.kakao.maps.Map(containerRef.current, mapOption);

                // 마커를 좌표가 있을 때만 생성
                if (coordinateX && coordinateY) {
                    const markerPosition = new window.kakao.maps.LatLng(defaultCoordinateX, defaultCoordinateY);
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition,
                    });

                    marker.setMap(map);
                }
            }
        }

        // 컴포넌트 언마운트 시에 스크립트 제거
        return () => {
            if (document.getElementById(scriptId)) {
                document.body.removeChild(document.getElementById(scriptId));
            }
        };
    }, [coordinateX, coordinateY, level, location.pathname, kakaoApiKey]);

    return <div ref={containerRef} key={`${coordinateX}-${coordinateY}-${location.pathname}`} id="map" style={{ width: width, height: height, borderRadius: borderRadius }}></div>;
};

MapApiPlace.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    borderRadius: PropTypes.string,
    coordinateX: PropTypes.node,
    coordinateY: PropTypes.node,
    level: PropTypes.number,
};

export default MapApiPlace;
