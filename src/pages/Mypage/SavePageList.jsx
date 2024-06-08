import { useEffect, useState } from 'react';
import styles from './Mypage.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '@/assets/icons/SadIcon';
import PostItem from '@/components/PostItem/PostItem';
import BottomBar from '@/components/BottomBar/BottomBar';
import PlusButton from '@/components/PlusButton/PlusButton';
import useAxios from '@/hooks/useAxios';
import BookMark from '@/apis/api/BookMark';

const SavePageList = () => {
  const { fetchData, data } = useAxios();
  const [useSaveList, setUseSaveList] = useState([]);

  // 저장된 기록 가져오기
  useEffect(() => {
    fetchData(BookMark.getBookmarkPaperList());
  }, [fetchData])

  useEffect(() => {
    if (data) {
      setUseSaveList(data.slice(0, 4))
    }
  }, [data])


  return (
    <>
      <SubHeader pageTitle={"저장한 기록"} />
      <div className={styles.listWrap}>
        <div className={styles.wrap}>
          <div className={styles.myRecordList}>
            {useSaveList.length === 0 ? 
              <div className={styles.noWrap}>
                <NoResult message={`저장된 기록이 없습니다.`} icon={<SadIcon stroke="#1d1d1d" strokeWidth={1.0}/>}/>
              </div>
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
      </div>
      <BottomBar />
      <PlusButton />
    </>
  )
}

export default SavePageList;