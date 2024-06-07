import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SelectDiary.module.scss'
import SubHeader from '@/components/SubHeader/SubHeader';
import InputField from '@/components/InputField/InputField';
import SearchIcon from '@//assets/icons/SearchIcon';
import RadioButton from '@/components/RadioButton/RadioButton';
import Button from '@/components/Button/Button';
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '@/assets/icons/SadIcon';
import useAxios from "@/hooks/useAxios";
import Diary from "@/apis/api/Diary";

const SelectDiary = () => {
    const navigate = useNavigate();

    const [selectedDiary, setSelectedDiary] = useState(null);
    const [diaries, setDiaries] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const {data: DiaryData, fetchData: fetchDiaryData} = useAxios();

    // 내가 속한 다이어리 목록 조회
    const fetchDiaryList = async (diaryname) => {
    const fetchDiaryList = async () => {
        const requestTime = new Date().toISOString().split('.')[0];
        const params = {requestTime};
        await fetchDiaryData(Diary.getDiaryList(params))
    };

    useEffect(() => {
        fetchDiaryList('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(DiaryData){
            setDiaries(DiaryData);
        }
    }, [DiaryData]);

    const handleRadioButtonClick = (name) => {
        setSelectedDiary(name);
    };

    const handleInputChange = (e) => {
        if(e.target.value == ""){
            fetchDiaryList('');
        }
        setSearchValue(e.target.value);
    };
    
    const handleSearchClick = () => {
        fetchDiaryList(searchValue);
    };
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchDiaryList(searchValue);
        }
    };

    const handleAddClick = () => {
        navigate('/register/paper',{state : {setSelectedDiary}});
    }


    return (
        <div className={styles.allContainer}>
            <SubHeader pageTitle="다이어리 선택하기" />
                <div className={styles.contentsContainer}>
                    <div className={styles.container}>
                        <div className={styles.diariesSearchContainer}>
                            <div className={styles.searchBox}>
                                <InputField placeholder="검색" value={searchValue} onChange={handleInputChange} onKeyPress={handleKeyPress}  />
                                <SearchIcon  onClick={handleSearchClick} />
                            </div>
                            {diaries.length > 0 ? (
                                <div className={styles.diariesContainer}>
                                    {diaries.map((diary, index) => (
                                        <React.Fragment key={index}>
                                            <div className={styles.diaryContainer}>
                                                <div className={styles.diaryImage}>
                                                    <img src={diary.imgUrl} alt='멤버 기본이미지' />
                                                    <div className={styles.information}>
                                                        <p>{diary.name}</p>
                                                        <p className={styles.category}>{diary.diaryCategory}</p>
                                                    </div>
                                                </div>
                                                <RadioButton 
                                                    checked={selectedDiary === diary.name} 
                                                    onChange={() => handleRadioButtonClick(diary.name)} 
                                                />
                                            </div>
                                            {index < diaries.length - 1 && <hr/>}
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
                    <Button label="선택 완료" variant="disabled" onClick={handleAddClick}/>
                </div>
        </div>
    )
}

export default SelectDiary;
