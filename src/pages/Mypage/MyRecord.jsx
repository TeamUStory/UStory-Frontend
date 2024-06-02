import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.scss';
import clsx from 'clsx';
import propTypes from 'prop-types';
import Button from "@/components/Button/Button";

const MyRecord = ({user}) => {
  const navigate = useNavigate();

  return(
    <div className={styles.myRecord}>
      <h3 className={styles.title}>나의 기록</h3>
      <div className={styles.myRecordBox}>
        <div className={clsx(styles.box, styles.location)}>
          <p className={styles.text}>내가 기록한 장소</p>
          {user.writeLocation === 0 ? <Button type="button" label="0곳" variant="inactive" onClick={() => navigate('/mypage/pagelist')}/>
              :
            <Button type="button" label={`${user.writeLocation.toLocaleString()}곳`} variant="inactive" 
              onClick={() => navigate('/mypage/pagelist')} />}
        </div>
        <div className={clsx(styles.box, styles.diary)}>
          <p className={styles.text}>내 다이어리</p>
          {user.myDiary === 0 ? <Button type="button" label="0개" variant="inactive" />
              :
            <Button type="button" label={`${user.myDiary.toLocaleString()}개`} variant="inactive" />}
        </div>
      </div>
    </div>
  )
}

MyRecord.propTypes = {
  user: propTypes.object
}

export default MyRecord;