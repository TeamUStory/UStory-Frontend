import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./SearchMapApi.module.scss";
import SadIcon from "@/assets/icons/SadIcon";

const SearchMapApi = ({ searchPlace, onUpdatePlaceInfo }) => {
    const containerRef = useRef(null);
    const [noResult, setNoResult] = useState(false);
    const [placeInfo, setPlaceInfo] = useState({});
    const [servicesLoaded, setServicesLoaded] = useState(false); // Kakao Maps Services 로드 상태
    const map = useRef(null);
    const markers = useRef([]);
    const overlays = useRef([]);

    // 오버레이 초기화하는 함수
    const clearOverlays = () => {
        overlays.current.forEach((overlay) => overlay.setMap(null));
        overlays.current = [];
    };

    // 맵 초기화 함수
    const initializeMap = () => {
        const mapOption = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
            level: 9,
        };

        // 맵 객체 생성 및 초기화
        map.current = new window.kakao.maps.Map(containerRef.current, mapOption);

        // Kakao Places 서비스 객체 생성
        const ps = new window.kakao.maps.services.Places();

        // 장소 검색 결과를 화면에 표시하는 함수
        const displayPlaces = (places) => {
            const listEl = document.getElementById("placesList");
            const menuEl = document.getElementById("menu_wrap");
            const fragment = document.createDocumentFragment();
            const bounds = new window.kakao.maps.LatLngBounds();

            // 장소 리스트의 모든 자식 element 제거
            removeAllChildNodes(listEl);

            // 마커 추가하는 함수
            function addMarker(position, idx) {
                const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
                const imageSize = new window.kakao.maps.Size(36, 37);
                const imgOptions = {
                    spriteSize: new window.kakao.maps.Size(36, 691),
                    spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
                    offset: new window.kakao.maps.Point(13, 37),
                };
                const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
                const marker = new window.kakao.maps.Marker({
                    position: position,
                    image: markerImage,
                });

                marker.setMap(map.current);
                markers.current.push(marker);

                return marker;
            }

            // 장소 리스트를 생성하는 함수
            function getListItem(index, place) {
                const el = document.createElement("li");
                let itemStr = `<span class="${styles.markerbg} marker_${index + 1}"></span>
                          <p>${index + 1}</p>
                      <div class="${styles.info}">
                        <p>${place.place_name}</p>`;

                if (place.road_address_name) {
                    itemStr += `<span>${place.road_address_name}</span>
                                <span class="${styles.jibun_gray}"><p>지번</p>${place.address_name}</span>`;
                } else {
                    itemStr += `<span>${place.address_name}</span>`;
                }

                el.innerHTML = itemStr;
                el.className = "item";

                return el;
            }

            for (let i = 0; i < places.length; i++) {
                const placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x);

                const marker = addMarker(placePosition, i);
                const itemEl = getListItem(i, places[i]);

                bounds.extend(placePosition);

                // 마커 클릭 이벤트
                (function (marker, place) {
                    window.kakao.maps.event.addListener(marker, "click", function () {
                        clearOverlays();

                        // 커스텀 오버레이 생성 및 표시
                        const customOverlay = new window.kakao.maps.CustomOverlay({
                            position: placePosition,
                            content: `<div class="${styles.wrap}"><div class="${styles.customOverlay}">${place.place_name}</div></div>`,
                            removable: true,
                        });

                        customOverlay.setMap(map.current, marker);
                        overlays.current.push(customOverlay);

                        map.current.setLevel(2);
                        map.current.panTo(marker.getPosition());

                        // 선택된 장소 정보 업데이트
                        const newPlaceInfo = {
                            store: place.place_name,
                            address: place.road_address_name || place.address_name,
                            coordinateX: place.y,
                            coordinateY: place.x,
                        };
                        setPlaceInfo(newPlaceInfo);
                    });
                })(marker, places[i]);

                fragment.appendChild(itemEl);
                if (i < places.length - 1) {
                    const hr = document.createElement("hr");
                    fragment.appendChild(hr);
                }
            }

            if (listEl) {
                listEl.appendChild(fragment);
            }
            if (menuEl) {
                menuEl.scrollTop = 0;
            }

            map.current.setBounds(bounds);
        };

        // 모든 자식 노드를 제거하는 함수
        function removeAllChildNodes(el) {
            if (el) {
                while (el.hasChildNodes()) {
                    el.removeChild(el.lastChild);
                }
            }
        }

         // 장소 검색 콜백 함수
        const placesSearchCB = (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                displayPlaces(data);
                setNoResult(false);
            } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                setNoResult(true);
                removeAllChildNodes(document.getElementById("placesList"));
            } else if (status === window.kakao.maps.services.Status.ERROR) {
                console.log(status);
            }
        };

        if (searchPlace !== "") {
            ps.keywordSearch(searchPlace, placesSearchCB);
        }
    };

    // 카카오 맵 스크립트 로드
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services,drawing&autoload=false`;
        document.body.appendChild(script);

        // 카카오 맵 Services 로드 완료 시 상태 업데이트
        script.onload = () => {
            window.kakao.maps.load(() => {
                setServicesLoaded(true);
            });
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 카카오맵 Services 로드 완료 후 맵 초기화
    useEffect(() => {
        if (servicesLoaded) {
            initializeMap();
        }
    }, [servicesLoaded, searchPlace]);

    // 선택된 장소 정보가 업데이트될 때마다 부모 컴포넌트로 전달
    useEffect(() => {
        onUpdatePlaceInfo(placeInfo);
    }, [placeInfo, onUpdatePlaceInfo]);

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <div ref={containerRef} id="map" style={{ width: "100%", height: "219px", borderRadius: "20px" }}></div>
            {noResult ? (
                <div className={styles.noResultContainer}>
                    <SadIcon stroke={"#616161"} />
                    <p>검색결과가 없습니다.</p>
                </div>
            ) : (
                <div id="menu_wrap" className={styles.bg_white}>
                    <ul id="placesList"></ul>
                    <div id="pagination"></div>
                </div>
            )}
        </div>
    );
};

SearchMapApi.propTypes = {
    searchPlace: PropTypes.string,
    onUpdatePlaceInfo: PropTypes.func,
};

export default SearchMapApi;
