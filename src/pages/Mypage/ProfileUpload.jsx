import styles from './ProfileUpload.module.scss';
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import CameraIcon from '@/assets/icons/CameraIcon';
import XIcon from '@/assets/icons/XIcon'; 
import BasicProfile from '@/assets/images/basic_profile.png';

const ProfileUpload = () => {

  return (
    <div className={styles.profile_upload}>
      <div className={styles.upload_box}>
        <CameraIcon stroke={"#616161"}/>
        <InputField type="file" label="프로필 업로드" />
      </div>
      <div className={styles.profile_preview}>
        <img src={BasicProfile} alt="Profile" className={styles.profile_image} />
        <Button type="button" variant="inactive" label={<XIcon fill={"#616161"} stroke={"#616161"}/>}/>
      </div>
    </div>
  );
};

export default ProfileUpload;