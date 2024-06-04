import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.scss';
import FriendIcon from '@/assets/icons/FriendIcon';
import BellIcon from '@/assets/icons/BellIcon';
import Button from "@/components/Button/Button";
import BottomBar from '@/components/BottomBar/BottomBar';
import PlusButton from '@/components/PlusButton/PlusButton';
import ProfileBox from './ProfileBox';
import SaveList from './SaveList';
import MyRecord from './MyRecord';
import LogoutIcon from "@/assets/icons/LogoutIcon"
import Modal from "@/components/Modal/Modal"
import BanImg from '@/assets/images/ban.png';

const Mypage = () => {
  const [isLogouModal, setIsLogoutModal] = useState(false)
  const navigate = useNavigate();

  const user = {
    nickname: '나는 깜냥이 ',
    name: '홍길동',
    propfileImg: '',
    introSelf: '',
    writeLocation: 0,
    myDiary: 0,
    useSaveList:[
      
    ]
  }

  return (
    <>
      <header className={styles.mypageHeader}>
        <h3 className={styles.title}>마이페이지</h3>
        <div className={styles.btnBox}>
          <Button type="button" label={<LogoutIcon stroke="#1d1d1d" />} variant="inactive" onClick={() => setIsLogoutModal(true)}/>
          <Button type="button" label={<FriendIcon stroke="#1d1d1d" />} variant="inactive" onClick={() => navigate("/friends")}/>
          <Button type="button" label={<BellIcon stroke="#1d1d1d" />} variant="inactive" onClick={() => navigate("/noti")}/>
        </div>
      </header>
      <div className={styles.mypageWrap}>
        <div className={styles.wrap}>
          <ProfileBox user={user}/>
          <MyRecord user={user}/>
          <SaveList user={user}/>
        </div>
      </div>
      <BottomBar />
      <PlusButton />
      {isLogouModal && (
        <Modal closeFn={() => setIsLogoutModal(false)}>
          <Modal.Icon><img src={BanImg} alt='cancelImage' /></Modal.Icon>
          <Modal.Body>로그아웃 하시겠습니까?</Modal.Body>
          <Modal.Button>
            <Button type="button" label="로그아웃 하기" variant="active" onClick={() => navigate("/login")}/>
          </Modal.Button>
        </Modal>
      )}
    </>
  )
}

export default Mypage;