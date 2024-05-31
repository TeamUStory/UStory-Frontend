import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DiaryList.module.scss';
import CirclePlusIcon from '@/assets/icons/CirclePlusIcon';
import NotificationIcon from '@/assets/icons/NotificationIcon';
import PlusButton from '@/components/PlusButton/PlusButton';
import PostItem from '@/components/PostItem/PostItem';
import BottomBar from '@/components/BottomBar/BottomBar';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Button from '@/components/Button/Button';

const DiaryList = () => {
    const navigate = useNavigate();

    // 카테고리 배열
    const [buttonStates, setButtonStates] = useState([
        { category: "개인", isActive: false },
        { category: "연인", isActive: false },
        { category: "친구", isActive: false },
        { category: "가족",  isActive: false },

    ]);
    
    // 카테고리 선택
    const handleButtonClick = (index) => {
        setButtonStates(prevStates => {
            const newButtonStates = [...prevStates];
            newButtonStates[index].isActive = !newButtonStates[index].isActive;
            return newButtonStates;
        });
    };

    // 다이어리 배열
    const initialPostItems = [
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '/diary', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '/diary', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '/diary', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '/diary', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '/diary', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '/diary', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 05', link: '/diary', subText: '개인', borderColor: 'black' },
    ];

    // 현재 보여지는 포스트 상태
    const pageSize = 4;
    const [postItems, setPostItems] = useState(initialPostItems.slice(0, pageSize));

    // 감지할 요소
    const loaderRef = useRef(null);
    const isIntersecting = useInfiniteScroll(loaderRef);

    // 그 다음 포스트를 불러오는 함수
    const loadMorePosts = () => {
        setPostItems((prevPostItems) => {
            const currentLength = prevPostItems.length;
            const newPosts = initialPostItems.slice(currentLength, currentLength + pageSize);
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

    // 배열을 2개씩 나누는 함수
    const makeArray = (array, size) => {
        return array.reduce((acc, _, i) => {
            if (i % size === 0) acc.push(array.slice(i, i + size));
            return acc;
        }, []);
    };

    // 2개씩 나뉜 다이어리 모음
    const groupedPostItems = makeArray(postItems, 2);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.leftHeader}>
                    <p>다이어리</p>
                    <Button type="button" variant="inactive" label={<CirclePlusIcon fill="#FB8176" />} onClick={() => navigate('/register/diary')} />
                </div>
                <NotificationIcon />
            </header>
            <div className={styles.category}>
                {buttonStates.map((buttonState, index) => (
                    <button
                        key={index}
                        className={buttonState.isActive ? styles.active : ''}
                        onClick={() => handleButtonClick(index)}
                    >
                        {buttonState.category}
                    </button>
                ))}
            </div>
            <div className={styles.diaryList} >
                {groupedPostItems.map((group, index) => (
                    <div key={index} className={styles.postItem}>
                        {group.map((postItem, idx) => (
                            <PostItem
                                key={idx}
                                image={postItem.image}
                                title={postItem.title}
                                link={postItem.link}
                                subText={postItem.subText}
                                borderColor={postItem.borderColor}
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
