import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import styles from './RegisterPaper.module.scss'
import SubHeader from '@/components/SubHeader/SubHeader';
import InputField from '@/components/InputField/InputField';
import PaperImageUpload from './PaperImageUpload';
import Calender from '@/components/Calender/Calender';
import ArrowIcon from '@/assets/icons/ArrowIcon'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal';
import { format } from "date-fns";
import MapApiPlace from "@/apis/MapApis/MapApiPlace";
import useAxios from "@/hooks/useAxios";
import Paper from "@/apis/api/Paper";

const EditPaper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { paperId } = useParams();
    const { register, handleSubmit, setValue, watch, control, reset } = useForm();
    const watchAllFields = watch();

    const [diary, setDiary] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonActive, setButtonActive] = useState("disabled");
    const [placeInformation, setPlaceInformation] = useState({});


    const {data: paperData, fetchData: fetchPaperData} = useAxios();
    const { fectchData: fetchUpdatedPaperData} = useAxios();

    // 페이퍼 상세 정보 조회
    useEffect(() => {
        const fetchData = async () => {
            await fetchPaperData(Paper.getPaperDetail(paperId));
        }
        fetchData();
    }, []);

    // 수정할 정보 paperFormData에 넣기
    useEffect(()=>{
        if (paperData){
            setValue("title", paperData.title);
            setValue("writerComment", paperData.writerComment);
            setValue("visitedAt", new Date(paperData.visitedAt));
            setValue("thumbnailImageUrl", paperData.thumbnailImageUrl);
            setValue("imageUrls", paperData.imageUrls);
        };
    })

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate(`/papers/${paperId}`)
    };

    const handleRegisterClick = () => {
        closeModal();
        navigate(`/papers/${paperId}`);
    }

    return (
        <div className={styles.container}>
            <SubHeader pageTitle="기록 수정하기" />
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
                <PaperImageUpload />
                <div className={styles.selectDate}>
                    <p>날짜</p>
                    <Calender />    
                </div>
                <div className={styles.PlaceContainer}>
                    <InputField
                        label ="장소"
                        placeholder="건물, 지번 또는 도로명 검색"
                        className={styles.input}
                    />
                    <MapApiPlace height="218px"/>
                </div>
                <Button label="수정하기" variant="disabled" onClick={handleButtonClick} />
                {isModalOpen && (
                    <Modal closeFn={closeModal}>
                            <Modal.Icon>
                                <img src="/src/assets/images/completedImage.png" alt="완료" />
                            </Modal.Icon>
                        <Modal.Body>
                            <p>장소 기록이 완료되었습니다.</p>
                        </Modal.Body>
                        <Modal.Button>
                            <Button type="button" label="수정하기" variant="active" onClick={handleRegisterClick} />
                        </Modal.Button>
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default EditPaper;