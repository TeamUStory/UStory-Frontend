import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./PaperImageUpload.module.scss";
import CameraIcon from "@/assets/icons/CameraIcon";
import CrownIcon from "@/assets/icons/CrownIcon";
import XIcon from "@/assets/icons/XIcon";
import ImageEditor from "@/components/ImageEditor/ImageEditor";
import useAxios from "@/hooks/useAxios";
import S3Storage from "@/apis/api/S3Storage";
import axios from "axios";

const PaperImageUpload = ({ onImageUrlsChange, imgUrls, thumbnail }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState("");

    const [currentFileName, setCurrentFileName] = useState(null);
    const [presignedUrl, setPresignedUrl] = useState(null);

    const { data: presignedUrlData, fetchData: fetchPresignedUrlData } = useAxios();

    const fileInputRef = useRef(null);
    const firstRender = useRef(true);

    // imgUrls와 thumbnail로 초기화
    useEffect(() => {
        if (imgUrls || thumbnail) {
            setImageUrls([...imgUrls]);
            setThumbnailImageUrl(thumbnail);
        }
    }, [imgUrls, thumbnail]);

    // 로컬 스토리지에서 저장된 이미지 및 썸네일 URL 불러오기
    useEffect(() => {
        const savedImageUrls = JSON.parse(localStorage.getItem("paperImageUrls") || "[]");
        const savedThumbnailImageUrl = localStorage.getItem("thumbnailImageUrl");

        if (savedImageUrls.length > 0) {
            setImageUrls(savedImageUrls);
        }
        if (savedThumbnailImageUrl) {
            setThumbnailImageUrl(savedThumbnailImageUrl);
        }
    }, []);

    // 파일 업로드 핸들러
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        e.target.value = null;

        // 이미지 URL 갯수 제한
        if (imageUrls.length + (thumbnailImageUrl ? 1 : 0) >= 5) {
            alert("최대 5개의 이미지만 업로드할 수 있습니다.");
            return;
        }

        // 확장자명 제한
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(file.name)) {
            alert("jpg, jpeg, png, gif 확장자만 허용됩니다.");
            return;
        }

        // 중복 파일 확인
        const reader = new FileReader();
        reader.onload = () => {
            const fileContent = reader.result;

            if (imageUrls.includes(fileContent) || thumbnailImageUrl === fileContent) {
                alert("이미 업로드된 파일입니다.");
                return;
            }

            setCurrentFileName(file.name);
            setUploadedImage(fileContent);
            setIsModalOpen(true);
        };
        reader.readAsDataURL(file);
    };

    // presigned URL 데이터 업데이트
    useEffect(() => {
        if (presignedUrlData) {
            setPresignedUrl(presignedUrlData.presignedUrl);
        }
    }, [presignedUrlData]);

    // 이미지 업로드 요청
    useEffect(() => {
        const uploadImage = async () => {
            try {
                if (presignedUrl && croppedImage) {
                    const response = await axios.put(presignedUrl, croppedImage, { headers: { "Content-Type": croppedImage.type } });

                    if (response.status === 200) {
                        const url = presignedUrl.split("?")[0];

                        if (!thumbnailImageUrl && imageUrls.length === 0) {
                            setThumbnailImageUrl(url);
                            localStorage.setItem("thumbnailImageUrl", url);
                        } else {
                            setImageUrls((prevUrls) => {
                                const newUrls = [...prevUrls, url].filter((value, index, self) => self.indexOf(value) === index);
                                localStorage.setItem("paperImageUrls", JSON.stringify(newUrls));
                                return newUrls;
                            });
                        }

                        setCroppedImage(null);
                        setPresignedUrl(null);
                    } else {
                        console.error("이미지 업로드 실패:", response);
                    }
                }
            } catch (error) {
                console.error("이미지 업로드 요청 중 오류 발생:", error);
            }
        };

        uploadImage();
    }, [croppedImage, presignedUrl]);

    // 자른 이미지 설정 및 모달 닫기
    const handleCroppedImage = async (croppedFile) => {
        setCroppedImage(croppedFile);
        setIsModalOpen(false);

        const fetchPresignedUrl = async () => {
            await fetchPresignedUrlData(S3Storage.getImageUrl(currentFileName));
        };
        await fetchPresignedUrl();
    };

    // 썸네일 클릭 처리
    const handleThumbnailClick = (url, e) => {
        e.preventDefault(); // 폼 제출 방지
        e.stopPropagation(); // 이벤트 전파 방지

        if (thumbnailImageUrl === url) {
            return;
        } else if (imageUrls.includes(url)) {
            // 이미지 목록에 있는 썸네일 클릭한 경우
            const prevThumbnailUrl = thumbnailImageUrl;

            setThumbnailImageUrl(url);
            localStorage.setItem("thumbnailImageUrl", url);

            // 이전 썸네일 이미지가 있는 경우 이미지 배열에 다시 추가
            if (prevThumbnailUrl) {
                setImageUrls((prevUrls) => {
                    const newUrls = [...prevUrls, prevThumbnailUrl].filter((value, index, self) => self.indexOf(value) === index);
                    localStorage.setItem("paperImageUrls", JSON.stringify(newUrls));
                    return newUrls;
                });

                // localStorage에서 이전 썸네일 URL 추가
                if (localStorage.getItem("paperImageUrls")) {
                    const savedImageUrls = JSON.parse(localStorage.getItem("paperImageUrls"));
                    const newUrls = [...savedImageUrls, prevThumbnailUrl].filter((value, index, self) => self.indexOf(value) === index);
                    localStorage.setItem("paperImageUrls", JSON.stringify(newUrls));
                }
            }

            // 새로운 썸네일 URL 이미지 배열에서 제거
            setImageUrls((prevUrls) => {
                const filteredUrls = prevUrls.filter((prevUrl) => prevUrl !== url);
                localStorage.setItem("paperImageUrls", JSON.stringify(filteredUrls));
                return filteredUrls;
            });

            // localStorage에서 새로운 썸네일 URL 제거
            if (localStorage.getItem("paperImageUrls")) {
                const savedImageUrls = JSON.parse(localStorage.getItem("paperImageUrls"));
                const filteredUrls = savedImageUrls.filter((savedUrl) => savedUrl !== url);
                localStorage.setItem("paperImageUrls", JSON.stringify(filteredUrls));
            }
        }
    };

    // 사진 삭제 처리
    const handleRemoveImage = (index, e) => {
        e.preventDefault();
        e.stopPropagation();

        const urlToRemove = imageUrls[index];
        setImageUrls((prevUrls) => {
            const newUrls = prevUrls.filter((_, idx) => idx !== index);
            localStorage.setItem("paperImageUrls", JSON.stringify(newUrls));
            return newUrls;
        });

        if (thumbnailImageUrl === urlToRemove) {
            setThumbnailImageUrl("");
            localStorage.removeItem("thumbnailImageUrl");
        }
    };

    // 이미지 및 썸네일 URL 변경 시 부모 컴포넌트로 전달
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (onImageUrlsChange) {
            onImageUrlsChange(imageUrls, thumbnailImageUrl);
        }
    }, [imageUrls, thumbnailImageUrl]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 파일 업로드 박스 클릭 시 파일 입력창 열기
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
                <div className={styles.image_previews}>
                    <div className={styles.upload_box} onClick={handleUploadBoxClick}>
                        <label>
                            <CameraIcon stroke={"#616161"} />
                            <p>파일업로드</p>
                        </label>
                        <input type="file" onChange={handleFileUpload} accept=".jpg,.jpeg,.png,.gif" ref={fileInputRef} style={{ display: "none" }} />
                    </div>
                    {thumbnailImageUrl && (
                        <div key={thumbnailImageUrl} className={styles.thumbnail}>
                            <img src={thumbnailImageUrl} alt={"Thumbnail"} />
                            <button className={styles.deleteButton} type="button" onClick={(e) => handleRemoveImage(imageUrls.indexOf(thumbnailImageUrl), e)}>
                                <XIcon stroke="#616161" />
                            </button>
                            <button className={styles.crownButton} type="button" onClick={(e) => handleThumbnailClick(thumbnailImageUrl, e)}>
                                <CrownIcon fill={"#FB8176"} bgColor={"#fff"} />
                            </button>
                        </div>
                    )}
                    {imageUrls.map((url, index) => (
                        <div key={index} className={styles.image_preview}>
                            <img src={url} alt={`Preview ${index}`} />
                            <button className={styles.deleteButton} onClick={(e) => handleRemoveImage(index, e)}>
                                <XIcon stroke="#616161" />
                            </button>
                            <button className={styles.crownButton} onClick={(e) => handleThumbnailClick(url, e)}>
                                <CrownIcon fill={thumbnailImageUrl === url ? "#FB8176" : ""} bgColor={"#fff"} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

PaperImageUpload.propTypes = {
    onImageUrlsChange: PropTypes.func,
    imgUrls: PropTypes.array,
    thumbnail: PropTypes.string,
};

export default PaperImageUpload;
