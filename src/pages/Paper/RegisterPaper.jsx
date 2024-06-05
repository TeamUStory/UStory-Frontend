import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPaper.module.scss'
import SubHeader from '@/components/SubHeader/SubHeader';
import InputField from '@/components/InputField/InputField';
import ProfileUpload from './ProfileUpload';
import Calender from '@/components/Calender/Calender';
import ArrowIcon from '@/assets/icons/ArrowIcon'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal';
import MapApi from '@/apis/api/MapApi';
import PlaceMark from '@/assets/icons/PlaceMark';

const RegisterPaper = () => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/paper')
    };

    const handleRegisterClick = () => {
        closeModal();
        navigate('/register/paper');
    }

    return (
        <div className={styles.container}>
            <SubHeader pageTitle="기록하기" /> 
            <div className={styles.formContainer}>
                <InputField
                    label="제목"
                    placeholder="제목 입력"
                    className={styles.input}
                />
                <div className={styles.diarySelect}>
                    <div className={styles.title}>
                            <p>다이어리</p>
                        <Button type="button" variant="inactive" label={<ArrowIcon fill="#000"/>} onClick={()=> navigate('/diaryselect')} />
                    </div>
                    <div className={styles.selectedDiary}>
                        깡냥꽁냥
                    </div>
                </div>
                <ProfileUpload />
                <div className={styles.selectDate}>
                    <p>날짜</p>
                    <Calender />    
                </div>
                <div className={styles.PlaceContainer}>
                    <p>장소</p>
                    <div className={styles.PlaceSearch}>
                        <InputField
                            placeholder="장소 검색"
                            className={styles.input}
                            disabled
                        />
                        <PlaceMark color = "#AAAAAA"/>
                    </div>
                    <MapApi height="218px"/>
                </div>
                <div className={styles.commentContainer}>
                    <InputField 
                        label="코멘트"
                        placeholder="장소에 대한 한 줄 코멘트 입력"
                        className={styles.input}
                    />
                </div>
                <Button label="기록하기" variant="disabled" onClick={handleButtonClick} />
                {isModalOpen && (
                    <Modal closeFn={closeModal}>
                            <Modal.Icon>
                                <img src="/src/assets/images/completedImage.png" alt="완료" />
                            </Modal.Icon>
                        <Modal.Body>
                            <p>장소 기록이 완료되었습니다.<br/>닫기 버튼을 누르면 등록한 기록 페이지로 넘어갑니다.</p>
                        </Modal.Body>
                        <Modal.Button>
                            <Button type="button" label="추가로 기록할래요." variant="active" onClick={handleRegisterClick} />
                        </Modal.Button>
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default RegisterPaper;