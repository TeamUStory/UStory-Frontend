import styles from './DiaryImageUpload.module.scss';
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import CameraIcon from '@/assets/icons/CameraIcon';
import XIcon from '@/assets/icons/XIcon'; 
import BasicImage from '@/assets/images/diaryBasicImage.png';

const DiaryImageUpload = () => {

  return (
    <div className={styles.image_upload}>
      <div className={styles.upload_box}>
        <CameraIcon stroke={"#616161"}/>
        <InputField type="file" label="표지 업로드" />
      </div>
      <div className={styles.image_preview}>
        <img src={BasicImage} alt="Profile" className={styles.diary_image} />
        <Button type="button" variant="inactive" label={<XIcon fill={"#616161"} stroke={"#616161"}/>}/>
      </div>
    </div>
  );
};

export default DiaryImageUpload;