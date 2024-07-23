import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styles from "./RegisterDiary.module.scss";
import SubHeader from "@/components/SubHeader/SubHeader";
import InputField from "@/components/InputField/InputField";
import SelectBox from "@/components/SelectBox/SelectBox";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import DiaryImageUpload from "./DiaryImageUpload";
import Diary from "@/apis/api/Diary";
import useAxios from "@/hooks/useAxios";
import CompletedImage from "@/assets/images/completedImage.png";
import CancelImage from "@/assets/images/cancelImage.png";
import { setDiaryId, toggleModal, toggleBackModal, setButtonActive, setSelectedColor, setMembers, setImageUrl } from "@/redux/slices/diarySlice";
import { useDispatch, useSelector } from "react-redux";

// 카테고리
const categories = [
    { label: "연인", value: "COUPLE" },
    { label: "가족", value: "FAMILY" },
    { label: "친구", value: "FRIEND" },
    { label: "어스", value: "US" },
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
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, watch, control, reset } = useForm();
    const { selectedColor, members, isModalOpen, isBackModalOpen, buttonActive, diaryId } = useSelector((state) => state.diary);

    const { data: diaryNum, fetchData: fetchDiaryData } = useAxios();
    const watchAllFields = watch();

    const handleImageUrl = (url) => {
        dispatch(setImageUrl(url));
        setValue("imgUrl", url);
    };

    // 선택한 멤버들 목록 불러오기
    useEffect(() => {
        if (location.state && location.state.selectedMembers) {
            dispatch(setMembers(location.state.selectedMembers));
        } else if (location.state == undefined) {
            dispatch(setMembers([]));
            dispatch(setSelectedColor(""));
            dispatch(setDiaryId(0));
        }
    }, [location.state, dispatch]);

    // Members 업데이트될 때마다 폼 데이터도 업데이트
    useEffect(() => {
        setValue("users", members);
    }, [members, setValue]);

    // 로컬스토리지에서 formData 불러오기
    useEffect(() => {
        const savedData = localStorage.getItem("diaryFormData");
        if (savedData) {
            const formData = JSON.parse(savedData);
            setValue("name", formData.name);
            setValue("diaryCategory", formData.diaryCategory);
            setValue("description", formData.description);
            setValue("color", formData.color);
            setValue("imgUrl", formData.imgUrl);
            dispatch(setSelectedColor(markerColors.find((color) => color.color === formData.color)?.hexcode || ""));
            dispatch(setImageUrl(formData.imgUrl || "https://ustory-bucket.s3.ap-northeast-2.amazonaws.com/common/diary-profile.png"));
        }
    }, [setValue, dispatch]);

    // 변할때마다 localStorage에 저장
    useEffect(() => {
        const formData = {
            name: watch("name"),
            diaryCategory: watch("diaryCategory"),
            description: watch("description"),
            color: watch("color"),
            imgUrl: watch("imgUrl"),
            users: members,
        };

        localStorage.setItem("diaryFormData", JSON.stringify(formData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchAllFields, members]);

    // 모든 항목의 유효성 검사
    useEffect(() => {
        const isFormValid = Object.values(watchAllFields).every((value) => !!value) && members.length > 0;
        dispatch(setButtonActive(isFormValid ? "active" : "disabled"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchAllFields, dispatch]);

    // 다이어리 추가
    const onSubmit = async (data) => {
        await fetchDiaryData(Diary.postDiary(data));
        localStorage.removeItem("diaryFormData");
        localStorage.removeItem("selectedMembers");
        localStorage.removeItem("diaryImageURL");
        dispatch(toggleModal());
        dispatch(setSelectedColor(""));
        dispatch(setDiaryId(0));
        dispatch(setMembers([]));
        reset({
            name: "",
            diaryCategory: "",
            description: "",
            color: "",
            users: [],
        });
    };

    // 다이어리 아이디 가져오기
    useEffect(() => {
        if (diaryNum) {
            dispatch(setDiaryId(diaryNum.id));
        }
    }, [diaryNum, dispatch]);

    const handleButtonClick = (e) => {
        e.preventDefault();
        const formData = {
            name: watch("name"),
            diaryCategory: watch("diaryCategory"),
            description: watch("description"),
            color: watch("color"),
            imgUrl: watch("imgUrl"),
            users: members,
        };
        if (formData.name && formData.diaryCategory && formData.description && formData.color && formData.imgUrl && formData.users.length > 0) {
            handleSubmit(onSubmit)(formData);
        }
    };

    // 뒤로 가기 버튼 클릭
    const handleBackClick = () => {
        navigate("/diary");
        localStorage.removeItem("diaryFormData");
        localStorage.removeItem("selectedMembers");
        localStorage.removeItem("diaryImageURL");
        dispatch(setSelectedColor(""));
        dispatch(setDiaryId(0));
        reset({
            name: "",
            diaryCategory: "",
            description: "",
            color: "",
            users: [],
        });
        dispatch(toggleBackModal());
    };

    const closeModal = () => {
        dispatch(toggleModal());
        navigate(`/diary/${diaryId}`);
    };

    const closeBackModal = () => {
        dispatch(toggleBackModal());
    };

    return (
        <div className={styles.container}>
            <SubHeader pageTitle="다이어리 만들기" onClick={() => dispatch(toggleBackModal())} />
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField label="다이어리 이름" placeholder="다이어리 이름 입력" className={styles.input} {...register("name", { required: true })} />
                    <DiaryImageUpload onImageUrlChange={handleImageUrl} />
                    <Controller
                        name="diaryCategory"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <SelectBox
                                options={categories}
                                onChange={(e) => {
                                    field.onChange(e);
                                }}
                                value={watch("diaryCategory")}
                                label="카테고리"
                                defaultValue="카테고리"
                            />
                        )}
                    />
                    <Controller
                        name="color"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <div className={styles.markerColorSelect}>
                                <p>마커 색상</p>
                                <p className={styles.information}>선택한 색상으로 지도에 마커가 생성됩니다.</p>
                                <div className={styles.colorButtons}>
                                    {markerColors.map(({ color, hexcode }, index) => (
                                        <button
                                            type="button"
                                            key={index}
                                            className={selectedColor === hexcode ? styles.selected : ""}
                                            style={{
                                                backgroundColor: hexcode,
                                                borderColor: color === "WHITE" && selectedColor !== hexcode ? "#EEEEEE" : "",
                                            }}
                                            onClick={() => {
                                                dispatch(setSelectedColor(hexcode));
                                                field.onChange(color);
                                            }}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                        )}
                    />
                    <div className={styles.membersSelect}>
                        <div className={styles.title}>
                            <div className={styles.phrases}>
                                <p>멤버</p>
                                <p className={styles.information}>최대 10명까지</p>
                            </div>
                            <Link
                                to="/friend/search"
                                state={{
                                    formData: {
                                        name: watch("name"),
                                        diaryCategory: watch("diaryCategory"),
                                        description: watch("description"),
                                        color: watch("color"),
                                    },
                                    selectedMembers: members,
                                }}
                            >
                                <ArrowIcon fill="#000" />
                            </Link>
                        </div>
                        <div className={styles.selectedMembers}>
                            {members.map((member, index) => (
                                <div key={index} className={styles.selectedMember}>
                                    <input type="hidden" {...register(`users.${index}`)} value={member} />
                                    {member}
                                </div>
                            ))}
                        </div>
                    </div>
                    <InputField label="소개" placeholder="다이어리 소개 입력" id="diaryIntroduction" style={{ width: "100%" }} {...register("description")} />
                    <Button label="기록하기" variant={buttonActive} type="submit" onClick={handleButtonClick} />
                </form>
                {(isModalOpen || isBackModalOpen) && (
                    <Modal closeFn={isModalOpen ? closeModal : closeBackModal}>
                        <Modal.Icon>
                            <img src={isModalOpen ? CompletedImage : CancelImage} alt={isModalOpen ? "완료" : "뒤로가기"} />
                        </Modal.Icon>
                        <Modal.Body>
                            {isModalOpen ? (
                                <p>다이어리 추가가 완료되었습니다.</p>
                            ) : (
                                <p>
                                    정말로 뒤로 가시겠습니까?
                                    <br />
                                    지금까지 작성한 내용은 저장되지 않습니다.
                                </p>
                            )}
                        </Modal.Body>
                        <Modal.Button>
                            {isModalOpen ? (
                                <Button type="button" label="확인" variant="active" onClick={closeModal} />
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

RegisterDiary.propTypes = {
    selectedMembers: PropTypes.array,
};

export default RegisterDiary;
