import { useEffect, useState, useRef } from 'react';
import styles from './Mypage.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '@/assets/icons/SadIcon';
import PostItem from '@/components/PostItem/PostItem';
import useAxios from '@/hooks/useAxios';
import BookMark from '@/apis/api/BookMark';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const SavePageList = () => {
  const { fetchData, data } = useAxios();
  const [useSaveList, setUseSaveList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const targetEl = useRef(null);
  const intersecting = useInfiniteScroll(targetEl);

  // 저장된 기록 가져오기
  useEffect(() => {
    const loadBookmarks = async () => {
      const size = 20;
      setLoading(true);
      await fetchData(BookMark.getBookmarkPaperList({page, size}));
      setLoading(false);
    };
    loadBookmarks();
  }, [fetchData, page]);

  useEffect(() => {
    if (data) {
      setUseSaveList((prev) => [...prev, ...data]);
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (intersecting && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [intersecting, loading]);

  return (
    <>
      <SubHeader pageTitle={"저장한 기록"} />
      <div className={styles.listWrap} style={{paddingBottom:"10px"}}>
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
            <div ref={targetEl} style={{ height: 1 }}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SavePageList;