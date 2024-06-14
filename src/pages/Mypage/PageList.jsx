import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '@/assets/icons/SadIcon';
import PostItem from '@/components/PostItem/PostItem';
import BottomBar from '@/components/BottomBar/BottomBar';
import PlusButton from '@/components/PlusButton/PlusButton';
import useAxios from '@/hooks/useAxios';
import Paper from '@/apis/api/Paper';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const PageList = () => {
  const { data, fetchData } = useAxios();
  const [userSaveList, setUserSaveList] = useState([]);
  const [page, setPage] = useState(1); // 페이지 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();
  const targetEl = useRef(null); // 무한 스크롤 타겟 요소
  const intersecting = useInfiniteScroll(targetEl); // 무한 스크롤 훅 사용

  // 데이터 불러오기 함수
  const loadMoreData = async () => {
    setLoading(true);
    const size = 20;
    const requestTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace(' ', 'T');
    await fetchData(Paper.getPaperList({
      size: size,
      page: page,
      requestTime: requestTime
    }));
    setLoading(false);
  };

  // 초기 데이터 불러오기
  useEffect(() => {
    loadMoreData();
  }, []);

  // 데이터가 업데이트될 때 userSaveList 갱신
  useEffect(() => {
    if (data) {
      setUserSaveList((prevList) => [...prevList, ...data]); // 기존 리스트에 새 데이터 추가
    }
  }, [data]);

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
      <SubHeader pageTitle={"내가 기록한 장소"} />
      <div className={styles.listWrap}>
        <div className={styles.wrap}>
          <div className={styles.myRecordList}>
            {userSaveList.length === 0 ? 
              <div className={styles.noWrap}>
                <NoResult message={`기록한 장소가 없습니다.\n다이어리를 만들고 장소를 기록해 보세요!`} icon={<SadIcon stroke="#1d1d1d" strokeWidth={1.0}/>}
                  buttonShow={true} actionFn={() => navigate("/register/diary")} buttonText={"다이어리 만들기"}
                />
              </div>
              :
              userSaveList.map((item) => (
                <PostItem 
                  key={item.paperId}
                  image={item.thumbnailImageUrl}
                  title={item.title}
                  subText={item.store}
                  link={`/papers/${item.paperId}`}
                />
              ))}
            <div ref={targetEl} style={{ height: '1px' }}></div>
          </div>
        </div>
      </div>
      <BottomBar />
      <PlusButton />
    </>
  );
};

export default PageList;