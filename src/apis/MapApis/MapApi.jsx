import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';
import Paper from '@/apis/api/Paper';
import useAxios from '@/hooks/useAxios';
import PlaceMark from '@/assets/icons/PlaceMark'; // PlaceMark 컴포넌트 import
import ArrowIcon from '@/assets/icons/ArrowIcon';
import styles from './MapApi.module.scss';

const MapApi = ({ width = '100%', height = '344px', borderRadius = "20px" }) => {
    const containerRef = useRef(null);
    const { data: paperData, fetchData: fetchPaperData } = useAxios();

    // 유저 관련 데이터 조회
    const fetchPaperListAll = async () => {
        await fetchPaperData(Paper.getPaperListAll());
    }

    useEffect(() => {
        fetchPaperListAll();
    }, []);

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
                    const map = new window.kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
                        center: new window.kakao.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표 
                        level: 14 // 지도의 확대 레벨 
                    });

                    const clusterer = new window.kakao.maps.MarkerClusterer({
                        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
                        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
                        minLevel: 10 // 클러스터 할 최소 지도 레벨 
                    });

                    //paperData를 이용하여 클러스터 생성
                    function addClusterMarker(diaryImage, x, y, thumbnailImageUrl, store, paperId) {
                        const marker = new kakao.maps.Marker({
                            position: new kakao.maps.LatLng(x, y)
                        });

                        const markerImage = new kakao.maps.MarkerImage(
                            diaryImage,
                            new kakao.maps.Size(30, 45)
                        );
                        marker.setImage(markerImage);

                        const content = document.createElement('div');

                        const root = createRoot(content);

                        root.render(
                            <div className={styles.wrap}>
                                <div className={styles.info}>
                                    <div className={styles.title}>
                                        <div className={styles.close} title="닫기" onClick={closeOverlay}></div>
                                    </div>
                                    <div className={styles.body}>
                                        <div className={styles.img}>
                                            <img src={thumbnailImageUrl} alt="Thumbnail" />
                                        </div>
                                        <div className={styles.desc}>
                                            <div className={styles.ellipsis}>
                                              <PlaceMark /> 
                                              <a href={`/papers/${paperId}`} className={styles.link}>
                                                <span>{store}</span>
                                                <ArrowIcon fill="#FB8176" />
                                              </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );

                        const overlay = new kakao.maps.CustomOverlay({
                            content: content,
                            position: marker.getPosition(),
                            zIndex: 3 // 오버레이가 다른 요소보다 위에 표시되도록 함
                        });

                        // 오버레이 닫기 함수
                        function closeOverlay() {
                            overlay.setMap(null);
                        }

                        // // content 터치 시 상세 페이지로 이동
                        // content.addEventListener('click', (e) => {
          
                        //     overlay.setMap(map);
                        //     if (e.target.classList.contains(styles.link)) {
                        //         window.location.href = `/papers/${paperId}`;
                        //     }
                        // });

                        // // 다른 곳 누르면 오버레이 닫기
                        // kakao.maps.event.addListener(map, 'click', function () {
                        //     overlay.setMap(null);
                        // });

                        // 마커 클릭 가능하도록 설정
                        kakao.maps.event.addListener(marker, 'click', function () {
                            // 마커 클릭 시 오버레이 표시
                            overlay.setMap(map);
                        });

                        // 줌 변동 있을 때 오버레이 닫기
                        kakao.maps.event.addListener(map, 'zoom_changed', function () {
                            overlay.setMap(null);
                        });

                        clusterer.addMarker(marker);
                    }

                    if (paperData) {
                        paperData.forEach((paper) => {
                            addClusterMarker(
                                paper.diaryMarkerUrl,
                                paper.coordinateX,
                                paper.coordinateY,
                                paper.thumbnailImageUrl,
                                paper.store,
                                paper.paperId
                            );
                        });
                    }

                    // 클러스터 클릭 가능하도록 설정
                    kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {
                        // 현재 지도 레벨에서 1레벨 확대한 레벨
                        const level = map.getLevel() - 1;

                        // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
                        map.setLevel(level, { anchor: cluster.getCenter() });
                    });
                }
            });
        };

        // 컴포넌트 언마운트 시에 스크립트 제거
        return () => {
            document.body.removeChild(script);
        };
    }, [paperData]);

    return (
        <div
            ref={containerRef}
            id="map"
            style={{ width: width, height: height, borderRadius: borderRadius }}
        ></div>
    );
};

MapApi.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    borderRadius: PropTypes.string
};

export default MapApi;