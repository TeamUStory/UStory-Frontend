import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DiaryPageList.module.scss";
import SubHeader from "@/components/SubHeader/SubHeader";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import PostItem from "@/components/PostItem/PostItem";
import PlaceMark from "@/assets/icons/PlaceMark";
import RangeCalender from "@/components/Calender/RangeCalender";
import NoResult from "@/components/NoResult/NoResult";
import Button from "@/components/Button/Button";
import SadIcon from "@/assets/icons/SadIcon";
import useAxios from "@/hooks/useAxios";
import Paper from "@/apis/api/Paper";
import BottomBar from "@/components/BottomBar/BottomBar";
import { makeArray } from "@/utils/makeArray";
import { useDispatch, useSelector } from "react-redux";
import { setPaperItems, addPaperItems, setPostItems, setPage, setLoading } from "@/redux/slices/diarySlice";

const DiaryPageList = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { paperItems, postItems, page, loading } = useSelector((state) => state.diary);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const pageSize = 10;

    const { data: paperData, fetchData: fetchPaperData } = useAxios();

    // 페이퍼 리스트 정보 불러오기
    const fetchData = async () => {
        dispatch(setLoading(true));
        let params = {};
        if (startDate && endDate) {
            const formattedStartDate = startDate.toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });

            const formattedEndDate = endDate.toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });

            params = {
                requestTime: new Date().toLocaleString("sv-SE", { timeZone: "Asia/Seoul" }).replace(" ", "T"),
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                page,
                size: pageSize,
            };
        } else {
            params = {
                requestTime: new Date().toLocaleString("sv-SE", { timeZone: "Asia/Seoul" }).replace(" ", "T"),
                page,
                size: pageSize,
            };
        }

        await fetchPaperData(Paper.getPaperListByDiary(id, params));
        dispatch(setLoading(false));
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchPaperData, startDate, endDate, page]);

    // 페이퍼 리스트 저장
    useEffect(() => {
        if (paperData) {
            // setPaperItems((prevItems) => [...prevItems, ...paperData]);
            if (paperData) {
                if (page === 1) {
                    dispatch(setPaperItems(paperData));
                } else {
                    dispatch(addPaperItems(paperData));
                }
            }
        }
    }, [paperData, dispatch, page]);

    // paperItems가 업데이트될 때 postItems 초기화
    useEffect(() => {
        dispatch(setPostItems(paperItems.slice(0, page * pageSize)));
    }, [paperItems, page]);

    // 감지할 요소
    const loaderRef = useRef(null);
    const isIntersecting = useInfiniteScroll(loaderRef);

    // 감지 요소가 보이면 페이지 증가
    useEffect(() => {
        if (isIntersecting && !loading) {
            dispatch(setPage(page + 1));
        }
    }, [isIntersecting]);

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
                        dispatch(setPage(1));
                        dispatch(setPaperItems([]));
                    }}
                />
            </div>
            <div className={styles.pageList}>
                {isPostItems ? (
                    groupedPostItems.map((group, index) => (
                        <div key={index} className={styles.postItemRow}>
                            {group.map((post, postIndex) => (
                                <PostItem key={postIndex} image={post.thumbnailImageUrl} title={post.title} link={`/papers/${post.paperId}`} subText={post.store}>
                                    <PlaceMark color="#AAAAAA" />
                                </PostItem>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className={styles.noResultContainer}>
                        <NoResult icon={<SadIcon stroke="#616161" />} message="등록된 기록이 없습니다." />
                        <Button label="기록하기" variant="active" onClick={() => navigate("/register/paper")} />
                    </div>
                )}
                <div ref={loaderRef} style={{ height: "1px" }}></div>
                <BottomBar />
            </div>
        </div>
    );
};

export default DiaryPageList;
