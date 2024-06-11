import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './RegisterDiary.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import InputField from '@/components/InputField/InputField';
import DiaryImageUpload from './DiaryImageUpload';
import SelectBox from '@/components/SelectBox/SelectBox';
import ArrowIcon from '@/assets/icons/ArrowIcon';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';

// 카테고리
const categories = [  
    { label: "개인", value: "INDIVIDUAL" },
    { label: "연인", value: "COUPLE" },
    { label: "가족", value: "FAMILY" },
    { label: "친구", value: "FRIEND" },
    { label: "어스", value: "US" }
];

// 마커 색깔
const markerColors = [
    { color: "RED", hexcode: "#FBB9C5" },
    { color: "ORANGE", hexcode: "#FDD0B1" },
    { color: "YELLOW", hexcode: "#F9EFC7" },
    { color: "GREEN", hexcode: "#C3EDBF" },
    { color: "BLUE", hexcode: "#B8DFE6" },
    { color: "INDIGO", hexcode: "#A3C4F3" },
    { color: "PURPLE", hexcode: "#C5BBDE" },
    { color: "BLACK", hexcode: "#656565" },
    { color: "GRAY", hexcode: "#DADADA" },
    { color: "WHITE", hexcode: "#FFFFFF" },
];

const RegisterDiary = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedColor, setSelectedColor] = useState("");
    const [members, setMembers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // 선택한 멤버들 목록 불러오기
    useEffect(() => {
        if (location.state && location.state.selectedMembers) {
            setMembers(location.state.selectedMembers);
        }
    }, [location.state]);

    const handleColorSelect = (hexcode) => {
        setSelectedColor(hexcode);
    };

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <SubHeader pageTitle="다이어리 만들기" />
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
                        {markerColors.map(({ hexcode }, index) => (
                            <button
                                key={index}
                                className={selectedColor === hexcode ? styles.selected : ''}
                                style={{ backgroundColor: hexcode }}
                                onClick={() => handleColorSelect(hexcode)}
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
                        <Link to="/friend/search">
                            <ArrowIcon fill="#000" />
                        </Link>
                    </div>
                    <div className={styles.selectedMembers}>
                        {members.map((member, index) => (
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
                    id="diaryIntroduction"
                    style={{ width: '100%' }}
                />
                <Button label="기록하기" variant="disabled" onClick={handleButtonClick} />
                {isModalOpen && (
                    <Modal closeFn={closeModal}>
                        <Modal.Icon>
                            <img src="/src/assets/images/completedImage.png" alt="완료" />
                        </Modal.Icon>
                        <Modal.Body>
                            <p>다이어리 추가가 완료되었습니다.</p>
                        </Modal.Body>
                        <Modal.Button>
                            <Button type="button" label="확인" variant="active" onClick={() => navigate('/diary')} />
                        </Modal.Button>
                    </Modal>
                )}
            </div>
        </div>
    );
};

RegisterDiary.propTypes = {
    selectedMembers: PropTypes.array
}

export default RegisterDiary;
