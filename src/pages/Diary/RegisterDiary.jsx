import { useEffect, useState } from "react";
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
    const { register, handleSubmit, setValue, watch, control, reset } = useForm();
    const [selectedColor, setSelectedColor] = useState("");
    const [diaryCategory, setDiaryCategory] = useState("");
    const [members, setMembers] = useState(location.state?.selectedMembers || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonActive, setButtonActive] = useState("disabled");
    const [diaryId, setDiaryId] = useState(0);

    const { data: diaryNum, fetchData: fetchDiaryData } = useAxios();
    const watchAllFields = watch();

    const handleImageUrl = (url) => {
        setValue("imgUrl", url);
    };

    // 맨처음 들어왔을때 localstorage 지우기
    useEffect(() => {
        localStorage.removeItem("diaryFormData");
        localStorage.removeItem("selectedMembers");
        localStorage.removeItem("diaryImageURL");
        reset();
    }, []);

    // 선택한 멤버들 목록 불러오기
    useEffect(() => {
        if (location.state && location.state.selectedMembers) {
            setMembers(location.state.selectedMembers);
        }
    }, [location.state]);

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
            setDiaryCategory(formData.diaryCategory);
            setSelectedColor(markerColors.find((color) => color.color === formData.color)?.hexcode || "");
        }
    }, [setValue]);

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
        const isFormValid = Object.values(watchAllFields).every((value) => !!value);
        if (!isFormValid) {
            setButtonActive("disabled");
        } else {
            setButtonActive("active");
        }
    }, [watchAllFields]);

    // 다이어리 추가
    const onSubmit = async (data) => {
        localStorage.removeItem("diaryFormData");
        localStorage.removeItem("selectedMembers");
        localStorage.removeItem("diaryImageURL");
        await fetchDiaryData(Diary.postDiary(data));
        setIsModalOpen(true);
        reset();
    };

    // 다이어리 아이디 가져오기
    useEffect(() => {
        if (diaryNum) {
            setDiaryId(diaryNum.id);
        }
    }, [diaryNum]);

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

    const closeModal = () => {
        setIsModalOpen(false);
        navigate(`/diary/${diaryId}`);
    };

    return (
        <div className={styles.container}>
            <SubHeader pageTitle="다이어리 만들기" />
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
                                    setDiaryCategory(e.target.value);
                                    field.onChange(e);
                                }}
                                value={diaryCategory}
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
                                            }}
                                            onClick={() => {
                                                setSelectedColor(hexcode);
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
                {isModalOpen && (
                    <Modal closeFn={closeModal}>
                        <Modal.Icon>
                            <img src="/src/assets/images/completedImage.png" alt="완료" />
                        </Modal.Icon>
                        <Modal.Body>
                            <p>다이어리 추가가 완료되었습니다.</p>
                        </Modal.Body>
                        <Modal.Button>
                            <Button type="button" label="확인" variant="active" onClick={() => navigate(`/diary/${diaryId}`)} />
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
