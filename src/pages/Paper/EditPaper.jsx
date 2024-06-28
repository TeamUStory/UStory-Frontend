import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import styles from "./RegisterPaper.module.scss";
import SubHeader from "@/components/SubHeader/SubHeader";
import InputField from "@/components/InputField/InputField";
import PaperImageUpload from "./PaperImageUpload";
import Calender from "@/components/Calender/Calender";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { format } from "date-fns";
import MapApiPlace from "@/apis/MapApis/MapApiPlace";
import PlaceMark from "@/assets/icons/PlaceMark";
import useAxios from "@/hooks/useAxios";
import Paper from "@/apis/api/Paper";
import CompletedImage from "@/assets/images/completedImage.png";

const EditPaper = () => {
    const navigate = useNavigate();
    const { paperId } = useParams();
    const location = useLocation();
    const { register, handleSubmit, setValue, watch, control, reset } = useForm();
    const watchAllFields = watch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonActive, setButtonActive] = useState("disabled");
    const [placeInformation, setPlaceInformation] = useState(location.state?.placeInfo || {});
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [images, setImages] = useState([]);
    const [isLoadedFromStorage, setIsLoadedFromStorage] = useState(false);

    const { data: paperData, fetchData: fetchPaperData } = useAxios();
    const { fetchData: fetchUpdatedPaperData } = useAxios();

    // 로컬스토리지에 가져오기 않았을때 페이퍼 정보 조회
    useEffect(() => {
        const fetchData = async () => {
            if (!isLoadedFromStorage) {
                await fetchPaperData(Paper.getPaperDetail(paperId));
            }
        };
        fetchData();
    }, [fetchPaperData, paperId, isLoadedFromStorage]);

    // 수정할 정보 paperFormData에 넣기
    useEffect(() => {
        if (paperData && !isLoadedFromStorage) {
            setValue("title", paperData.title);
            setValue("visitedAt", new Date(paperData.visitedAt));
            setValue("thumbnailImageUrl", paperData.thumbnailImageUrl);
            setValue("imageUrls", paperData.imageUrls);
            setPlaceInformation({
                city: paperData.city,
                store: paperData.store,
                coordinateX: Number(paperData.coordinateX),
                coordinateY: Number(paperData.coordinateY),
            });
            setImages(paperData.imageUrls);
            setThumbnailUrl(paperData.thumbnailImageUrl);
            setIsLoadedFromStorage(true);
        }
    }, [paperData, setValue, setImages, setThumbnailUrl, isLoadedFromStorage]);

    // 로컬스토리지에서 formData 불러오기
    useEffect(() => {
        const savedData = localStorage.getItem("paperFormData");
        if (savedData) {
            const formData = JSON.parse(savedData);
            setValue("title", formData.title);
            setValue("visitedAt", new Date(formData.visitedAt));
            setValue("thumbnailImageUrl", formData.thumbnailImageUrl);
            setValue("imageUrls", formData.imageUrls);
            setPlaceInformation({
                city: formData.city,
                store: formData.store,
                coordinateX: Number(formData.coordinateX),
                coordinateY: Number(formData.coordinateY),
            });
            setIsLoadedFromStorage(true);
        }
    }, [setValue]);

    // 선택한 장소 정보 불러오기
    useEffect(() => {
        if (location.state && location.state.placeInfo) {
            setPlaceInformation(location.state.placeInfo);
        }
    }, [location.state]);

    // imageUrls, thumbnailImageUrl 변화 감지
    const handleImageUrlsChange = (newImageUrls, newThumbnail) => {
        setValue("imageUrls", newImageUrls);
        setValue("thumbnailImageUrl", newThumbnail);
    };

    // formData를 로컬스토리지에 저장
    useEffect(() => {
        const formData = {
            title: watch("title"),
            visitedAt: format(watch("visitedAt"), "yyyy/MM/dd"),
            city: placeInformation.address,
            store: placeInformation.store,
            coordinateX: Number(placeInformation.coordinateX),
            coordinateY: Number(placeInformation.coordinateY),
            thumbnailImageUrl: watch("thumbnailImageUrl"),
            imageUrls: watch("imageUrls"),
        };

        localStorage.setItem("paperFormData", JSON.stringify(formData));
    }, [watchAllFields, placeInformation]);

    // 모든 항목의 유효성 검사
    useEffect(() => {
        const isFormValid = Object.values(watchAllFields).every((value) => !!value);
        setButtonActive(isFormValid ? "active" : "disabled");
    }, [watchAllFields]);

    const onSubmit = async (data) => {
        const visitedAt = new Date(data.visitedAt);

        const postData = {
            title: data.title,
            visitedAt: format(visitedAt, "yyyy/MM/dd"),
            city: placeInformation.address,
            store: placeInformation.store,
            coordinateX: Number(placeInformation.coordinateX),
            coordinateY: Number(placeInformation.coordinateY),
            thumbnailImageUrl: data.thumbnailImageUrl,
            imageUrls: data.imageUrls,
        };
        await fetchUpdatedPaperData(Paper.putPaper(paperId, postData));
        setIsModalOpen(true);
    };

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        localStorage.removeItem("paperFormData");
        localStorage.removeItem("placeInfo");
        localStorage.removeItem("paperImageUrls");
        localStorage.removeItem("thumbnailImageUrl");
        navigate(`/papers/${paperId}`);
    };

    const handleRegisterClick = () => {
        closeModal();
    };

    const handlePlaceSearchClick = () => {
        const formData = {
            title: watch("title"),
            visitedAt: format(watch("visitedAt"), "yyyy/MM/dd"),
            thumbnailImageUrl: watch("thumbnailImageUrl"),
            imageUrls: watch("imageUrls"),
        };
        localStorage.setItem("paperFormData", JSON.stringify(formData));
        navigate("/search/place", { state: { paperId, formData } });
    };

    const handleBackClick = () => {
        navigate('/mypage/pagelist');
        localStorage.removeItem("paperFormData");
        localStorage.removeItem("placeInfo");
        localStorage.removeItem("paperImageUrls");
        localStorage.removeItem("thumbnailImageUrl");
    }

    return (
        <div className={styles.container}>
            <SubHeader pageTitle="수정하기" onClick={handleBackClick}/>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField label="제목" placeholder="제목 입력" className={styles.input} {...register("title", { required: true })} />
                    <PaperImageUpload onImageUrlsChange={handleImageUrlsChange} imgUrls={images} thumbnail={thumbnailUrl} />
                    <div className={styles.placeContainer}>
                        <p>장소</p>
                        <div className={styles.placeSearch} onClick={handlePlaceSearchClick}>
                            <InputField placeholder="장소 검색" className={styles.input} disabled value={placeInformation.store ? `${placeInformation.store}` : ""} />
                            <PlaceMark color="#AAAAAA" />
                        </div>
                        <MapApiPlace height="218px" coordinateX={placeInformation.coordinateX} coordinateY={placeInformation.coordinateY} />
                    </div>
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
                    <Button label="수정하기" variant={buttonActive} type="submit" onClick={handleButtonClick} />
                </form>
                {isModalOpen && (
                    <Modal closeFn={closeModal}>
                        <Modal.Icon>
                            <img src={CompletedImage} alt="완료" />
                        </Modal.Icon>
                        <Modal.Body>
                            <p>페이퍼 수정이 완료되었습니다.</p>
                        </Modal.Body>
                        <Modal.Button>
                            <Button type="button" label="확인" variant="active" onClick={handleRegisterClick} />
                        </Modal.Button>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default EditPaper;
