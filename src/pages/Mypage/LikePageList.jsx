import { useEffect, useState, useRef } from 'react';
import styles from './Mypage.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '@/assets/icons/SadIcon';
import PostItem from '@/components/PostItem/PostItem';
import useAxios from '@/hooks/useAxios';
import Like from '@/apis/api/Like';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const LikePageList = () => {
  const { fetchData, data } = useAxios();
  const [useLikeList, setUseLikeList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const targetEl = useRef(null);
  const intersecting = useInfiniteScroll(targetEl);

  // 좋아요된 기록 가져오기
  const loadLikes = async () => {
    setLoading(true);
    const size = 20;
    setLoading(true);
    await fetchData(Like.getLikePaper({page, size}));
    setLoading(false);
  };

  // 초기 데이터 불러오기
  useEffect(() => {
    loadLikes();
  }, []);

  useEffect(() => {
    if (data) {
      setUseLikeList((prev) => [...prev, ...data]);
    }
  }, [data]);

  useEffect(() => {
    if (intersecting && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [intersecting]);

  // 페이지 변경에 따른 데이터 로드
  useEffect(() => {
    if (page > 1) {
      loadLikes();
    }
  }, [page]);

  return (
    <>
      <SubHeader pageTitle={"좋아한 기록"} />
      <div className={styles.listWrap} style={{paddingBottom:"10px"}}>
        <div className={styles.wrap}>
          <div className={styles.myRecordList}>
            {useLikeList.length === 0 ? 
              <div className={styles.noWrap}>
                <NoResult message={`좋아요 기록이 없습니다.`} icon={<SadIcon stroke="#1d1d1d" strokeWidth={1.0}/>}/>
              </div>
              :
              useLikeList.map((item) => (
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

export default LikePageList;