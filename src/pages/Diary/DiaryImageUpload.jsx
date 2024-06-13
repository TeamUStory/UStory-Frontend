import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./DiaryImageUpload.module.scss";
import InputField from "@/components/InputField/InputField";
import CameraIcon from "@/assets/icons/CameraIcon";
import ImageEditor from "@/components/ImageEditor/ImageEditor";
import useAxios from "@/hooks/useAxios";
import S3Storage from "@/apis/api/S3Storage";
import axios from "axios";

const DiaryImageUpload = ({ onImageUrlChange, imgUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [fileName, setFileName] = useState(null);
  const [presignedUrl, setPresignedUrl] = useState(null);

  const { data: presignedUrlData, fetchData: fetchPresignedUrlData } = useAxios();

  // imgUrl로 업데이트
  useEffect(() => {
    setImageUrl(imgUrl);
  }, [imgUrl]);

  // 로컬 스토리지에서 이미지 URL 불러오기
  useEffect(() => {
    const savedImageUrl = localStorage.getItem("diaryImageURL");
    if (savedImageUrl) {
      setImageUrl(savedImageUrl);
    }
  }, []);

  // 파일 업로드 핸들러
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    // 확장자명 제한
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

  // presignedUrl 반환
  useEffect(() => {
    if (croppedImage) {
      const fetchPresignedUrl = async () => {
        await fetchPresignedUrlData(S3Storage.getImageUrl(fileName));
      };
      fetchPresignedUrl();
    }
  }, [fetchPresignedUrlData, fileName, croppedImage]);

  // presignedURL 저장
  useEffect(() => {
    if (presignedUrlData) {
      setPresignedUrl(presignedUrlData.presignedUrl);
    }
  }, [presignedUrlData]);

  // 이미지 업로드 요청
  useEffect(() => {
    if (presignedUrl && croppedImage) {
      const uploadImage = async () => {
        try {
          const response = await axios.put(presignedUrl, croppedImage, {
            headers: {
              "Content-Type": croppedImage.type,
            },
          });

          if (response.status === 200) {
            console.log("이미지 업로드 완료");
            const url = presignedUrl.split("?")[0];
            setImageUrl(url);
            onImageUrlChange(url);
            localStorage.setItem("diaryImageURL", url);
          }
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
        }
      };
      uploadImage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presignedUrl, croppedImage]);

  const handleCroppedImage = (croppedFile) => {
    setCroppedImage(croppedFile);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.image_upload}>
      {uploadedImage && isModalOpen ? (
        <ImageEditor
          uploadedImage={uploadedImage}
          closeModal={closeModal}
          setCroppedImage={handleCroppedImage}
        />
      ) : (
        <>
          <div className={styles.upload_box}>
            <CameraIcon stroke={"#616161"} />
            <InputField
              type="file"
              label="표지 업로드"
              onChange={handleFileUpload}
              accept=".jpg,.jpeg,.png,.gif"
            />
          </div>
          <div className={styles.image_preview}>
            <img
              src={
                imageUrl ||
                "https://ustory-bucket.s3.ap-northeast-2.amazonaws.com/common/diary-profile.png"
              }
              alt="Profile"
              className="diary_image"
            />
          </div>
        </>
      )}
    </div>
  );
};

DiaryImageUpload.propTypes = {
  onImageUrlChange: PropTypes.func,
  imgUrl: PropTypes.string
};

export default DiaryImageUpload;
