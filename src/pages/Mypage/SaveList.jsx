import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.scss';
import ArrowIcon from "@/assets/icons/ArrowIcon";
import Button from "@/components/Button/Button";
import useAxios from '@/hooks/useAxios';
import BookMark from '@/apis/api/BookMark';

const SaveList = () => {
  const { fetchData, data } = useAxios();
  const navigate = useNavigate();
  const [saveListNum, setSaveListNum] = useState("");

  // 저장된 기록 가져오기 4개까지만
  useEffect(() => {
    fetchData(BookMark.getBookmarkPaperList());
  }, [fetchData])

  useEffect(() => {
    if (data) {
      setSaveListNum(data.length)
    }
  }, [data])

  return(
    <div className={styles.my}>
      <div className={styles.titleBox}>
        <h3 className={styles.title}>저장한 기록 ({saveListNum})</h3>
        <div className={styles.allBtn}>
          <span>전체보기</span>
          <Button type="button" label={<ArrowIcon fill="#1d1d1d"/>} variant="inactive" onClick={() => navigate("/mypage/savepagelist")}/>
        </div>
      </div>
    </div>
  )
}

export default SaveList;