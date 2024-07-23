import { useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import styles from "./RegisterDiary.module.scss";
import SubHeader from "@/components/SubHeader/SubHeader";
import InputField from "@/components/InputField/InputField";
import DiaryImageUpload from "./DiaryImageUpload";
import SelectBox from "@/components/SelectBox/SelectBox";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import Button from "@/components/Button/Button";
import Diary from "@/apis/api/Diary";
import useAxios from "@/hooks/useAxios";
import Modal from "@/components/Modal/Modal";
import CompletedImage from "@/assets/images/completedImage.png";
import CancelImage from "@/assets/images/cancelImage.png";
import { setSelectedColor, toggleModal, toggleBackModal, setButtonActive, setIsIndividual, setMembers, setImageUrl } from "@/redux/slices/diarySlice";
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

const EditDiary = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { register, handleSubmit, setValue, watch, control, reset } = useForm();
    const { selectedColor, members, isModalOpen, isBackModalOpen, buttonActive, imageUrl, isIndividual } = useSelector((state) => state.diary);

    const { data: diaryData, fetchData: fetchDiaryData } = useAxios();
    const { fetchData: fetchUpdatedDiaryData } = useAxios();

    const watchAllFields = watch();
    
    // 다이어리 상세 정보 조회
    useEffect(() => {
        const fetchData = async () => {
            await fetchDiaryData(Diary.getDiaryDetail(id));
        };
        fetchData();
    }, [fetchDiaryData, id]);

    // 수정할 정보 diaryFormData에 넣기
    useEffect(() => {
        if (diaryData) {
            setValue("name", diaryData.name);
            setValue("description", diaryData.description);
            setValue("imgUrl", diaryData.imgUrl);
            setValue("diaryCategory", categories.find((category) => category.label === diaryData.diaryCategory)?.value || "");
            setValue("color", markerColors.find((colors) => colors.hexcode === diaryData.color)?.color);
            
            dispatch(setMembers(diaryData.users.map((user) => user.nickname)));
            dispatch(setSelectedColor(diaryData.color));
            dispatch(setImageUrl(diaryData.imgUrl));
            dispatch(setIsIndividual(diaryData.diaryCategory === "개인"));
        }
    }, [diaryData, dispatch, setValue]);

    // imageURl 받아오기
    const handleImageUrl = (url) => {
        setValue("imgUrl", url);
        dispatch(setImageUrl(url));
    };

    // 선택한 멤버들 목록 불러오기
    useEffect(() => {
        if (location.state && location.state.selectedMembers) {
            const combinedMembers = [...members, ...location.state.selectedMembers];
            dispatch(setMembers(combinedMembers));
        }
    }, [location.state, members, dispatch]);

    // 변할때마다 localStorage에 저장
    useEffect(() => {
        const formData = {
            name: watch("name"),
            diaryCategory: isIndividual ? "INDIVIDUAL" : watch("diaryCategory"),
            description: watch("description"),
            color: watch("color"),
            imgUrl: imageUrl,
            users: members,
        };

        localStorage.setItem("diaryFormData", JSON.stringify(formData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchAllFields, members]);

    // 모든 항목의 유효성 검사
    useEffect(() => {
        const isFormValid = () => {
            const formFields = {
                name: watch("name"),
                description: watch("description"),
                color: watch("color"),
                imgUrl: imageUrl,
                users: members,
            };
            return Object.values(formFields).every((value) => !!value) && members.length > 0;
        };

        if (isFormValid()) {
            dispatch(setButtonActive("active"));
        } else {
            dispatch(setButtonActive("disabled"));
        }
    }, [watchAllFields, members, dispatch, watch, imageUrl]);

    // 다이어리 수정
    const onSubmit = async (data) => {
        localStorage.removeItem("diaryFormData");
        localStorage.removeItem("selectedMembers");
        localStorage.removeItem("diaryImageURL");

        const formData = {
            ...data,
            diaryCategory: isIndividual ? "INDIVIDUAL" : data.diaryCategory,
            users: members,
        };

        await fetchUpdatedDiaryData(Diary.putDiary(id, formData));
        dispatch(toggleModal());
        dispatch(setIsIndividual(true));
        reset({
            name: "",
            diaryCategory: "",
            description: "",
            color: "",
            users: [],
        });

    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        const formData = {
            name: watch("name"),
            diaryCategory: isIndividual ? "INDIVIDUAL" : watch("diaryCategory"),
            description: watch("description"),
            color: watch("color"),
            imgUrl: imageUrl,
            users: members,
        };
        if (formData.name && formData.description && formData.color && formData.imgUrl && formData.users.length > 0) {
            handleSubmit(onSubmit)(formData);
        }
    };

    // 뒤로 가기 버튼 클릭
    const handleBackClick = () => {
        navigate(`/diary/${id}`);
        localStorage.removeItem("diaryFormData");
        localStorage.removeItem("selectedMembers");
        localStorage.removeItem("diaryImageURL");
        reset({
            name: "",
            diaryCategory: "",
            description: "",
            color: "",
            users: [],
        });
        dispatch(toggleBackModal());
        dispatch(setIsIndividual(true));
    };

    const closeBackModal = () => {
        dispatch(toggleBackModal());
    };

    const closeModal = () => {
        dispatch(toggleModal());
        navigate(`/diary/${id}`);
    };

    return (
        <div className={styles.container}>
            <SubHeader pageTitle="다이어리 수정하기" onClick={() => dispatch(toggleBackModal())} />
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField label="다이어리 이름" placeholder="다이어리 이름 입력" className={styles.input} {...register("name", { required: true })} />
                    <DiaryImageUpload onImageUrlChange={handleImageUrl} imgUrl={imageUrl} />
                    {!isIndividual && (
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
                    )}
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
                    {!isIndividual && (
                        <div className={styles.membersSelect}>
                            <div className={styles.title}>
                                <div className={styles.phrases}>
                                    <p>멤버 </p>
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
                                        diaryMembers: members,
                                        id: id,
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
                    )}
                    <InputField label="소개" placeholder="다이어리 소개 입력" id="diaryIntroduction" style={{ width: "100%" }} {...register("description")} />
                    <Button label="수정하기" variant={buttonActive} type="submit" onClick={handleButtonClick} />
                </form>
                {(isModalOpen || isBackModalOpen) && (
                    <Modal closeFn={isModalOpen ? closeModal : closeBackModal}>
                        <Modal.Icon>
                            <img src={isModalOpen ? CompletedImage : CancelImage} alt={isModalOpen ? "완료" : "뒤로가기"} />
                        </Modal.Icon>
                        <Modal.Body>
                            {isModalOpen ? (
                                <p>다이어리 수정이 완료되었습니다.</p>
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

export default EditDiary;
