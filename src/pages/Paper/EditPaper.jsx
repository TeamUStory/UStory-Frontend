import { useEffect } from "react";
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
import CancelImage from "@/assets/images/cancelImage.png";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen, setIsBackModalOpen, setButtonActive, setPlaceInformation, setThumbnailUrl, setImages, setIsLoadedFromStorage } from "@/redux/slices/paperSlice";

const EditPaper = () => {
    const navigate = useNavigate();
    const { paperId } = useParams();
    const location = useLocation();
    const { register, handleSubmit, setValue, watch, control, reset } = useForm();
    const watchAllFields = watch();
    const dispatch = useDispatch();

    const { isModalOpen, isBackModalOpen, buttonActive, placeInformation, thumbnailUrl, images, isLoadedFromStorage } = useSelector((state) => state.paper);

    const { data: paperData, fetchData: fetchPaperData } = useAxios();
    const { fetchData: fetchUpdatedPaperData } = useAxios();

    useEffect(() => {
        if (isModalOpen) {
            dispatch(setIsModalOpen(false));
        }
        if (isBackModalOpen) {
            dispatch(setIsBackModalOpen(false));
        }
    }, [dispatch]);

    // 로컬스토리지에 가져오지 않았을때 페이퍼 정보 조회
    useEffect(() => {
        const fetchData = async () => {
            if (!isLoadedFromStorage && !localStorage.getItem("paperFormData")) {
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
            
            // placeInformation 업데이트
            dispatch(
                setPlaceInformation({
                    city: paperData.city,
                    store: paperData.store,
                    coordinateX: Number(paperData.coordinateX),
                    coordinateY: Number(paperData.coordinateY),
                })
            );
            
            // 로컬 스토리지에 저장된 데이터가 아닌 경우 이미지와 썸네일 URL 설정
            dispatch(setImages(paperData.imageUrls));
            dispatch(setThumbnailUrl(paperData.thumbnailImageUrl));
            
            // 상태 설정을 완료했음을 표시
            dispatch(setIsLoadedFromStorage(true));
        }
    }, [paperData, setValue, dispatch, isLoadedFromStorage]);
    
    // 로컬스토리지에서 formData 불러오기
    useEffect(() => {
        const savedData = localStorage.getItem("paperFormData");
        if (savedData) {
            const formData = JSON.parse(savedData);
            setValue("title", formData.title);
            setValue("visitedAt", new Date(formData.visitedAt));
            setValue("thumbnailImageUrl", formData.thumbnailImageUrl);
            setValue("imageUrls", formData.imageUrls);

        // 로컬 스토리지에서 불러온 데이터로 placeInformation 설정
        dispatch(
            setPlaceInformation({
                city: formData.city,
                store: formData.store,
                coordinateX: Number(formData.coordinateX),
                coordinateY: Number(formData.coordinateY),
            })
        );

        dispatch(setImages(formData.imageUrls));
        dispatch(setThumbnailUrl(formData.thumbnailImageUrl));

        dispatch(setIsLoadedFromStorage(true));
    }
}, [setValue, dispatch]);

    // 선택한 장소 정보 불러오기
    useEffect(() => {
        if (location.state && location.state.placeInfo) {
            dispatch(setPlaceInformation(location.state.placeInfo));
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
            city: placeInformation.city,
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
        dispatch(setButtonActive(isFormValid ? "active" : "disabled"));
    }, [watchAllFields]);

    const onSubmit = async (data) => {
        const visitedAt = new Date(data.visitedAt);

        const postData = {
            title: data.title,
            visitedAt: format(visitedAt, "yyyy/MM/dd"),
            city: placeInformation.city,
            store: placeInformation.store,
            coordinateX: Number(placeInformation.coordinateX),
            coordinateY: Number(placeInformation.coordinateY),
            thumbnailImageUrl: data.thumbnailImageUrl,
            imageUrls: data.imageUrls,
        };
        await fetchUpdatedPaperData(Paper.putPaper(paperId, postData));
        dispatch(setIsModalOpen(true));
    };

    const handleButtonClick = () => {
        dispatch(setIsModalOpen(true));
    };

    const closeModal = () => {
        dispatch(setIsModalOpen(false));
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
            city: placeInformation.city,
            store: placeInformation.store,
            coordinateX: placeInformation.coordinateX,
            coordinateY: placeInformation.coordinateY,
        };
        localStorage.setItem("paperFormData", JSON.stringify(formData));
        navigate("/search/place", { state: { paperId, formData } });
    };

    // 뒤로 가기 버튼 클릭
    const handleBackClick = () => {
        navigate("/mypage/pagelist");
        localStorage.removeItem("paperFormData");
        localStorage.removeItem("placeInfo");
        localStorage.removeItem("paperImageUrls");
        localStorage.removeItem("thumbnailImageUrl");
        reset({
            title:"",
            visitedAt: "",
            thumbnailUrl:"",
            imageUrls:[]
        });
        dispatch(setIsBackModalOpen(false));
        dispatch(setIsLoadedFromStorage(false));
    };

    const closeBackModal = () => {
        dispatch(setIsBackModalOpen(false));
    };

    return (
        <div className={styles.container}>
            <SubHeader pageTitle="수정하기" onClick={() => dispatch(setIsBackModalOpen(true))} />
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField label="제목" placeholder="제목 입력" className={styles.input} {...register("title", { required: true })} />
                    <PaperImageUpload onImageUrlsChange={handleImageUrlsChange} imgUrls={images} thumbnail={thumbnailUrl} />
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
                    <div className={styles.placeContainer}>
                        <p>장소</p>
                        <div className={styles.placeSearch} onClick={handlePlaceSearchClick}>
                            <InputField placeholder="장소 검색" className={styles.input} disabled value={placeInformation.store ? `${placeInformation.store}` : ""} />
                            <PlaceMark color="#AAAAAA" />
                        </div>
                        <MapApiPlace height="218px" coordinateX={placeInformation.coordinateX} coordinateY={placeInformation.coordinateY} />
                    </div>
                    <Button label="수정하기" variant={buttonActive} type="submit" onClick={handleButtonClick} />
                </form>
                {(isModalOpen || isBackModalOpen) && (
                    <Modal closeFn={isModalOpen ? closeModal : closeBackModal}>
                        <Modal.Icon>
                            <img src={isModalOpen ? CompletedImage : CancelImage} alt={isModalOpen ? "완료" : "뒤로가기"} />
                        </Modal.Icon>
                        <Modal.Body>
                            {isModalOpen ? (
                                <p>페이퍼 수정이 완료되었습니다.</p>
                            ) : (
                                <p>
                                    정말로 뒤로 가시겠습니까?
                                    <br />
                                    지금까지 수정한 내용은 저장되지 않습니다.
                                </p>
                            )}
                        </Modal.Body>
                        <Modal.Button>
                            {isModalOpen ? (
                                <Button type="button" label="확인" variant="active" onClick={handleRegisterClick} />
                            ) : (
                                <Button type="button" label="확인" variant="active" onClick={handleBackClick} />
                            )}
                        </Modal.Button>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default EditPaper;
