import styles from './Mypage.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '@/assets/icons/SadIcon';
import PostItem from '@/components/PostItem/PostItem';
import BottomBar from '@/components/BottomBar/BottomBar';
import PlusButton from '@/components/PlusButton/PlusButton';

const PageList = () => {

  const user = {
    useSaveList:[
      
    ]
  }

  return (
    <>
      <SubHeader pageTitle={"내가 기록한 장소"} />
      <div className={styles.listWrap}>
        <div className={styles.wrap}>
          <div className={styles.myRecordList}>
            {user.useSaveList.length === 0 ? 
              <div className={styles.noWrap}>
                <NoResult message={`기록한 장소가 없습니다.\n다이어리를 등록하고 장소를 기록해 보세요!`} icon={<SadIcon stroke="#1d1d1d" strokeWidth={1.0}/>}
                  buttonShow={true} actionFn={null} buttonText={"다이어리 등록하기"}
                />
              </div>
              :
              user.useSaveList.map((item) => (
                <PostItem 
                  key={item.id}
                  image={item.thumbNail}
                  title={item.title}
                  subText={item.location}
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