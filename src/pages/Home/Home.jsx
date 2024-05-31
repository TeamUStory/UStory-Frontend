import styles from "../Home/Home.module.scss";
import PlusButton from "@/components/PlusButton/PlusButton"
import BottomBar from "@/components/BottomBar/BottomBar"
import NotificationIcon from "@/assets/icons/NotificationIcon";
import MapApi from "@/apis/api/MapApi";
// import PostItem from "@/components/PostItem/PostItem";

const Home = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <p>
                    <span className={styles.nickname}>깡냥이</span>님,
                    <br />
                    어디로 떠나시나요?
                </p>
                <NotificationIcon />
            </header>
            <div className={styles.contents}>
                <MapApi />
                <div className={styles.diaryContainer}>
                    <p>내가 속한 다이어리를 확인해보세요!</p>
                    <div className={styles.diaryList}>
                        <div className={styles.diary}>
                            <img src="src\assets\images\diaryBasicImage.png" alt="다이어리 이미지" />
                            <div className={styles.diaryContent}>
                                <p className={styles.diaryName}>기본 다이어리</p>
                                <p className={styles.diaryCategory}>개인</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.recordContainer}>
                    <p>나만의 기록일지</p>
                    <div className={styles.noRecordList}>
                        <p>기록을 등록해보세요!</p>
                    </div>
                    {/* <PostItem /> */}
                </div>
            </div>
            <PlusButton />
            <footer>
                <BottomBar />
            </footer>
        </div>
    )
}

export default Home;