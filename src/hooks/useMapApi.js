import { useEffect, useState } from 'react';

const useMapApi = (libraries) => {
    const [isApiLoaded, setIsApiLoaded] = useState(false);
    const kakaoApiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;

    useEffect(() => {
        const scriptId = 'kakao-map-script';

        const loadKakaoMapScript = () => {
            if (!document.getElementById(scriptId)) {
                const script = document.createElement('script');
                script.id = scriptId;
                script.async = true;
                script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=${libraries}&autoload=false`;
                document.body.appendChild(script);

                script.onload = () => {
                    window.kakao.maps.load(() => {
                        setIsApiLoaded(true);
                    });
                };
            } else {
                window.kakao.maps.load(() => {
                    setIsApiLoaded(true);
                });
            }
        };

        loadKakaoMapScript();

        return () => {
            if (document.getElementById(scriptId)) {
                document.body.removeChild(document.getElementById(scriptId));
            }
        };
    }, [kakaoApiKey, libraries]);

    return isApiLoaded;
};

export default useMapApi;
