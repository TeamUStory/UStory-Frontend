import { useEffect, useState } from 'react';
import { useRef } from 'react';
import styles from './DiaryPageList.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import PostItem from '../../components/PostItem/PostItem';
import PlaceMark from '../../assets/icons/PlaceMark';
import Calender from '../../components/Calender/Calender';

const DiaryPageList = () => {
    // 기록 배열
    const initialPostItems = [
        { image: '/src/assets/images/place.png', title: '껑냥이들 01', link: '/diary', subText: '장소', borderColor: 'black' },
        { image: '/src/assets/images/place.png', title: '껑냥이들 01', link: '/diary', subText: '장소', borderColor: 'black' },
        { image: '/src/assets/images/place.png', title: '껑냥이들 01', link: '/diary', subText: '장소', borderColor: 'black' },
        { image: '/src/assets/images/place.png', title: '껑냥이들 01', link: '/diary', subText: '장소', borderColor: 'black' },
        { image: '/src/assets/images/place.png', title: '껑냥이들 01', link: '/diary', subText: '장소', borderColor: 'black' },
        { image: '/src/assets/images/place.png', title: '껑냥이들 01', link: '/diary', subText: '장소', borderColor: 'black' },
        { image: '/src/assets/images/place.png', title: '껑냥이들 01', link: '/diary', subText: '장소', borderColor: 'black' },
    ];

    // 현재 보여지는 목록상태
    const pageSize = 4;
    const [postItems, setPostItems] = useState(initialPostItems.slice(0, pageSize));

    // 감지할 요소
    const loaderRef = useRef(null);
    const isIntersecting = useInfiniteScroll(loaderRef);

    // 다음 포스트를 불러오는 함수
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

    // 2개씩 나뉜 기록 모음
    const groupedPostItems = makeArray(postItems, 2);

    return (
        <div className={styles.allContainer}>
            <SubHeader pageTitle="우리들의 기록" />
            <div className={styles.selectDate}>
                <Calender />
                <span>~</span>
                <Calender />
            </div>
            <div className={styles.pageList}>
                {groupedPostItems.map((group, index) => (
                    <div key={index} className={styles.postItemRow}>
                        {group.map((post, postIndex) => (
                            <div key={postIndex} className={styles.postItem}>
                                <PostItem
                                    image={post.image}
                                    title={post.title}
                                    link={post.link}
                                    subText={post.subText}
                                    borderColor={post.borderColor}
                                >
                                    <PlaceMark color="#AAAAAA" />
                                </PostItem>
                            </div>
                        ))}
                    </div>
                ))}
                <div ref={loaderRef} style={{ height: '1px' }}></div>
            </div>
        </div>
    );
};

export default DiaryPageList;
