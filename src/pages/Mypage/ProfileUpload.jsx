import { useEffect, useState } from 'react';
import axios from 'axios';
import useAxios from '@/hooks/useAxios';
import styles from './ProfileUpload.module.scss';
import CameraIcon from '@/assets/icons/CameraIcon';
import propTypes from 'prop-types';
import ImageEditor from '@/components/ImageEditor/ImageEditor';
import S3Storage from '@/apis/api/S3Storage';

const ProfileUpload = ({ profileUrl, onUploadComplete }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const { fetchData, data } = useAxios();

  // 파일 업로드 핸들러
  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
        setUploadedImage(reader.result);
        setIsModalOpen(true);
    };
    reader.readAsDataURL(selectedFile);

    // 파일 네임
    setFile(selectedFile);
    
    // Presigned URL 요청
    await fetchData(S3Storage.getImageUrl(selectedFile.name));
  }; 

  const handleCroppedImage = async (croppedFile) => {
    setFile(croppedFile);
    setIsModalOpen(false);

    // Presigned URL 요청
    await fetchData(S3Storage.getImageUrl(croppedFile.name));
  };


  // Presigned URL 요청 후 데이터가 존재할 때 url만 추출
  useEffect(() => {
    if (data?.presignedUrl && file) {
      const url = data.presignedUrl;
      axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        }
      })
      .then(() => {
        const imgUrl = url.split('?')[0];
        onUploadComplete(imgUrl)
      })
      .catch((error) => {
        console.log('error:', error);
      });
    }

    // setCroppedImage(imgUrl)
  }, [data, file, onUploadComplete]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.profile_upload}>
      {uploadedImage && isModalOpen ? (
        <ImageEditor 
            uploadedImage={uploadedImage} 
            closeModal={closeModal} 
            setCroppedImage={handleCroppedImage} 
        />
      ) : (
        <>
          <label htmlFor="file"  className={styles.upload_box}>
            <CameraIcon stroke={"#616161"}/>
            <p className={styles.file_text}>파일 업로드</p>
          </label>
          <input type="file" id="file" name="file" onChange={handleFileUpload} accept="image/.jpg,.jpeg,.png,.gif"/>
          <div className={styles.profile_preview}>
            <img src={croppedImage || profileUrl} alt="Profile" className={styles.profile_image} />
          </div>
        </>
      )}
    </div>
  );
};

ProfileUpload.propTypes = {
  profileUrl: propTypes.string,
  onUploadComplete: propTypes.func
}

export default ProfileUpload;