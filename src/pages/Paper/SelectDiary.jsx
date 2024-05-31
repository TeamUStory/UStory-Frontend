import React, { useEffect, useState } from 'react';
import styles from './SelectDiary.module.scss'
import SubHeader from '@/components/SubHeader/SubHeader';
import InputField from '@/components/InputField/InputField';
import SearchIcon from '@//assets/icons/SearchIcon';
import RadioButton from '@/components/RadioButton/RadioButton';
import Button from '@/components/Button/Button';
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '../../assets/icons/SadIcon';

const SelectDiary = () => {
    // 라디오 버튼의 체크 상태를 관리하는 상태
    const [selectedDiary, setSelectedDiary] = useState(null);
    const [diaryExist, setDiaryExist] = useState(false);

    const diaries = [
        { name: '메타몽', category: '친구', src: '/src/assets/images/diaryBasicImage.png' },
        { name: '피카츄', category: '친구', src: '/src/assets/images/diaryBasicImage.png' },
        { name: '이브이', category: '친구', src: '/src/assets/images/diaryBasicImage.png' },
    ];

    const handleRadioButtonClick = (name) => {
        setSelectedDiary(name);
    };

    useEffect(() => {
        setDiaryExist(true);
    },[])

    return (
        <div className={styles.allContainer}>
            <SubHeader pageTitle="다이어리 선택하기" />
                <div className={styles.contentsContainer}>
                    <div className={styles.container}>
                        <div className={styles.diariesSearchContainer}>
                            <div className={styles.searchBox}>
                                <InputField placeholder="검색" />
                                <SearchIcon />
                            </div>
                            {diaryExist ? (
                                <div className={styles.diariesContainer}>
                                    {diaries.map((diary, index) => (
                                        <React.Fragment key={index}>
                                            <div className={styles.diaryContainer}>
                                                <div className={styles.diaryImage}>
                                                    <img src={diary.src} alt='멤버 기본이미지' />
                                                    <div className={styles.information}>
                                                        <p>{diary.name}</p>
                                                        <p className={styles.category}>{diary.category}</p>
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
                </div>
            <Button label="선택완료" variant={"active"} onChange ={()=><div></div>}/>
        </div>
    )
}

export default SelectDiary;
