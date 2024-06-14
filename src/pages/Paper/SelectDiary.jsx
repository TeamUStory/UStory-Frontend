import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SelectDiary.module.scss";
import SubHeader from "@/components/SubHeader/SubHeader";
import InputField from "@/components/InputField/InputField";
import SearchIcon from "@/assets/icons/SearchIcon";
import RadioButton from "@/components/RadioButton/RadioButton";
import Button from "@/components/Button/Button";
import NoResult from "@/components/NoResult/NoResult";
import SadIcon from "@/assets/icons/SadIcon";
import useAxios from "@/hooks/useAxios";
import Diary from "@/apis/api/Diary";

const SelectDiary = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { paperId } = location.state || {};

    const [selectedDiary, setSelectedDiary] = useState({ id: null, name: "" });
    const [diaries, setDiaries] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const { data: DiaryData, fetchData: fetchDiaryData } = useAxios();

    // 내가 속한 다이어리 목록 조회
    const fetchDiaryList = async (searchWord) => {
        const requestTime = new Date().toLocaleString("sv-SE", { timeZone: "Asia/Seoul" }).replace(" ", "T");
        const params = { requestTime, searchWord };
        await fetchDiaryData(Diary.getDiaryList(params));
    };

    // 페이지 처음 실행될때, 로컬스토리지에 있는 다이어리 목록 가져오기
    useEffect(() => {
        fetchDiaryList("");
        const savedSelectedDiary = JSON.parse(localStorage.getItem("selectedDiary")) || { id: null, name: "" };
        setSelectedDiary(savedSelectedDiary);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (DiaryData) {
            setDiaries(DiaryData);
        }
    }, [DiaryData]);

    // 다이어리 선택
    const handleRadioButtonClick = (diary) => {
        setSelectedDiary({ id: diary.id, name: diary.name });
        localStorage.setItem("selectedDiary", JSON.stringify({ id: diary.id, name: diary.name }));
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchClick = () => {
        fetchDiaryList(searchValue);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            fetchDiaryList(searchValue);
        }
    };

    // 선택한 다이어리 보내주기
    const handleAddClick = () => {
        const destinationPath = paperId ? `edit/paper/${paperId}` : `/register/paper`;
        navigate(destinationPath, { state: { paperId: paperId, selectedDiary: selectedDiary } });
    };

    return (
        <div className={styles.allContainer}>
            <SubHeader pageTitle="다이어리 선택하기" />
            <div className={styles.contentsContainer}>
                <div className={styles.container}>
                    <div className={styles.diariesSearchContainer}>
                        <div className={styles.searchBox}>
                            <InputField placeholder="검색" value={searchValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
                            <SearchIcon onClick={handleSearchClick} />
                        </div>
                        {diaries.length > 0 ? (
                            <div className={styles.diariesContainer}>
                                {diaries.map((diary, index) => (
                                    <React.Fragment key={index}>
                                        <div className={styles.diaryContainer}>
                                            <div className={styles.diaryImage}>
                                                <img src={diary.imgUrl} alt="멤버 기본이미지" />
                                                <div className={styles.information}>
                                                    <p>{diary.name}</p>
                                                    <p className={styles.category}>{diary.diaryCategory}</p>
                                                </div>
                                            </div>
                                            <RadioButton checked={selectedDiary.id === diary.id} onChange={() => handleRadioButtonClick(diary)} />
                                        </div>
                                        {index < diaries.length - 1 && <hr />}
                                    </React.Fragment>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.noResultContainer}>
                                <NoResult icon={<SadIcon stroke="#616161" />} message="앗, 검색 결과가 없습니다." />
                            </div>
                        )}
                    </div>
                </div>
                <Button label="선택 완료" variant={selectedDiary.id ? "active" : "disabled"} onClick={handleAddClick} disabled={!selectedDiary.id} />
            </div>
        </div>
    );
};

export default SelectDiary;
