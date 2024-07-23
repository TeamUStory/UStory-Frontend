import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./DiaryImageUpload.module.scss";
import CameraIcon from "@/assets/icons/CameraIcon";
import ImageEditor from "@/components/ImageEditor/ImageEditor";
import useAxios from "@/hooks/useAxios";
import S3Storage from "@/apis/api/S3Storage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setImageUrl } from "@/redux/slices/diarySlice";

const basicDiaryImageUrl = "https://ustory-bucket.s3.ap-northeast-2.amazonaws.com/common/diary-profile.png";

const DiaryImageUpload = () => {
    const dispatch = useDispatch();
    const imageUrl = useSelector((state) => state.diary.imageUrl);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [presignedUrl, setPresignedUrl] = useState(null);
    const { data: presignedUrlData, fetchData: fetchPresignedUrlData } = useAxios();
    const fileInputRef = useRef(null);

    useEffect(() => {
        const savedImageUrl = localStorage.getItem("diaryImageURL");
        if (savedImageUrl) {
            dispatch(setImageUrl(savedImageUrl));
        } else {
            dispatch(setImageUrl(basicDiaryImageUrl));
        }
    }, [dispatch]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(file.name)) {
            alert("jpg, jpeg, png, gif 확장자만 허용됩니다.");
            return;
        }

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = () => {
            setUploadedImage(reader.result);
            setIsModalOpen(true);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (croppedImage) {
            const fetchPresignedUrl = async () => {
                await fetchPresignedUrlData(S3Storage.getImageUrl(fileName));
            };
            fetchPresignedUrl();
        }
    }, [fetchPresignedUrlData, fileName, croppedImage]);

    useEffect(() => {
        if (presignedUrlData) {
            setPresignedUrl(presignedUrlData.presignedUrl);
        }
    }, [presignedUrlData]);

    useEffect(() => {
        if (presignedUrl && croppedImage) {
            const uploadImage = async () => {
                try {
                    const response = await axios.put(presignedUrl, croppedImage, {
                        headers: { "Content-Type": croppedImage.type },
                    });

                    if (response.status === 200) {
                        const url = presignedUrl.split("?")[0];
                        dispatch(setImageUrl(url));
                        localStorage.setItem("diaryImageURL", url);
                    }
                } catch (error) {
                    console.error("이미지 업로드 실패:", error);
                }
            };
            uploadImage();
        }
    }, [presignedUrl, croppedImage, dispatch]);

    const handleCroppedImage = (croppedFile) => {
        setCroppedImage(croppedFile);
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleUploadBoxClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={styles.image_upload}>
            {uploadedImage && isModalOpen ? (
                <ImageEditor uploadedImage={uploadedImage} closeModal={closeModal} setCroppedImage={handleCroppedImage} />
            ) : (
                <>
                    <div className={styles.upload_box} onClick={handleUploadBoxClick}>
                        <label>
                            <CameraIcon stroke={"#616161"} />
                            <p>표지 업로드</p>
                        </label>
                        <input type="file" onChange={handleFileUpload} accept=".jpg,.jpeg,.png,.gif" ref={fileInputRef} style={{ display: "none" }} />
                    </div>
                    <div className={styles.image_preview}>
                        <img src={imageUrl} alt="Profile" className="diary_image" />
                    </div>
                </>
            )}
        </div>
    );
};

DiaryImageUpload.propTypes = {
    imgUrl: PropTypes.string,
};

export default DiaryImageUpload;
