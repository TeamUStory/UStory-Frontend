import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.scss';
import clsx from 'clsx';
import Button from "@/components/Button/Button";
import useAxios from '@/hooks/useAxios';
import Diary from '@/apis/api/Diary';
import Paper from '@/apis/api/Paper';

const MyRecord = () => {
  const { fetchData: fetchPaperData, data: paperData } = useAxios();
  const { fetchData: fetchDiaryData, data: diaryData } = useAxios();
  const [diaryCount, setDiaryCount] = useState(0);
  const [paperCount, setPaperCount] = useState(0);
  const navigate = useNavigate();

  // 유저가 작성한 페이퍼 총 갯 수 불러오기
  useEffect(() => {
    fetchPaperData(Paper.getPaperCount())
  }, [fetchPaperData])

  useEffect(() => {
    if (paperData) {
      setPaperCount(paperData.count);
    }
  }, [paperData])

    // 유저가 속한 다이어리 총 갯 수 불러오기
    useEffect(() => {
      fetchDiaryData(Diary.getUserDiaryCount());
    }, [fetchDiaryData])

    useEffect(() => {
      if (diaryData) {
        setDiaryCount(diaryData);
      }
    }, [diaryData])

  return(
    <div className={styles.myRecord}>
      <h3 className={styles.title}>나의 기록</h3>
      <div className={styles.myRecordBox}>
        <div className={clsx(styles.box, styles.location)}>
          <p className={styles.text}>내가 기록한 장소</p>
            <Button type="button" label={`${paperCount}곳`} variant="inactive" 
              onClick={() => navigate('/mypage/pagelist')} />
        </div>
        <div className={clsx(styles.box, styles.diary)}>
          <p className={styles.text}>내 다이어리</p>
            <Button type="button" label={`${diaryCount}개`} variant="inactive" 
            onClick={() => navigate('/diarylist')}/>
        </div>
      </div>
    </div>
  )
}

export default MyRecord;