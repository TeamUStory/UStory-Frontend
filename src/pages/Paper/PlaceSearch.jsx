import { useEffect, useState } from "react";
import styles from "./PlaceSearch.module.scss";
import SearchMapApi from "@/apis/MapApis/SearchMapApi";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import SubHeader from "@/components/SubHeader/SubHeader";
import SearchIcon from "@/assets/icons/SearchIcon";
import { useLocation, useNavigate } from "react-router-dom";

const PlaceSearch = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { paperId } = location.state || {};

    const [inputText, setInputText] = useState("");
    const [place, setPlace] = useState("");
    const [placeInfo, setPlaceInfo] = useState({});
    const [buttonVariant, setButtonVariant] = useState("disabled");

    // 페이지 들어오면 페이지 reload
    useEffect(() => {
        const hasReloaded = sessionStorage.getItem("hasReloaded");
        if (!hasReloaded) {
            sessionStorage.setItem("hasReloaded", "true");
            window.location.reload();
        }
    }, []);

    // 페이지 이동 시 sessionStorage 삭제
    useEffect(() => {
        return () => {
            sessionStorage.removeItem("hasReloaded");
        };
    }, [location]);

    const onChange = (e) => {
        setInputText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setPlace(inputText);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPlace(inputText);
    };

    // SearchMapApi에서 placeinfo 받아오기
    const updatePlaceInfo = (newPlaceInfo) => {
        setPlaceInfo(newPlaceInfo);
    };

    const handleAddClick = () => {
        localStorage.setItem("placeInfo", JSON.stringify(placeInfo));

        const destinationPath = paperId ? `/edit/paper/${paperId}` : "/register/paper";
        navigate(destinationPath, {
            state: { placeInfo }
        });
    };

    useEffect(() => {
        const isFormValid = Object.keys(placeInfo).length > 0;
        setButtonVariant(isFormValid ? "active" : "disabled");
    }, [placeInfo]);

    return (
        <div className={styles.allContainer}>
            <SubHeader pageTitle="장소 검색하기" />
            <div className={styles.contentsContainer}>
                <div className={styles.container}>
                    <div className={styles.searchContainer}>
                        <InputField placeholder="검색" onChange={onChange} value={inputText} onKeyPress={handleKeyPress} />
                        <Button type="submit" label={<SearchIcon />} variant="inactive" onClick={handleSubmit} />
                    </div>
                    <SearchMapApi height="219px" searchPlace={place} onUpdatePlaceInfo={updatePlaceInfo} />
                </div>
                <Button
                    type="button"
                    label="장소 선택"
                    variant={buttonVariant}
                    onClick={handleAddClick}
                />
            </div>
        </div>
    );
};

export default PlaceSearch;
