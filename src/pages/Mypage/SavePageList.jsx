import styles from './Mypage.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '@/assets/icons/SadIcon';
import PostItem from '@/components/PostItem/PostItem';
import BottomBar from '@/components/BottomBar/BottomBar';
import PlusButton from '@/components/PlusButton/PlusButton';

const SavePageList = () => {

  const user = {
    useSaveList:[
      {id: 1, thumbNail: "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg", title: '제목1', location: '장소1'},
      {id: 2, thumbNail: "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg", title: '제목1', location: '장소1'},
      {id: 3, thumbNail: "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg", title: '제목1', location: '장소1'}
    ]
  }

  return (
    <>
      <SubHeader pageTitle={"저장한 기록"} />
      <div className={styles.listWrap}>
        <div className={styles.wrap}>
          <div className={styles.myRecordList}>
            {user.useSaveList.length === 0 ? 
              <div className={styles.noWrap}>
                <NoResult message={`저장된 기록이 없습니다.`} icon={<SadIcon stroke="#1d1d1d" strokeWidth={1.0}/>}/>
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

export default SavePageList;