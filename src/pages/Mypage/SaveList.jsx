import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.scss';
import PostItem from '@/components/PostItem/PostItem';
import ArrowIcon from "@/assets/icons/ArrowIcon";
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '@/assets/icons/SadIcon';
import Button from "@/components/Button/Button";
import propTypes from 'prop-types';

const SaveList = ({user}) => {
  const navigate = useNavigate();

  return(
    <div className={styles.mySave}>
      <div className={styles.titleBox}>
        <h3 className={styles.title}>저장한 기록</h3>
        <div className={styles.allBtn}>
          <span>전체보기</span>
          <Button type="button" label={<ArrowIcon fill="#1d1d1d"/>} variant="inactive" onClick={() => navigate("/mypage/savepagelist")}/>
        </div>
      </div>
      <div className={styles.mySaveList}>
        {user.useSaveList.length === 0 ? 
          <NoResult message={"저장된 기록이 없습니다."} icon={<SadIcon stroke="#1d1d1d" strokeWidth={1.0}/>}/>
          :
          user.useSaveList.map((item) => (
            <PostItem 
              key={item.id}
              image={item.thumbNail}
              title={item.title}
              subText={item.location}
            />
          ))}
      </div>
    </div>
  )
}

SaveList.propTypes = {
  user: propTypes.object
}

export default SaveList;