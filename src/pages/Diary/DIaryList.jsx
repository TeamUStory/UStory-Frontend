import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DiaryList.module.scss';
import CirclePlusIcon from '@/assets/icons/CirclePlusIcon';
import Noti from '@/components/Noti/Noti';
import PlusButton from '@/components/PlusButton/PlusButton';
import PostItem from '@/components/PostItem/PostItem';
import BottomBar from '@/components/BottomBar/BottomBar';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Button from '@/components/Button/Button';
import useAxios from "@/hooks/useAxios";
import Diary from "@/apis/api/Diary";
import { makeArray } from '@/utils/makeArray';

// 카테고리 배열
const categories = [
    { ko: "개인", en: "INDIVIDUAL" },
    { ko: "연인", en: "COUPLE" },
    { ko: "친구", en: "FRIEND" },
    { ko: "가족", en: "FAMILY" },
    { ko: "어스", en: "US" }
];

const basicDiaryImageUrl = "https://ustory-bucket.s3.ap-northeast-2.amazonaws.com/common/diary-profile.png";

const DiaryList = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(null);
    const [diaryItems, setDiaryItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const { data: diaryData, fetchData: fetchDiaryData } = useAxios();

    // 카테고리 선택
    const handleTabClick = (category) => {
        setActiveTab((prevTab) => (prevTab === category ? null : category));
        setPage(1);
        setDiaryItems([]);
    };

    const fetchDiaryList = async (category, page) => {
        setLoading(true);
        const requestTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace(' ', 'T');
        const params = category ? { requestTime, diaryCategory: category.en, page } : { requestTime, page };
        await fetchDiaryData(Diary.getDiaryList(params));
        setLoading(false);
    };

    useEffect(() => {
        fetchDiaryList(activeTab, page);
    }, [activeTab, page, fetchDiaryData]);

    useEffect(() => {
        if (diaryData) {
            setDiaryItems((prevItems) => [...prevItems, ...diaryData]);
        }
    }, [diaryData]);

    // 감지할 요소
    const loaderRef = useRef(null);
    const isIntersecting = useInfiniteScroll(loaderRef);

    // 감지 요소가 보이면 페이지 증가
    useEffect(() => {
        if (isIntersecting && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [isIntersecting]);

    // 2개씩 나뉜 다이어리 모음
    const groupedPostItems = makeArray(diaryItems, 2);

    console.log(groupedPostItems)
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.leftHeader}>
                    <p>다이어리</p>
                    <Button type="button" variant="inactive" label={<CirclePlusIcon fill="#FB8176" />} onClick={() => navigate('/register/diary')} />
                </div>
                <Noti />
                <div className={styles.tabMenu}>
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className={activeTab === category ? styles.active : styles.tab}
                            onClick={() => handleTabClick(category)}
                        >
                            {category.ko}
                        </button>
                    ))}
                </div>
            </header>
            <div className={styles.diaryList} >
                {groupedPostItems.map((group, index) => (
                    <div key={index} className={styles.postItem}>
                        {group.map((postItem, idx) => (
                            <PostItem
                                key={idx}
                                image={postItem.imgUrl === "기본 DiaryImgUrl" ? basicDiaryImageUrl : postItem.imgUrl}
                                title={postItem.name}
                                link={`/diary/${postItem.id}`}
                                subText={postItem.diaryCategory}
                            />
                        ))}
                    </div>
                ))}
                <div ref={loaderRef} style={{ height: '1px' }}></div>
            </div>
            <PlusButton />
            <BottomBar />
        </div>
    );
}

export default DiaryList;