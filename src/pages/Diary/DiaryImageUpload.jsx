import { useEffect, useState } from 'react';
import styles from './DiaryImageUpload.module.scss';
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import CameraIcon from '@/assets/icons/CameraIcon';
import XIcon from '@/assets/icons/XIcon'; 
import BasicImage from '@/assets/images/diaryBasicImage.png';
import ImageEditor from '@/components/ImageEditor/ImageEditor';

const DiaryImageUpload = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  // 파일 업로드 핸들러
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // useEffect(() => {
  //   console.log(uploadedImage);
  // }, [uploadedImage]);


  return (
    <div className={styles.image_upload}>
        {uploadedImage ? (
          <ImageEditor uploadedImage={uploadedImage} />
          ) : (
            <>
            <div className={styles.upload_box}>
              <CameraIcon stroke={"#616161"} />
              <InputField type="file" label="표지 업로드" onChange={handleFileUpload} />
            </div>
            <div className={styles.image_preview}>
              <img src={BasicImage} alt="Profile" className="diary_image" />
              <Button type="button" variant="inactive" label={<XIcon fill={"#616161"} stroke={"#616161"} />} />
            </div>
            </>
        )}
    </div>
  );
};

export default DiaryImageUpload;
