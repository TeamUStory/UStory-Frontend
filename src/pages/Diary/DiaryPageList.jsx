import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './DiaryPageList.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import PostItem from '@/components/PostItem/PostItem';
import PlaceMark from '@/assets/icons/PlaceMark';
import RangeCalender from '@/components/Calender/RangeCalender';
import NoResult from '@/components/NoResult/NoResult';
import Button from '@/components/Button/Button';
import SadIcon from '@/assets/icons/SadIcon'; // SadIcon import 추가
import useAxios from '@/hooks/useAxios';
import Paper from '../../apis/api/Paper';

const DiaryPageList = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [paperItems, setPaperItems] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const { data: paperData, fetchData: fetchPaperData } = useAxios();

    // 페이퍼 리스트 정보 불러오기
    useEffect(() => {
        const fetchData = async () => {
            // startDate와 endDate가 있으면 날짜 형식에 맞게 포맷팅합니다.
            let params = {};
            if (startDate && endDate) {
                const formattedStartDate = startDate.toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
    
                const formattedEndDate = endDate.toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });

                params = {
                    requestTime: new Date().toISOString().split('.')[0],
                    startDate: formattedStartDate,
                    endDate: formattedEndDate
                };
            } else {
                params = { requestTime: new Date().toISOString().split('.')[0] };
            }
    
            await fetchPaperData(Paper.getPaperListByDiary(id, params));
        };
    
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchPaperData, startDate, endDate]);
    
    // 페이퍼 리스트 저장
    useEffect(() => {
        if (paperData) {
            setPaperItems(paperData);
        }
    }, [paperData]);

    // 현재 보여지는 목록상태
    const pageSize = 4;
    const [postItems, setPostItems] = useState([]);

    // paperItems가 업데이트될 때 postItems 초기화
    useEffect(() => {
        setPostItems(paperItems.slice(0, pageSize));
    }, [paperItems]);

    // 감지할 요소
    const loaderRef = useRef(null);
    const isIntersecting = useInfiniteScroll(loaderRef);

    // 다음 포스트를 불러오는 함수
    const loadMorePosts = () => {
        setPostItems((prevPostItems) => {
            const currentLength = prevPostItems.length;
            const newPosts = paperItems.slice(currentLength, currentLength + pageSize);
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

    const isPostItems = paperItems.length > 0;

    return (
        <div className={styles.allContainer}>
            <SubHeader pageTitle="우리들의 기록" />
                <div className={styles.selectDate}>
                <RangeCalender 
                    startDate={startDate}
                    endDate={endDate}
                    onDateChange={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                    }}
                />
                </div>
            <div className={styles.pageList}>
                {isPostItems ? (
                    groupedPostItems.map((group, index) => (
                        <div key={index} className={styles.postItemRow}>
                            {group.map((post, postIndex) => (
                                <PostItem
                                    key={postIndex}
                                    image={post.thumbnailImageUrl}
                                    title={post.title}
                                    link={`/papers/${post.paperId}`}
                                    subText={post.store}
                                >
                                    <PlaceMark color="#AAAAAA" />
                                </PostItem>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className={styles.noResultContainer}>
                        <NoResult icon={<SadIcon stroke="#616161" />} message="등록된 기록이 없습니다." />
                        <Button label="기록하기" variant="active" onClick={() => navigate('/register/paper')} />
                    </div>
                )}
                <div ref={loaderRef} style={{ height: '1px' }}></div>
            </div>
        </div>
    );
};

export default DiaryPageList;
