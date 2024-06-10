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

const DiaryList = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(null);
    const [diaryItems, setDiaryItems] = useState([]);

    const { data:diaryData, fetchData:fetchDiaryData} = useAxios();

    // 카테고리 선택
    const handleTabClick = (category) => {
        if (activeTab === category) {
            setActiveTab(null);
        } else {
            setActiveTab(category);
        }
    };
    
    const fetchDiaryList = async (category) => {
        const requestTime = new Date().toISOString().split('.')[0];
        const params = category ? { requestTime, diaryCategory: category.en } : { requestTime };
        await fetchDiaryData(Diary.getDiaryList(params));
    };

    useEffect(() => {
        fetchDiaryList(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);  

    useEffect(() => {
        if(diaryData) {
            setDiaryItems(diaryData);
        }
        
    }, [diaryData]);

    // 현재 보여지는 포스트 상태
    const pageSize = 4;
    const [postItems, setPostItems] = useState([]);

    useEffect(() => {
        setPostItems(diaryItems.slice(0, pageSize));
    }, [diaryItems]);

    // 감지할 요소
    const loaderRef = useRef(null);
    const isIntersecting = useInfiniteScroll(loaderRef);

    // 그 다음 포스트를 불러오는 함수
    const loadMorePosts = () => {
        setPostItems((prevPostItems) => {
            const currentLength = prevPostItems.length;
            const newPosts = diaryItems.slice(currentLength, currentLength + pageSize);
            return [...prevPostItems, ...newPosts];
        });
    };

    // 감지 요소가 보이면 포스트 불러오기
    useEffect(() => {
        if (isIntersecting) {
            loadMorePosts();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIntersecting]);

    // 2개씩 나뉜 다이어리 모음
    const groupedPostItems = makeArray(postItems, 2);

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
                                image={postItem.imgUrl}
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
