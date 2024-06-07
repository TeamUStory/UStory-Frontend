import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
const { kakao } = window;

const SearchMapApi = ({ searchPlace }) => {
    const location = useLocation();
    const containerRef = useRef(null);
    const [noResult, setNoResult] = useState(false);
    let markers = []; // markers 배열을 정의합니다.

    useEffect(() => {
        // Kakao 지도 API 스크립트 동적으로 추가
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services,drawing&autoload=false`;
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
                    const ps = new window.kakao.maps.services.Places();

                    const displayPlaces = (places) => {
                        const listEl = document.getElementById('placesList');
                        const menuEl = document.getElementById('menu_wrap');
                        const fragment = document.createDocumentFragment();
                        const bounds = new window.kakao.maps.LatLngBounds();

                        // 검색 결과 목록에 추가된 항목들을 제거합니다
                        if (listEl) {
                            removeAllChildNodes(listEl);
                        }

                        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
                        function addMarker(position, idx) {
                            const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                                  imageSize = new window.kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                                  imgOptions = {
                                      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                                      spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                                      offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                                  },
                                  markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                                  marker = new kakao.maps.Marker({
                                      position: position, // 마커의 위치
                                      image: markerImage 
                                  });

                            marker.setMap(map); // 지도 위에 마커를 표출합니다
                            markers.push(marker); // 배열에 생성된 마커를 추가합니다
                            
                            return marker;
                        }

                        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
                        function removeAllChildNodes(el) {   
                            while (el.hasChildNodes()) {
                                el.removeChild(el.lastChild);
                            }
                        }

                        // 검색결과 항목을 Element로 반환하는 함수입니다
                        function getListItem(index, places) {
                            const el = document.createElement('li');
                            let itemStr = `<span class="markerbg marker_${index + 1}"></span>
                                           <div class="info">
                                               <h5>${places.place_name}</h5>`;
                            
                            if (places.road_address_name) {
                                itemStr += `<span>${places.road_address_name}</span>
                                            <span class="jibun gray">${places.address_name}</span>`;
                            } else {
                                itemStr += `<span>${places.address_name}</span>`;
                            }

                            el.innerHTML = itemStr;
                            el.className = 'item';
                            
                            return el;
                        }

                        for (let i = 0; i < places.length; i++) {
                            // 마커를 생성하고 지도에 표시합니다
                            const placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x);
                            const marker = addMarker(placePosition, i); 
                            const itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가합니다
                            bounds.extend(placePosition);

                            // 마커와 검색결과 항목에 mouseover 했을때 해당 장소에 인포윈도우에 장소명을 표시합니다
                            // mouseout 했을 때는 인포윈도우를 닫습니다
                            (function(marker, title) {
                                window.kakao.maps.event.addListener(marker, 'mouseover', function() {
                                    // displayInfowindow(marker, title);
                                });

                                window.kakao.maps.event.addListener(marker, 'mouseout', function() {
                                    // infowindow.close();
                                });

                                itemEl.onmouseover = function() {
                                    // displayInfowindow(marker, title);
                                };

                                itemEl.onmouseout = function() {
                                    // infowindow.close();
                                };
                            })(marker, places[i].place_name);

                            fragment.appendChild(itemEl);
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
                    }

                    const placesSearchCB = (data, status) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            setNoResult(false);
                            displayPlaces(data);
                        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                            setNoResult(true);
                        } else if (status === window.kakao.maps.services.Status.ERROR) {
                            console.log(status);
                        }
                    };
                    
                    // 장소 검색
                    if (searchPlace !== "") {                    
                        ps.keywordSearch(searchPlace, placesSearchCB);                       
                    }

                    // 지도 크기 변경 후 재배치
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
    }, [location.pathname, searchPlace]);

    return (
        <div>
            <div
                ref={containerRef}
                id="map"
                style={{ width: "100%", height: "219px", borderRadius: "20px" }}
            ></div>
            <div id="menu_wrap" className="bg_white">
                <ul id="placesList"></ul>
                <div id="pagination"></div>
            </div>
        </div>
    );
};

SearchMapApi.propTypes = {
    searchPlace: PropTypes.string
};

export default SearchMapApi;
