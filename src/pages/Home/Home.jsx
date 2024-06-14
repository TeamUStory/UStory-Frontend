import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "../Home/Home.module.scss";
import PlusButton from "@/components/PlusButton/PlusButton";
import BottomBar from "@/components/BottomBar/BottomBar";
import Noti from "@/components/Noti/Noti";
import MapApi from "@/apis/MapApis/MapApi";
import PostItem from "@/components/PostItem/PostItem";
import FriendIcon from "@/assets/icons/FriendIcon";
import Carousel from "@/components/Carousel/Carousel";
import CarouselItem from "@/components/Carousel/CarouselItem";
import Diary from "@/apis/api/Diary";
import Paper from "@/apis/api/Paper";
import useAxios from "@/hooks/useAxios";
import User from "@/apis/api/User";
import { makeArray } from '@/utils/makeArray';

const Home = () => {
    const navigate = useNavigate();
    const [diaryItems, setDiaryItems] = useState([]);
    const [paperItems, setPaperItems] = useState([]);
    const [nickname, setNickname] = useState('');

    const { data: diaryData, fetchData: fetchDiaryData } = useAxios();
    const { data: paperData, fetchData: fetchPaperData } = useAxios();  
    const { data: userData, fetchData: fetchUserData} = useAxios();

    // 다이어리 리스트, 페이퍼리스트, user 정보 조회
    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(User.getUser());
            await fetchDiaryData(Diary.getHomeDiary());

            const requestTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace(' ', 'T');
            const size = 6;
            const page = 1;
    
            const params = { requestTime, page, size };
            await fetchPaperData(Paper.getPaperList(params));
        };
        fetchData();
    }, [fetchDiaryData, fetchPaperData, fetchUserData]);

    // 다이어리 리스트 정보 저장
    useEffect(() => {
        if (diaryData) {
            setDiaryItems(diaryData);
        }
    }, [diaryData]);

    // 페이퍼 리스트 정보 저장
    useEffect(() => {
        if (paperData) {
            setPaperItems(paperData);
        }
    }, [paperData]);

    // user 정보 저장
    useEffect(() => {
        if (userData){
            setNickname(userData.nickname);
        }
    }, [userData]);

    const newDiaryItems = makeArray(diaryItems, 3);

    const isPostItems = paperItems.length > 0;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <p>
                    <span className={styles.nickname}>{nickname}</span>님,
                    <br />
                    어디로 떠나시나요?
                </p>
                <Noti />
            </header>
            <div className={styles.contents}>
                <div className={styles.mapContainer}>
                    <MapApi />
                </div>
                <div className={styles.diaryContainer}>
                    <p>내가 속한 다이어리를<br/>확인해보세요!</p>
                    <div className={styles.diaryList}>
                        <Carousel>
                            {newDiaryItems.map((group, groupIndex) => (
                                <CarouselItem key={groupIndex} index={groupIndex}> 
                                    {group.map((diary, index) => (
                                        <div key={diary.id}>
                                            <button onClick={() => navigate(`/diary/${diary.id}`)}>
                                                <div className={styles.diaryItem}>
                                                    <img src={diary.imgUrl} alt={diary.name} />
                                                    <div className={styles.diaryContent}>
                                                        <p className={styles.name}>{diary.name}</p>
                                                        <p className={styles.diaryCategory}>{diary.diaryCategory}</p>
                                                    </div>
                                                </div>
                                            </button>
                                            {index !== group.length - 1 && <hr />}
                                        </div>
                                    ))}
                                </CarouselItem>
                            ))}
                        </Carousel>
                    </div>
                </div>
                <div className={styles.recordContainer}>
                    <p>나만의 기록일지</p>
                    {isPostItems ? (
                        <div className={styles.recordsList}>
                            {paperItems.map((postitem, idx) => (
                                <PostItem
                                    key={idx}
                                    image={postitem.thumbnailImageUrl}
                                    title={postitem.title}
                                    link={`/papers/${postitem.paperId}`}
                                    subText={postitem.diaryName}
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
    );
};

export default Home;
