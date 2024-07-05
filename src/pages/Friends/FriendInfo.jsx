import { useEffect, useState } from 'react';
import styles from './Friends.module.scss';
import propTypes from 'prop-types';

const FriendInfo = ({ FriendData }) => {
  const [profileImgUrl, setProfileImgUrl] = useState('')

  // 프로필 이미지 url이 없을 경우 기본 이미지
  useEffect(() => {
    if(FriendData.profileImgUrl === '') {
      setProfileImgUrl("https://ustory-bucket.s3.ap-northeast-2.amazonaws.com/common/user-profile.png")
    } else {
      setProfileImgUrl(FriendData.profileImgUrl)
    }
  }, [FriendData])

  return(
    <div className={styles.friendInfo}>
      <p className={styles.img}>
        <img src={profileImgUrl} alt={FriendData.name} />
      </p>
      <div className={styles.text}>
        <p className={styles.nickName}>{FriendData.nickname || FriendData.senderNickname}</p>
        <p className={styles.name}>@{FriendData.name}</p>
      </div>
    </div>
  )
}

FriendInfo.propTypes = {
  FriendData: propTypes.object
}

export default FriendInfo;