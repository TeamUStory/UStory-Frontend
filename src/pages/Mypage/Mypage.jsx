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

const Mypage = () => {
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
    </>
  )
}

export default Mypage;