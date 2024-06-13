import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import styles from "./SearchMapApi.module.scss";
import SadIcon from "../../assets/icons/SadIcon";

const SearchMapApi = ({ searchPlace, onUpdatePlaceInfo }) => {
    const location = useLocation();
    const containerRef = useRef(null);
    const [noResult, setNoResult] = useState(false);
    const [placeInfo, setPlaceInfo] = useState(
        JSON.parse(localStorage.getItem("placeInfo")) || {}
    );
    let markers = [];
    let overlays = [];

    useEffect(() => {
        // Kakao 지도 API 스크립트 동적으로 추가
        const script = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
            import.meta.env.VITE_KAKAO_MAP_API_KEY
        }&libraries=services,drawing&autoload=false`;
        document.body.appendChild(script);

        // 스크립트가 로드된 후에 지도를 생성하도록 함
        script.onload = () => {
            window.kakao.maps.load(() => {
                if (containerRef.current) {
                    const mapOption = {
                        center: new window.kakao.maps.LatLng(
                            37.564214,
                            127.001699
                        ), // 지도의 중심좌표
                        level: 9, // 지도의 확대 레벨
                    };
                    const map = new window.kakao.maps.Map(
                        containerRef.current,
                        mapOption
                    );

                    const ps = new window.kakao.maps.services.Places();

                    const displayPlaces = (places) => {
                        const listEl = document.getElementById("placesList");
                        const menuEl = document.getElementById("menu_wrap");
                        const fragment = document.createDocumentFragment();
                        const bounds = new window.kakao.maps.LatLngBounds();

                        // 검색 결과 목록에 추가된 항목 제거
                        if (listEl) {
                            removeAllChildNodes(listEl);
                        }

                        // 마커를 생성하고 지도 위에 마커를 표시하는 함수
                        function addMarker(position, idx) {
                            const imageSrc =
                                    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
                                imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
                                imgOptions = {
                                    spriteSize: new window.kakao.maps.Size(
                                        36,
                                        691
                                    ), // 스프라이트 이미지의 크기
                                    spriteOrigin: new window.kakao.maps.Point(
                                        0,
                                        idx * 46 + 10
                                    ), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                                    offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                                },
                                markerImage = new window.kakao.maps.MarkerImage(
                                    imageSrc,
                                    imageSize,
                                    imgOptions
                                ),
                                marker = new window.kakao.maps.Marker({
                                    position: position, // 마커의 위치
                                    image: markerImage,
                                });

                            marker.setMap(map); // 지도 위에 마커 표출
                            markers.push(marker); // 배열에 생성된 마커 추가

                            return marker;
                        }

                        // 검색결과 목록의 자식 Element 제거
                        function removeAllChildNodes(el) {
                            while (el.hasChildNodes()) {
                                el.removeChild(el.lastChild);
                            }
                        }

                        // 검색결과 항목을 Element로 반환
                        function getListItem(index, place) {
                            const el = document.createElement("li");
                            let itemStr = `<span class="${
                                styles.markerbg
                            } marker_${index + 1}}"></span>
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
                            // 마커를 생성 후 지도 표시
                            const placePosition = new window.kakao.maps.LatLng(
                                places[i].y,
                                places[i].x
                            );

                            const marker = addMarker(placePosition, i);
                            const itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element 생성

                            // 검색된 장소 위치를 기준으로 지도 범위를 재설정을 위한 LatLngBounds 객체에 좌표 추가
                            bounds.extend(placePosition);

                            // 마커를 클릭했을때, 커스텀 오버레이 나옴.
                            (function (marker, place) {
                                window.kakao.maps.event.addListener(
                                    marker,
                                    "click",
                                    function () {
                                        overlays.forEach((overlay) =>
                                            overlay.setMap(null)
                                        );

                                        const customOverlay =
                                            new window.kakao.maps.CustomOverlay(
                                                {
                                                    position: placePosition,
                                                    content: `<div class="${styles.wrap}"><div class="${styles.customOverlay}">${place.place_name}</div></div>`,
                                                    removable: true,
                                                }
                                            );

                                        // 마커 위에 커스텀오베러이 표시
                                        customOverlay.setMap(map, marker);
                                        overlays.push(customOverlay);

                                        map.setLevel(2);
                                        map.panTo(marker.getPosition());

                                        setPlaceInfo({
                                            store: place.place_name,
                                            address:
                                                place.road_address_name ||
                                                place.address_name,
                                            coordinatesX: place.x,
                                            coordinatesY: place.y,
                                        });
                                    }
                                );
                            })(marker, places[i]);

                            fragment.appendChild(itemEl);
                            if (i < places.length - 1) {
                                const hr = document.createElement("hr");
                                fragment.appendChild(hr);
                            }
                        }

                        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
                        if (listEl) {
                            listEl.appendChild(fragment);
                        }
                        if (menuEl) {
                            menuEl.scrollTop = 0;
                        }

                        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                        map.setBounds(bounds);
                    };

                    const placesSearchCB = (data, status) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            displayPlaces(data);
                            setNoResult(false);
                        } else if (
                            status ===
                            window.kakao.maps.services.Status.ZERO_RESULT
                        ) {
                            setNoResult(true);
                        } else if (
                            status === window.kakao.maps.services.Status.ERROR
                        ) {
                            console.log(status);
                        }
                    };

                    // 장소 검색
                    if (searchPlace !== "") {
                        ps.keywordSearch(searchPlace, placesSearchCB);
                    }
                }
            });
        };

        onUpdatePlaceInfo(placeInfo);
        // 컴포넌트 언마운트 시에 스크립트 제거
        return () => {
            document.body.removeChild(script);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, searchPlace, noResult]);

    return (
        <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
            <div
                ref={containerRef}
                id="map"
                style={{ width: "100%", height: "219px", borderRadius: "20px" }}
            ></div>
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
