import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.scss';
import FriendIcon from '@/assets/icons/FriendIcon';
import Button from "@/components/Button/Button";
import BottomBar from '@/components/BottomBar/BottomBar';
import PlusButton from '@/components/PlusButton/PlusButton';
import ProfileBox from './ProfileBox';
import SaveList from './SaveList';
import LikeList from './LikeList';
import MyRecord from './MyRecord';
import LogoutIcon from "@/assets/icons/LogoutIcon"
import Modal from "@/components/Modal/Modal"
import BanImg from '@/assets/images/ban.png';
import Noti from '@/components/Noti/Noti';
import useAxios from '@/hooks/useAxios';
import User from '@/apis/api/User';
import completedImage from '@/assets/images/completedImage.png';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from  "@/redux/slices/userSlice";

const Mypage = () => {
  const [isLogoutModal, setIsLogoutModal] = useState(false)
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const { fetchData: fetchUserData, data: userData } = useAxios();
  const { fetchData: fetchLogoutData, data: logoutData } = useAxios();  
  // const [user, setUser] = useState({});
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  // 마이페이지 유저 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData(User.getUser());
    }
    fetchData();
  }, [fetchUserData])

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData])

  // 로그아웃
  const handleLogout = async () => {
    await fetchLogoutData(User.postLogout())
    localStorage.removeItem('accessToken');
    setLogoutSuccess(true);
  }

  useEffect(() => {
    if(logoutData) {
      navigate("/login");
    }

    if(logoutData?.loginType === "KAKAO") {
      setLogoutSuccess(false)
      window.location.href="https://kauth.kakao.com/oauth/logout?client_id=eab271dce70bcf6a5f89799f1f6ca6d5&logout_redirect_uri=https://ustory.me/auth/logout"
    }
  },[logoutData,navigate])

  return (
    <>
      <header className={styles.mypageHeader}>
        <h3 className={styles.title}>마이페이지</h3>
        <div className={styles.btnBox}>
          <Button type="button" label={<LogoutIcon stroke="#1d1d1d" />} variant="inactive" onClick={() => setIsLogoutModal(true)}/>
          <Button type="button" label={<FriendIcon stroke="#1d1d1d" />} variant="inactive" onClick={() => navigate("/friends")}/>
          <Noti />
        </div>
      </header>
      <div className={styles.mypageWrap}>
        <div className={styles.wrap}>
          <ProfileBox user={user}/>
          <MyRecord />
          <SaveList />
          <LikeList />
        </div>
      </div>
      <BottomBar />
      <PlusButton />
      {isLogoutModal && (
        <Modal closeFn={() => setIsLogoutModal(false)}>
          <Modal.Icon><img src={BanImg} alt='cancelImage' /></Modal.Icon>
          <Modal.Body>로그아웃 하시겠습니까?</Modal.Body>
          <Modal.Button>
            <Button type="button" label="로그아웃 하기" variant="active" onClick={handleLogout}/>
          </Modal.Button>
        </Modal>
      )}
      {logoutSuccess && (
        <Modal closeFn={() => navigate("/login")}>
          <Modal.Icon><img src={completedImage} alt='cancelImage' /></Modal.Icon>
          <Modal.Body>로그아웃 되었습니다.</Modal.Body>
          <Modal.Button>
            <Button type="button" label="확인" variant="active" onClick={handleLogout}/>
          </Modal.Button>
        </Modal>
      )}
    </>
  )
}

export default Mypage;