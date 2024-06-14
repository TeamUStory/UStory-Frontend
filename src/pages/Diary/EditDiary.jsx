import { useEffect, useState } from "react";
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
    const { id } = useParams();
    const { register, handleSubmit, setValue, watch, control, reset } = useForm();

    const [selectedColor, setSelectedColor] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [diaryCategory, setDiaryCategory] = useState("");
    const [diaryMembers, setDiaryMemebers] = useState([]);
    const [members, setMembers] = useState([]);
    const [buttonActive, setButtonActive] = useState("disabled");
    const [imgUrl, setImgUrl] = useState("");
    const [isIndividual, setIndividual] = useState(false);

    const { data: diaryData, fetchData: fetchDiaryData } = useAxios();
    const { fetchData: fetchUpdatedDiaryData } = useAxios();

    const watchAllFields = watch();

    // 다이어리 상세 정보 조회
    useEffect(() => {
        const fetchData = async () => {
            await fetchDiaryData(Diary.getDiaryDetail(id));
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 수정할 정보 diaryFormData에 넣기
    useEffect(() => {
        if (diaryData) {
            setValue("name", diaryData.name);
            setValue("description", diaryData.description);

            setValue("imgUrl", diaryData.imgUrl);
            setValue("diaryCategory", categories.find((category) => category.label === diaryData.diaryCategory)?.value || "");

            setValue("color", markerColors.find((colors) => colors.hexcode === diaryData.color)?.color);

            setSelectedColor(diaryData.color);
            setDiaryMemebers(diaryData.users.map((user) => user.nickname));
            setMembers(diaryData.users.map((user) => user.nickname));
            setDiaryCategory(categories.find((category) => category.label === diaryData.diaryCategory)?.value || "");
            setImgUrl(diaryData.imgUrl);
            if (diaryData.diaryCategory === "개인"){
                setIndividual(true);
            }
        }
    }, [diaryData]);

    // imageURl 받아오기
    const handleImageUrl = (url) => {
        setValue("imgUrl", url);
        setImgUrl(url);
    };

    // 선택한 멤버들 목록 불러오기
    useEffect(() => {
        if (location.state && location.state.selectedMembers) {
            const combinedMembers = [...diaryMembers, ...location.state.selectedMembers];
            setMembers(combinedMembers);
        }
    }, [location.state, diaryMembers]);

    // 변할때마다 localStorage에 저장
    useEffect(() => {
        const formData = {
            name: watch("name"),
            diaryCategory: isIndividual ? "INDIVIDUAL" : watch("diaryCategory"),
            description: watch("description"),
            color: watch("color"),
            imgUrl: imgUrl,
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
                imgUrl: imgUrl,
                users: members,
            };
            return Object.values(formFields).every((value) => !!value) && members.length > 0;
        };

        if (isIndividual && isFormValid()) {
            setButtonActive("active");
        } else {
            setButtonActive("disabled");
        }
    }, [watchAllFields, members]);

    // 다이어리 수정
    const onSubmit = async (data) => {
        localStorage.removeItem("diaryFormData");
        localStorage.removeItem("selectedMembers");
        localStorage.removeItem("diaryImageURL");
        await fetchUpdatedDiaryData(Diary.putDiary(id, data));
        setIsModalOpen(true);
        reset();
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        const formData = {
            name: watch("name"),
            diaryCategory: isIndividual ? "INDIVIDUAL" : watch("diaryCategory"),
            description: watch("description"),
            color: watch("color"),
            imgUrl: imgUrl,
            users: members,
        };
        if (formData.name && formData.diaryCategory && formData.description && formData.color && formData.imgUrl && formData.users.length > 0) {
            handleSubmit(onSubmit)(formData);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate(`/diary/${id}`);
    };

    return (
        <div className={styles.container}>
            <SubHeader pageTitle="다이어리 수정하기" />
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField label="다이어리 이름" placeholder="다이어리 이름 입력" className={styles.input} {...register("name", { required: true })} />
                    <DiaryImageUpload onImageUrlChange={handleImageUrl} imgUrl={imgUrl} />
                    {!isIndividual && <Controller
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
                    />}
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
                    {!isIndividual && <div className={styles.membersSelect}>
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
                                    diaryMembers: diaryMembers,
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
                    </div>}
                    <InputField label="소개" placeholder="다이어리 소개 입력" id="diaryIntroduction" style={{ width: "100%" }} {...register("description")} />
                    <Button label="수정하기" variant={buttonActive} type="submit" onClick={handleButtonClick} />
                </form>
                {isModalOpen && (
                    <Modal closeFn={closeModal}>
                        <Modal.Icon>
                            <img src="@/assets/images/completedImage.png" alt="완료" />
                        </Modal.Icon>
                        <Modal.Body>
                            <p>다이어리 수정이 완료되었습니다.</p>
                        </Modal.Body>
                        <Modal.Button>
                            <Button type="button" label="확인" variant="active" onClick={() => navigate(`/diary/${id}`)} />
                        </Modal.Button>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default EditDiary;
