import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MapApi = ({ width = '100%', height = '344px', borderRadius = "20px" }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Kakao 지도 API 스크립트 동적으로 추가
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
        document.body.appendChild(script);

        // 스크립트가 로드된 후에 지도를 생성하도록 함
        script.onload = () => {
            window.kakao.maps.load(() => {
                if (containerRef.current) {
                    var map = new window.kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
                        center : new window.kakao.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표 
                        level : 14 // 지도의 확대 레벨 
                    });

                    var clusterer = new window.kakao.maps.MarkerClusterer({
                        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
                        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
                        minLevel: 10 // 클러스터 할 최소 지도 레벨 
                    });
                

                    function addClusterMarker (diaryImage, x, y) {
                        var marker = new kakao.maps.Marker({
                            position: new kakao.maps.LatLng(x, y)
                        });
                        var markerImage = new kakao.maps.MarkerImage(
                            diaryImage,
                            new kakao.maps.Size(40, 40)
                        );
                        marker.setImage(markerImage);
                        // marker.setClickable(true);

                        // 마커 클릭 가능하도록 설정
                        window.kakao.maps.event.addListener(marker, 'click', function() {
                            alert("클릭 테스트");
                            // displayInfowindow(marker, title);
                        });

                        clusterer.addMarker(marker);
                    }
                    
                    // 테스트 데이터
                    addClusterMarker('https://i.namu.wiki/i/HkXddAbypRkTfnkC6Zg8tt7WgseYiFc8lqY3GI3p9YkcrW6NPS9Eo4iT3GudyOz6qr5IUwArV3DZu1IydH9YbA.webp', 37.23, 126.67);
                    addClusterMarker('https://i.namu.wiki/i/4c9RUCMb7AZfT1DL15AcE-ZBQ_K7oDSkS9tDBAsxD93X7ZWoETUhRxL07fy5WLzE1blO8R7lxzCRCeQJ230bLg.webp', 37.10, 126.50);
                    addClusterMarker('https://i.namu.wiki/i/lT2DdjdyqFE5IuD_9uuyusuGd7EpgisaYSuVb-lwdoVZFHf2yh0nD5aNe4aLz7prnXKp5MhJl5WbCRHZJ0DPVA.webp', 37.30, 126.77);
                    
                     // 클러스터 클릭 가능하도록 설정
                    window.kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
                        // 현재 지도 레벨에서 1레벨 확대한 레벨
                        var level = map.getLevel()-1;

                        // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
                        map.setLevel(level, {anchor: cluster.getCenter()});
                    });
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
