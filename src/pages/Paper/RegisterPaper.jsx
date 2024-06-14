import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styles from "./RegisterPaper.module.scss";
import SubHeader from "@/components/SubHeader/SubHeader";
import InputField from "@/components/InputField/InputField";
import PaperImageUpload from "./PaperImageUpload";
import Calender from "@/components/Calender/Calender";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import MapApiPlace from "@/apis/MapApis/MapApiPlace";
import PlaceMark from "@/assets/icons/PlaceMark";
import { format } from "date-fns";
import useAxios from "@/hooks/useAxios";
import Paper from "@/apis/api/Paper";

const RegisterPaper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, setValue, watch, control, reset } = useForm();
    const watchAllFields = watch();

    const [diary, setDiary] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonActive, setButtonActive] = useState("disabled");
    const [placeInformation, setPlaceInformation] = useState({});
    const [paperId, setPaperId] = useState(0);

    const { data: paperNum, fetchData: fetchPaperData } = useAxios();

    // imageUrls, thumbnailImageUrl 변화 감지
    const handleImageUrlsChange = (newImageUrls, newThumbnail) => {
        setValue("imageUrls", newImageUrls);
        setValue("thumbnailImageUrl", newThumbnail);
    };

    // 선택한 다이어리 불러오기
    useEffect(() => {
        if (location.state && location.state.selectedDiary && Object.keys(location.state.selectedDiary).length > 0) {
            setDiary(location.state.selectedDiary);
        }
    }, [location.state, setDiary]);

    // 장소 정보 불러오기
    useEffect(() => {
        const storedPlaceInfo = JSON.parse(localStorage.getItem("placeInfo")) || {};
        setPlaceInformation(storedPlaceInfo);
    }, []);

    // 로컬스토리지에서 formData 불러오기
    useEffect(() => {
        const savedData = localStorage.getItem("paperFormData");
        if (savedData) {
            const formData = JSON.parse(savedData);
            setValue("title", formData.title);
            setValue("writerComment", formData.writerComment);
            setValue("visitedAt", new Date(formData.visitedAt));
            setValue("thumbnailImageUrl", formData.thumbnailImageUrl);
            setValue("imageUrls", formData.imageUrls);
        }
    }, [setValue]);

    // formData를 로컬스토리지에 저장
    useEffect(() => {
        const formData = {
            title: watch("title"),
            diaryId: diary.id,
            diaryName: diary.name,
            visitedAt: format(watch("visitedAt"), "yyyy/MM/dd"),
            city: placeInformation.address,
            store: placeInformation.store,
            coordinateX: Number(placeInformation.coordinateX),
            coordinateY: Number(placeInformation.coordinateY),
            writerComment: watch("writerComment"),
            thumbnailImageUrl: watch("thumbnailImageUrl"),
            imageUrls: watch("imageUrls"),
        };

        localStorage.setItem("paperFormData", JSON.stringify(formData));
    }, [watchAllFields, diary, placeInformation]);

    // 모든 항목의 유효성 검사
    useEffect(() => {
        const isFormValid = Object.values(watchAllFields).every((value) => !!value);
        setButtonActive(isFormValid ? "active" : "disabled");
    }, [watchAllFields]);

    const onSubmit = async (data) => {
        const visitedAt = new Date(data.visitedAt);

        const postData = {
            title: data.title,
            diaryId: diary.id,
            visitedAt: format(visitedAt, "yyyy/MM/dd"),
            city: placeInformation.address,
            store: placeInformation.store,
            coordinateX: Number(placeInformation.coordinateX),
            coordinateY: Number(placeInformation.coordinateY),
            writerComment: data.writerComment,
            thumbnailImageUrl: data.thumbnailImageUrl,
            imageUrls: data.imageUrls,
        };
        await fetchPaperData(Paper.postPaper(postData));
        setIsModalOpen(true);
    };

    // 페이퍼 아이디 가져오기
    useEffect(() => {
        if (paperNum) {
            setPaperId(paperNum.paperId);
        }
    }, [paperNum]);

    const handleButtonClick = (e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate(`/papers/${paperId}`);
        reset();
        localStorage.removeItem("paperFormData");
        localStorage.removeItem("placeInfo");
        localStorage.removeItem("paperImageUrls");
        localStorage.removeItem("thumbnailImageUrl");
        localStorage.removeItem("selectedDiary");
    };

    const handleRegisterClick = () => {
        setIsModalOpen(false);
        reset();
        localStorage.removeItem("paperFormData");
        localStorage.removeItem("placeInfo");
        localStorage.removeItem("paperImageUrls");
        localStorage.removeItem("thumbnailImageUrl");
        localStorage.removeItem("selectedDiary");
    };

    const handlePlaceSearchClick = () => {
        navigate("/search/place");
    };

    return (
        <div className={styles.container}>
            <SubHeader pageTitle="기록하기" />
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField label="제목" placeholder="제목 입력" className={styles.input} {...register("title", { required: true })} />
                    <div className={styles.diarySelect}>
                        <div className={styles.title}>
                            <p>다이어리</p>
                            <Button type="button" variant="inactive" label={<ArrowIcon fill="#000" />} onClick={() => navigate("/diary/select")} />
                        </div>
                        {diary && Object.keys(diary).length > 0 && (
                            <div className={styles.selectedDiary}>
                                <p>{diary.name}</p>
                            </div>
                        )}
                    </div>
                    <hr />
                    <PaperImageUpload onImageUrlsChange={handleImageUrlsChange} />
                    <Controller
                        name="visitedAt"
                        control={control}
                        defaultValue={new Date()}
                        render={({ field }) => (
                            <div className={styles.selectDate}>
                                <p>날짜</p>
                                <Calender selectedDate={new Date(field.value)} onDateChange={(date) => field.onChange(date)} />
                            </div>
                        )}
                    />

                    <div className={styles.PlaceContainer}>
                        <p>장소</p>
                        <div className={styles.PlaceSearch} onClick={handlePlaceSearchClick}>
                            <InputField placeholder="장소 검색" className={styles.input} disabled value={placeInformation.store ? `${placeInformation.store}` : ""} />
                            <PlaceMark color="#AAAAAA" />
                        </div>
                        <MapApiPlace height="218px" coordinateX={placeInformation.coordinateX} coordinateY={placeInformation.coordinateY} />
                    </div>

                    <InputField label="코멘트" placeholder="장소에 대한 한 줄 코멘트 입력" className={styles.input} {...register("writerComment")} />
                    <Button label="기록하기" variant={buttonActive} type="submit" onClick={handleButtonClick} />
                </form>
                {isModalOpen && (
                    <Modal closeFn={closeModal}>
                        <Modal.Icon>
                            <img src="/src/assets/images/completedImage.png" alt="완료" />
                        </Modal.Icon>
                        <Modal.Body>
                            <p>
                                장소 기록이 완료되었습니다.
                                <br />
                                닫기 버튼을 누르면 등록한 기록 페이지로 넘어갑니다.
                            </p>
                        </Modal.Body>
                        <Modal.Button>
                            <Button type="button" label="추가로 기록할래요." variant="active" onClick={handleRegisterClick} />
                        </Modal.Button>
                    </Modal>
                )}
            </div>
        </div>
    );
};

RegisterPaper.propTypes = {
    selectedDiary: PropTypes.object,
};

export default RegisterPaper;
