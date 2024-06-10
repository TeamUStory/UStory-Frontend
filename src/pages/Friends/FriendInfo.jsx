import styles from './Friends.module.scss';
import propTypes from 'prop-types';

const FriendInfo = ({ FriendData }) => {

  return(
    <div className={styles.friendInfo}>
      <p className={styles.img}>
        <img src={FriendData.profileImgUrl} alt={FriendData.name} />
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