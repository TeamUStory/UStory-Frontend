import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.scss';
import PostItem from '@/components/PostItem/PostItem';
import ArrowIcon from "@/assets/icons/ArrowIcon";
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '@/assets/icons/SadIcon';
import Button from "@/components/Button/Button";
import useAxios from '@/hooks/useAxios';
import BookMark from '@/apis/api/BookMark';

const SaveList = () => {
  const { fetchData, data } = useAxios();
  const [useSaveList, setUseSaveList] = useState([]);
  const navigate = useNavigate();

  // 저장된 기록 가져오기 4개까지만
  useEffect(() => {
    fetchData(BookMark.getBookmarkPaperList());
  }, [fetchData])

  useEffect(() => {
    if (data) {
      setUseSaveList(data.slice(0, 4))
    }
  }, [data])

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
        {useSaveList.length === 0 ? 
          <NoResult message={"저장된 기록이 없습니다."} icon={<SadIcon stroke="#1d1d1d" strokeWidth={1.0}/>}/>
          :
          useSaveList.map((item) => (
            <PostItem 
              key={item.paperId}
              image={item.thumbnailImageUrl}
              title={item.title}
              subText={item.store}
              link={`/papers/${item.paperId}`}
            />
          ))}
      </div>
    </div>
  )
}

export default SaveList;