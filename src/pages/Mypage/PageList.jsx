import { useEffect, useState } from 'react';
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

const PageList = () => {
  const { data, fetchData } = useAxios();
  const [userSaveList, setUserSaveList] = useState([]); 
  const navigate = useNavigate();

  // 유저 저장 기록 리스트 조회하기
  useEffect(() => {
    fetchData(Paper.getPaperList());
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      setUserSaveList(data)
    }
  }, [data])

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
                  link={`/paper/${item.paperId}`}
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

export default PageList;