import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./PaperImageUpload.module.scss";
import InputField from "@/components/InputField/InputField";
import CameraIcon from "@/assets/icons/CameraIcon";
import CrownIcon from "@/assets/icons/CrownIcon";
import XIcon from "@/assets/icons/XIcon";
import ImageEditor from "@/components/ImageEditor/ImageEditor";
import useAxios from "@/hooks/useAxios";
import S3Storage from "@/apis/api/S3Storage";
import axios from "axios";

const PaperImageUpload = ({ onImageUrlsChange, imgUrls, thumbnail,  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState("");

    const [currentFileName, setCurrentFileName] = useState(null);
    const [presignedUrl, setPresignedUrl] = useState(null);

    const { data: presignedUrlData, fetchData: fetchPresignedUrlData } = useAxios();

    const firstRender = useRef(true);

     // imgUrls와 thumbnail로 초기화
     useEffect(() => {
        if (imgUrls || thumbnail) {
            setImageUrls([...imgUrls]);
            setThumbnailImageUrl(thumbnail);
        }
    }, [imgUrls, thumbnail]);

    // 로컬 스토리지에서 이미지와 썸네일 URL 불러오기
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

        setCurrentFileName(file.name);

        const reader = new FileReader();
        reader.onload = () => {
            setUploadedImage(reader.result);
            setIsModalOpen(true);
        };
        reader.readAsDataURL(file);
    };

    // presignedURL 반환
    useEffect(() => {
        if (croppedImage) {
            const fetchPresignedUrl = async () => {
                await fetchPresignedUrlData(S3Storage.getImageUrl(currentFileName));
            };
            fetchPresignedUrl();
        }
    }, [fetchPresignedUrlData, currentFileName, croppedImage]);

    // presigned URL 저장
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
                        setImageUrls((prevUrls) => {
                            const newUrls = [...prevUrls, url].filter((value, index, self) => self.indexOf(value) === index);
                            localStorage.setItem("paperImageUrls", JSON.stringify(newUrls));
                            return newUrls;
                        });
                        setCroppedImage(null); // reset croppedImage after upload
                        setPresignedUrl(null); // reset presignedUrl after upload
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

    const handleCroppedImage = (croppedFile) => {
        setCroppedImage(croppedFile);
        setIsModalOpen(false);
    };

    // 썸네일 선택 처리
    const handleThumbnailClick = (url) => {
        if (thumbnailImageUrl === url) {
            // 이미 선택된 썸네일을 클릭한 경우 선택 해제
            setThumbnailImageUrl("");
            localStorage.removeItem("thumbnailImageUrl");

            // 이미지 배열에 선택 해제된 썸네일 추가
            setImageUrls((prevUrls) => {
                const newUrls = [...prevUrls, url].filter((value, index, self) => self.indexOf(value) === index);
                localStorage.setItem("paperImageUrls", JSON.stringify(newUrls));
                return newUrls;
            });

            // localStorage에 선택 해제된 이미지 URL 추가
            if (localStorage.getItem("paperImageUrls")) {
                const savedImageUrls = JSON.parse(localStorage.getItem("paperImageUrls"));
                const newUrls = [...savedImageUrls, url].filter((value, index, self) => self.indexOf(value) === index);
                localStorage.setItem("paperImageUrls", JSON.stringify(newUrls));
            }
        } else {
            // 새로운 썸네일을 선택한 경우
            const prevThumbnailUrl = thumbnailImageUrl;

            setThumbnailImageUrl(url);
            localStorage.setItem("thumbnailImageUrl", url);

            // 이전 썸네일이 있는 경우 이미지 배열에 다시 추가
            if (prevThumbnailUrl) {
                setImageUrls((prevUrls) => {
                    const newUrls = [...prevUrls, prevThumbnailUrl].filter((value, index, self) => self.indexOf(value) === index);
                    localStorage.setItem("paperImageUrls", JSON.stringify(newUrls));
                    return newUrls;
                });

                // localStorage에 이전 썸네일 URL 추가
                if (localStorage.getItem("paperImageUrls")) {
                    const savedImageUrls = JSON.parse(localStorage.getItem("paperImageUrls"));
                    const newUrls = [...savedImageUrls, prevThumbnailUrl].filter((value, index, self) => self.indexOf(value) === index);
                    localStorage.setItem("paperImageUrls", JSON.stringify(newUrls));
                }
            }

            // 이미지 배열에서 새로운 썸네일 제거
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
    const handleRemoveImage = (index) => {
        const urlToRemove = imageUrls[index];
        setImageUrls((prevUrls) => {
            const newUrls = prevUrls.filter((_, idx) => idx !== index); // 이미지 목록에서 선택된 이미지 제외
            localStorage.setItem("paperImageUrls", JSON.stringify(newUrls));
            return newUrls;
        });

        if (thumbnailImageUrl === urlToRemove) {
            setThumbnailImageUrl(""); // 삭제된 이미지가 썸네일인 경우 썸네일 초기화
            localStorage.removeItem("thumbnailImageUrl");
        }
    };

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


    return (
        <div className={styles.image_upload}>
            {uploadedImage && isModalOpen ? (
                <ImageEditor uploadedImage={uploadedImage} closeModal={closeModal} setCroppedImage={handleCroppedImage} />
            ) : (
                <div className={styles.image_previews}>
                    <div className={styles.upload_box}>
                        <CameraIcon stroke={"#616161"} />
                        <InputField type="file" label="이미지 업로드" onChange={handleFileUpload} accept=".jpg,.jpeg,.png,.gif" />
                    </div>
                    {thumbnailImageUrl && (
                        <div className={styles.thumbnail}>
                            <img src={thumbnailImageUrl} alt={"Thumbnail"} />
                            <button className={styles.deleteButton} onClick={() => handleRemoveImage(imageUrls.indexOf(thumbnailImageUrl))}>
                                <XIcon stroke="#616161" />
                            </button>
                            <button className={styles.crownButton} onClick={() => handleThumbnailClick(thumbnailImageUrl)}>
                                <CrownIcon fill={"#FB8176"} bgColor={"#fff"} />
                            </button>
                        </div>
                    )}
                    {imageUrls.map((url, index) => (
                        <div key={index} className={styles.image_preview}>
                            <img src={url} alt={`Preview ${index}`} />
                            <button className={styles.deleteButton} onClick={() => handleRemoveImage(index)}>
                                <XIcon stroke="#616161" />
                            </button>
                            <button className={styles.crownButton} onClick={() => handleThumbnailClick(url)}>
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
    imgUrls: PropTypes.arrayOf(PropTypes.string),
    thumbnail: PropTypes.string,
};

export default PaperImageUpload;
