import { useState } from 'react';
import styles from './ProfileUpload.module.scss';
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import CameraIcon from '@/assets/icons/CameraIcon';
import XIcon from '@/assets/icons/XIcon'; 
import BasicImage from '@/assets/images/diaryBasicImage.png';
import CrownIcon from '@/assets/icons/CrownIcon';

const ProfileUpload = () => {
    const [isThumbnail, setIsThumbnail] = useState(null);

    // 썸네일 클릭하는 함수
    const handleThumbnailClick = (image) => {
        if (isThumbnail !== null) {
            setIsThumbnail(null);
        } else {
            setIsThumbnail(image);
        }
    }
    
  return (
    <div className={styles.image_upload}>
      <div className={styles.upload_box}>
        <CameraIcon stroke={"#616161"}/>
        <InputField type="file" label="표지 업로드" />
      </div>
      <div className={styles.image_preview}>
        <img src={BasicImage} alt="Profile" className={`${styles.diary_image} ${isThumbnail ? styles.thumbnailImage : ''}`} />
        <div className={styles.deleteBtn}>
            <Button type="button" variant="inactive" label={<XIcon fill={"#616161"} stroke={"#616161"}/>}/>
        </div>
        <div className={styles.thumbnailBtn}>
            <Button 
                type="button" 
                variant="inactive" 
                label={<CrownIcon fill={isThumbnail ? "#FB8176" : ""} bgColor={isThumbnail ? "#fff" : ""}/>} 
                onClick={handleThumbnailClick}
            />
        </div>
      </div>
    </div>
  );
};

export default ProfileUpload;