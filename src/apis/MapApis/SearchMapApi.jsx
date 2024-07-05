import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./SearchMapApi.module.scss";
import SadIcon from "@/assets/icons/SadIcon";
import useMapApi from "@/hooks/useMapApi";

const SearchMapApi = ({ searchPlace, onUpdatePlaceInfo }) => {
    const containerRef = useRef(null);
    const [noResult, setNoResult] = useState(false);
    const [placeInfo, setPlaceInfo] = useState({});
    const map = useRef(null);
    const markers = useRef([]);
    const overlays = useRef([]);
    const markerItems = useRef([]);

    // kakaoMapApi 불러오는 훅 세팅
    const mapApi = useMapApi('services,drawing');

    // 오버레이 초기화하는 함수
    const clearOverlays = () => {
        overlays.current.forEach((overlay) => overlay.setMap(null));
        overlays.current = [];
    };

    // 마커 초기화하는 함수
    const clearMarkers = () => {
        markers.current.forEach((marker) => marker.setMap(null));
        markers.current = [];
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

            markers.current = [];
            markerItems.current = [];

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

                // 장소 item 선택시 marker 클릭 이벤트
                itemEl.addEventListener("click", () => {
                    window.kakao.maps.event.trigger(marker, "click");
                });

                markerItems.current.push({ marker, itemEl });

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

        // 모든 자식 노드 제거하는 함수
        function removeAllChildNodes(el) {
            if (el) {
                while (el.hasChildNodes()) {
                    el.removeChild(el.lastChild);
                }
            }
        }

        // 페이지 번호 표시하는 함수
        function displayPagination(pagination) {
            var paginationEl = document.getElementById("pagination"),
                fragment = document.createDocumentFragment(),
                i;

            // 기존에 추가된 페이지번호 삭제
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild);
            }

            for (i = 1; i <= pagination.last; i++) {
                var el = document.createElement("a");
                el.innerHTML = i;

                if (i === pagination.current) {
                    el.className = styles.on;
                } else {
                    el.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i);
                            clearOverlays();
                            clearMarkers();
                        };
                    })(i);
                }

                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }

        // 장소 검색 콜백 함수
        const placesSearchCB = (data, status, pagination) => {
            if (status === window.kakao.maps.services.Status.OK) {
                displayPlaces(data);
                setNoResult(false);
                displayPagination(pagination);
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
    
    useEffect(() => {
        if (mapApi) {
            initializeMap();
        }
    }, [mapApi, searchPlace]);

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
                    <div id="pagination" className={styles.pagination}></div>
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
