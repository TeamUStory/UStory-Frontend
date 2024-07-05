import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import useMapApi from "@/hooks/useMapApi";

const MapApiPlace = ({ width = "100%", height = "344px", borderRadius = "20px", coordinateX, coordinateY, level = 4 }) => {
    const containerRef = useRef(null);
    const location = useLocation();

    // kakaoMapApi 불러오는 훅 세팅
    const mapApi = useMapApi('drawing');

    useEffect(() => {
        const initializeMap = () => {
            if (containerRef.current && window.kakao && window.kakao.maps) {
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
        };

        if (mapApi) {
            initializeMap();
        }

        // 컴포넌트 언마운트 시에 스크립트 제거
        return () => {
            if (document.getElementById("kakao-map-script")) {
                document.body.removeChild(document.getElementById("kakao-map-script"));
            }
        };
    }, [coordinateX, coordinateY, level, location.pathname, mapApi]);

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
