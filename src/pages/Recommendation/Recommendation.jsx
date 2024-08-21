import { useEffect, useState, useRef } from 'react';
import styles from './Recommendation.module.scss';
import BottomBar from '@/components/BottomBar/BottomBar';
import PlusButton from '@/components/PlusButton/PlusButton';
import Noti from '@/components/Noti/Noti';
import PostItem from '@/components/PostItem/PostItem';
import useAxios from '@/hooks/useAxios';
import Recommend from "@/apis/api/Recommend";
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '@/assets/icons/SadIcon';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const Recommendation = () => {
  const { fetchData: fetchRecommendationData, data: recommendationData } = useAxios();
  const [recommendation, setRecommendation] = useState([]);
  const [page, setPage] = useState(1); // 페이지 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const targetEl = useRef(null); // 무한 스크롤 타겟 요소
  const intersecting = useInfiniteScroll(targetEl); // 무한 스크롤 훅 사용

  // 데이터 불러오기 함수
  const loadMoreData = async () => {
    setLoading(true);
    const size = 20;
    await fetchRecommendationData(Recommend.getRecommendList(size, page));
    setLoading(false);
  };

  // 추천 장소 가져오기
  useEffect(() => {
    loadMoreData()
  }, [])

  // 데이터가 업데이트될 때 userSaveList 갱신
  useEffect(() => {
    if (recommendationData) {
      setRecommendation(() => [...recommendationData]);
    }
  }, [recommendationData]);

  // 페이지가 변경될 때마다 추가 데이터 불러오기
  useEffect(() => {
    if (intersecting && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [intersecting]);

  // 페이지 변경에 따른 데이터 로드
  useEffect(() => {
    if (page > 1) {
      loadMoreData();
    }
  }, [page]);

  return (
    <>
      <header className={styles.recommendHeader}>
        <h3 className={styles.title}>가장 Hot🔥한 장소는?</h3>
        <div className={styles.btnBox}>
          <Noti />
        </div>
      </header>
      <div className={styles.recommendWrap}>
        <div className={styles.wrap}>
          <div className={styles.rcmdList}>
          {recommendation.length === 0 ? (
            <div className={styles.noWrap}>
              <NoResult message={`추천 장소가 없습니다.`} icon={<SadIcon stroke="#1d1d1d" strokeWidth={1.0}/>}/>
            </div>
            ) : 
            recommendation.map((recommend) => (
            <PostItem 
              key={recommend.recommendPaperKey}
              image={recommend.imgUrl}
              title={recommend.store}
              link={`/recommendation/${recommend.recommendPaperKey}`}
              subText=""  
            />
          ))}
            <div ref={targetEl} style={{ height: '1px' }}></div>
          </div>
        </div>
      </div>
      <PlusButton />
      <BottomBar />
    </>
  );
}

export default Recommendation;