import { useState } from 'react';
import styles from './RegisterDiary.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import InputField from '@/components/InputField/InputField';
import DiaryImageUpload from './DiaryImageUpload';
import SelectBox from '@/components/SelectBox/SelectBox';
import ArrowIcon from '@/assets/icons/ArrowIcon'
import Button from '@/components/Button/Button'
import { Link } from 'react-router-dom';

const EditDiary = () => {
    const categories = [  
        { label: "연인", value: "연인" },
        { label: "가족", value: "가족" },
        { label: "친구", value: "친구" },
        { label: "어스", value: "어스" }
    ];
    const markerColors = ["#FBB9C5", "#FDD0B1", "#FBB9C5", "#FDD0B1", "#FBB9C5", "#FDD0B1", "#F9EFC7",  "#FBB9C5", "#FDD0B1", "#F9EFC7"];
    const memebers = ["마자용", "그래용"];

    const [selectedColor, setSelectedColor] = useState("");

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    return (
        <div className={styles.container}>
            <SubHeader pageTitle="다이어리 수정하기" />
            <div className={styles.formContainer}>
                <InputField
                    label="다이어리 이름"
                    placeholder="다이어리 이름 입력"
                    className={styles.input}
                />
                <DiaryImageUpload />
                <SelectBox options={categories} value={categories.label} label="친구 선택" />
                <div className={styles.markerColorSelect}>
                    <p>마커 색상</p>
                    <p className={styles.information}>선택한 색상으로 지도에 마커가 생성됩니다.</p>
                    <div className={styles.colorButtons}>
                        {markerColors.map((color, index) => (
                            <button
                                key={index}
                                className={selectedColor === color ? styles.selected : ''}
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorSelect(color)}
                            ></button>
                        ))}
                    </div>
                </div>
                <div className={styles.membersSelect}>
                    <div className={styles.title}>
                        <div className={styles.phrases}>
                            <p>멤버 </p>
                            <p className={styles.information}>최대 10명까지</p>
                        </div>
                        <Link to="/memberselect">
                            <ArrowIcon fill="#000" />
                        </Link>
                    </div>
                    <div className={styles.selectedMembers}>
                        {memebers.map((member, index) => (
                            <div
                                key={index}
                                className={styles.selectedMember}
                            >{member}</div>
                        ))}    
                    </div>
                </div>
                <InputField
                    label="소개"
                    placeholder="다이어리 소개 입력"
                    id='diaryIntroduction'
                    style={{ width: '100%' }}
                />
                <Button label="수정하기" variant="disabled" />
            </div>
        </div>
    );
}

export default EditDiary;
