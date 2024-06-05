import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "../Home/Home.module.scss";
import PlusButton from "@/components/PlusButton/PlusButton"
import BottomBar from "@/components/BottomBar/BottomBar"
import NotificationIcon from "@/assets/icons/NotificationIcon";
import MapApi from "@/apis/api/MapApi";
import PostItem from "@/components/PostItem/PostItem";
import FriendIcon from "@/assets/icons/FriendIcon";
import Carousel from "@/components/Carousel/Carousel"
import CarouselContent from "@/components/Carousel/CarouselContent"
import CarouselItem from "@/components/Carousel/CarouselItem"

const Home = () => {
    const navigate = useNavigate();
    const [isPostItems, setIsPostItems] = useState(false);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const postItems = [
        { image: '/src/assets/images/place.png', title: '껑냥이들 01', link: '/paper', subText: '개인', borderColor: 'black' },
        { image: '/src/assets/images/place.png', title: '껑냥이들 01', link: '/paper', subText: '개인', borderColor: 'black' },
        { image: '/src/assets/images/place.png', title: '껑냥이들 01', link: '/paper', subText: '개인', borderColor: 'black' },
        { image: '/src/assets/images/place.png', title: '껑냥이들 01', link: '/paper', subText: '개인', borderColor: 'black' },
        { image: '/src/assets/images/place.png', title: '껑냥이들 01', link: '/paper', subText: '개인', borderColor: 'black' },
        { image: '/src/assets/images/place.png', title: '껑냥이들 01', link: '/paper', subText: '개인', borderColor: 'black' },
    ];

    const DiaryItems = [
        { image: '/src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', subText: '개인', borderColor: 'black' },
        { image: '/src/assets/images/diaryBasicImage.png', title: '껑냥이들 02', subText: '개인', borderColor: 'black' },
        { image: '/src/assets/images/diaryBasicImage.png', title: '껑냥이들 03', subText: '개인', borderColor: 'black' },
        { image: '/src/assets/images/diaryBasicImage.png', title: '껑냥이들 04', subText: '개인', borderColor: 'black' },
        { image: '/src/assets/images/diaryBasicImage.png', title: '껑냥이들 05', subText: '개인', borderColor: 'black' },
        { image: '/src/assets/images/diaryBasicImage.png', title: '껑냥이들 06', subText: '개인', borderColor: 'black' },
    ]
    
    // 다이어리를 3개로 나누는 함수
    const makeArray = (array, size) => {
        return array.reduce((acc, _, i) => {
            if (i % size === 0) acc.push(array.slice(i, i + size));
            return acc;
        }, []);
    };

    // 2개씩 나뉜 다이어리 그룹
    const newDiaryItems = makeArray(DiaryItems, 3);

    useEffect(() => {
        setIsPostItems(postItems.length > 0);
    },[postItems]);


    
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
                <div className={styles.mapContainer}>
                    <MapApi />
                </div>
                <div className={styles.diaryContainer}>
                  <p>내가 속한 다이어리를<br/>확인해보세요!</p>
                  <div className={styles.diaryList}>
                    {/* <div className={styles.diary}>
                      <img src="src\assets\images\diaryBasicImage.png" alt="다이어리 이미지" />
                      <div className={styles.diaryContent}>
                        <p className={styles.diaryName}>기본 다이어리</p>
                        <p className={styles.diaryCategory}>개인</p>
                      </div>
                    </div> */}
                    <Carousel>
                      <CarouselContent>
                        {newDiaryItems.map((diaryItems, groupIndex) => {
                          return (
                            <CarouselItem key={groupIndex}>
                              <div className={styles.page}>
                                {diaryItems.map((diary, index) => (
                                  <button key={diary.title} onClick={() => navigate('/diary')}>
                                    <div className={styles.diaryItem}>
                                      <img src={diary.image} alt={diary.title} />
                                      <div className={styles.diaryContent}>
                                        <p className={styles.diaryName}>{diary.title}</p>
                                        <p className={styles.diaryCategory}>{diary.subText}</p>
                                      </div>
                                    </div>
                                    {index !== diaryItems.length - 1 && <hr />}
                                  </button>
                                ))}
                              </div>
                            </CarouselItem>
                          );
                        })}
                      </CarouselContent>
                    </Carousel>
                  </div>
                </div>
                <div className={styles.recordContainer}>
                    <p>나만의 기록일지</p>
                    {isPostItems ? (
                        <div className={styles.recordsList}>
                            {postItems.map((postitem, idx) => (
                                <PostItem
                                    key={idx}
                                    image={postitem.image}
                                    title={postitem.title}
                                    link={postitem.link}
                                    subText={postitem.subText}
                                    borderColor={postitem.borderColor}
                                >
                                    <FriendIcon stroke="#AAAAAA" />
                                </PostItem>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noRecordList}>
                            <p>기록을 등록해보세요!</p>
                        </div>
                    )}
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