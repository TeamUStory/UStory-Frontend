import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import styles from "./SearchMapApi.module.scss";
import SadIcon from "../../assets/icons/SadIcon";

const SearchMapApi = ({ searchPlace, onUpdatePlaceInfo }) => {
    const location = useLocation();
    const containerRef = useRef(null);
    const [noResult, setNoResult] = useState(false);
    const [placeInfo, setPlaceInfo] = useState(JSON.parse(localStorage.getItem("placeInfo")) || {});
    let map = useRef(null);
    let markers = useRef([]);
    let overlays = useRef([]);

    const clearMarkers = () => {
        markers.current.forEach(marker => marker.setMap(null));
        markers.current = [];
    };

    const clearOverlays = () => {
        overlays.current.forEach(overlay => overlay.setMap(null));
        overlays.current = [];
    };

    useEffect(() => {
        const initializeMap = () => {
            const mapOption = {
                center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
                level: 9,
            };
            map.current = new window.kakao.maps.Map(containerRef.current, mapOption);

            if (!window.kakao.maps.services) {
                console.error("Kakao maps services library is not loaded.");
                return;
            }

            const ps = new window.kakao.maps.services.Places();

            const displayPlaces = (places) => {
                const listEl = document.getElementById("placesList");
                const menuEl = document.getElementById("menu_wrap");
                const fragment = document.createDocumentFragment();
                const bounds = new window.kakao.maps.LatLngBounds();

                if (listEl) {
                    removeAllChildNodes(listEl);
                }

                function addMarker(position, idx) {
                    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", 
                        imageSize = new window.kakao.maps.Size(36, 37),
                        imgOptions = {
                            spriteSize: new window.kakao.maps.Size(36, 691),
                            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
                            offset: new window.kakao.maps.Point(13, 37),
                        },
                        markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                        marker = new window.kakao.maps.Marker({
                            position: position,
                            image: markerImage,
                        });

                    marker.setMap(map.current);
                    markers.current.push(marker);

                    return marker;
                }

                function removeAllChildNodes(el) {
                    while (el.hasChildNodes()) {
                        el.removeChild(el.lastChild);
                    }
                }

                function getListItem(index, place) {
                    const el = document.createElement("li");
                    let itemStr = `<span class="${styles.markerbg} marker_${index + 1}}"></span>
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

                    (function (marker, place) {
                        window.kakao.maps.event.addListener(marker, "click", function () {
                            clearOverlays();

                            const customOverlay = new window.kakao.maps.CustomOverlay({
                                position: placePosition,
                                content: `<div class="${styles.wrap}"><div class="${styles.customOverlay}">${place.place_name}</div></div>`,
                                removable: true,
                            });

                            customOverlay.setMap(map.current, marker);
                            overlays.current.push(customOverlay);

                            map.current.setLevel(2);
                            map.current.panTo(marker.getPosition());

                            const newPlaceInfo = {
                                store: place.place_name,
                                address: place.road_address_name || place.address_name,
                                coordinateX: place.y,
                                coordinateY: place.x,
                            };
                            if (newPlaceInfo){
                                setPlaceInfo(newPlaceInfo);
                            }
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

            const placesSearchCB = (data, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    displayPlaces(data);
                    setNoResult(false);
                } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                    setNoResult(true);
                } else if (status === window.kakao.maps.services.Status.ERROR) {
                    console.log(status);
                }
            };

            if (searchPlace !== "") {
                clearMarkers();
                clearOverlays();
                ps.keywordSearch(searchPlace, placesSearchCB);
            }
        };

        // Kakao 지도 API 스크립트 동적으로 추가
        const script = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services,drawing&autoload=false`;
        document.body.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(initializeMap);
        };

        // 컴포넌트 언마운트 시 스크립트 제거 및 맵 클리어
        return () => {
            document.body.removeChild(script);
            clearMarkers();
            clearOverlays();
            if (map.current) {
                map.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, searchPlace]);

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
