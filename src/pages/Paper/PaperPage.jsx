import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PaperPage.module.scss";
import Button from "@/components/Button/Button";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import Noti from "@/components/Noti/Noti";
import MoreIcon from "@/assets/icons/MoreIcon";
import DiaryIcon from "@/assets/icons/DiaryIcon";
import CalenderIcon from "@/assets/icons/CalenderIcon";
import PlaceMark from "@/assets/icons/PlaceMark";
import PlaceSaveIcon from "@/assets/icons/PlaceSaveIcon";
import CommentIcon from "@/assets/icons/CommentIcon";
import MapApiPlace from "@/apis/MapApis/MapApiPlace";
import InputField from "@/components/InputField/InputField";
import MessageIcon from "@/assets/icons/MessageIcon";
import Modal from "@/components/Modal/Modal";
import LoudSpeakerIcon from "@/assets/icons/LoudSpeakerIcon";
import Paper from "@/apis/api/Paper";
import Comment from "@/apis/api/Comment";
import BookMark from "@/apis/api/BookMark";
import useAxios from "@/hooks/useAxios";
import Carousel from "@/components/Carousel/Carousel";
import CarouselItem from "@/components/Carousel/CarouselItem";
import Diary from "@/apis/api/Diary";
import BottomBar from "@/components/BottomBar/BottomBar";
import CompletedImage from "@/assets/images/completedImage.png";
import CancelImage from "@/assets/images/cancelImage.png";
import CarouselIndicator from "@/components/Carousel/CarouselIndicator";
import HeartIcon from "@/assets/icons/HeartIcon";
import Like from "@/apis/api/Like";
import {
    setComment,
    setEditCommentId,
    setEditCommentContent,
    toggleMenu,
    setCommentList,
    setImages,
    setIsSaveIconFilled,
    setIsHeartIconFilled,
    setIsModalOpen,
    setIsCommentOpen,
    setPageDetail,
    setLikeNum,
    setToggleIndex,
    resetToggleIndex,
} from "@/redux/slices/paperSlice";

const PaperPage = () => {
    const navigate = useNavigate();
    const { paperId } = useParams();
    const dispatch = useDispatch();

    const { commentList, isToggle, toggleIndex, isSaveIconFilled, isHeartIconFilled, isModalOpen, isCommentOpen, pageDetail, images, comment, editCommentId, editCommentContent, likeNum } =
        useSelector((state) => state.paper);

    const { data: pageData, fetchData: fetchPageData } = useAxios();
    const { data: bookmarkData, fetchData: fetchBookmarkData } = useAxios();
    const { data: commentData, fetchData: fetchCommentData } = useAxios();
    const { data: diaryData, fetchData: fetchDiaryData } = useAxios();
    const { data: likeCheckData, fetchData: fetchLikeCheckData } = useAxios();
    const { data: likeCountData, fetchData: fetchLikeCountData } = useAxios();
    const { fetchData: fetchPageDeleteData } = useAxios();
    const { fetchData: fetchCommentAddData } = useAxios();
    const { fetchData: fetchCommentEditData } = useAxios();
    const { fetchData: fetchCommentDeleteData } = useAxios();

    // paper 상세 정보 조회
    useEffect(() => {
        const fetchPage = async () => {
            await fetchPageData(Paper.getPaperDetail(paperId));
        };
        fetchPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchPageData]);

    // paperDetail 정보 저장, 이미지 저장
    useEffect(() => {
        if (pageData) {
            dispatch(setPageDetail(pageData));

            const images = [pageData.thumbnailImageUrl, ...(pageData.unlocked ? pageData.imageUrls || [] : [])];

            dispatch(setImages(images));

            dispatch(setIsCommentOpen(pageData.unlocked));
        }
    }, [pageData, dispatch]);


    // bookmark 정보 가져오기
    const fetchBookmark = async () => {
        await fetchBookmarkData(BookMark.getBookmarkPaper(paperId));
    };

    // 좋아요 여부 가져오기
    const fetchLikeCheck = async () => {
        await fetchLikeCheckData(Like.getLikeCheck(paperId));
    };

    // 좋아요 갯수 가져오기
    const fetchLikeCount = async () => {
        await fetchLikeCountData(Like.getCountLike(paperId));
    };
    // 페이지 처음 실행될 때, bookmark, like 정보 가져옴
    useEffect(() => {
        fetchBookmark();
        fetchLikeCheck();
        fetchLikeCount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // bookmark 여부 저장
    useEffect(() => {
        if (bookmarkData) {
            dispatch(setIsSaveIconFilled(bookmarkData.bookmarked));
        }
    }, [bookmarkData, dispatch]);

    // bookmark 추가/해제 핸들러
    const handleSaveIconClick = async () => {
        if (isSaveIconFilled) {
            await fetchBookmarkData(BookMark.deleteBookmark(paperId));
        } else {
            await fetchBookmarkData(BookMark.postBookmark(paperId));
        }

        await fetchBookmark();
        dispatch(setIsModalOpen(true));
    };

    // Like 정보 저장
    useEffect(() => {
        // 좋아요 여부
        if (likeCheckData) {
            dispatch(setIsHeartIconFilled(likeCheckData.greatd));
        }
        // 좋아요 갯수
        if (likeCountData) {
            dispatch(setLikeNum(likeCountData.countGreat));
        }
    }, [likeCheckData, likeCountData, dispatch]);

    // 좋아요 추가/해제 핸들러
    const handelHeartIconClick = async () => {
        if (isHeartIconFilled) {
            await fetchLikeCheckData(Like.deleteLike(paperId));
            dispatch(setIsHeartIconFilled(false));
        } else {
            await fetchLikeCheckData(Like.postLike(paperId));
            dispatch(setIsHeartIconFilled(true));
        }

        fetchLikeCheck();
        fetchLikeCount();
    };

    // Comment 불러오기
    const fetchComment = async () => {
        await fetchCommentData(Comment.getAllComment(paperId));
    };

    // 페이지 처음 실행시, 모든 comment 목록 불러옴
    useEffect(() => {
        fetchComment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Comment 목록이 바뀔 때, commentList 업데이트
    useEffect(() => {
        if (commentData) {
            dispatch(setCommentList(commentData));
        }
    }, [commentData, dispatch]);

    const handleInputChange = (e) => {
        setComment(e.target.value);
    };

    // 코멘트 추가
    const commentAddClick = async () => {
        if (!comment) {
            alert("코멘트를 입력해주세요.");
            return;
        }

        await fetchCommentAddData(Comment.postComment(paperId, comment));

        fetchComment();
        dispatch(setComment(""));
    };

    // 코멘트 수정 버튼 클릭
    const handleEditClick = (commentId, content) => {
        dispatch(setEditCommentId(commentId));
        dispatch(setEditCommentContent(content));
        dispatch(setToggleIndex(null));
    };

    // 코멘트 수정 사항 저장
    const commentEditSaveClick = async () => {
        if (!editCommentContent) {
            alert("코멘트를 입력해주세요.");
            return;
        }

        await fetchCommentEditData(Comment.putComment(editCommentId, editCommentContent));

        fetchComment();
        dispatch(setEditCommentId(null));
        dispatch(setEditCommentContent(""));
    };

    // 코멘트 삭제
    const commentDeleteClick = async (commentId) => {
        await fetchCommentDeleteData(Comment.deleteComment(commentId));
        fetchComment();
    };

    // 코멘트에 있는 moreIcon
    const toggleMenu2 = (index) => {
        if (toggleIndex === index) {
            dispatch(resetToggleIndex());
        } else {
            dispatch(setToggleIndex(index));
        }
    };

    // 다이어리 아이디 가져오기
    useEffect(() => {
        const fetchDiary = async () => {
            const requestTime = new Date().toLocaleString("sv-SE", { timeZone: "Asia/Seoul" }).replace(" ", "T");
            const searchDiary = pageDetail.diaryName;
            const params = { requestTime, searchDiary };

            await fetchDiaryData(Diary.getDiaryList(params));
        };
        fetchDiary();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDiaryData]);

    // 페이퍼 삭제
    const paperDeleteClick = async () => {
        await fetchPageDeleteData(Paper.deletePaper(paperId));
        navigate(`/papers/diary/${diaryData[0].id}`);
    };

    const closeModal = () => {
        dispatch(setIsModalOpen(false));
    };

    return (
        <div className={styles.allContainer}>
            <div className={styles.header}>
                <Button type="button" variant="inactive" label={<ArrowIcon fill="#1d1d1d" />} onClick={() => navigate(-1)} />
                <div className={styles.rightHeader}>
                    <Noti />
                    {pageDetail.isUpdatable === 1 && pageDetail.unlocked === 1 && (
                        <>
                            <button className={styles.moreIcon} onClick={() => dispatch(toggleMenu())}>
                                <MoreIcon stroke="black" />
                            </button>
                            {isToggle && (
                                <div className={styles.menuContainer}>
                                    <Button type="button" variant="inactive" label="수정하기" onClick={() => navigate(`/edit/paper/${paperId}`)} />
                                    <button className={styles.exitButton} type="button" onClick={paperDeleteClick}>
                                        삭제하기
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className={styles.contentsContainer}>
                <p className={styles.pageName}>{pageDetail.title}</p>

                <div className={styles.allImageContainer}>
                    <Carousel>
                        {images.map((imageUrl, index) => (
                            <CarouselItem key={index} index={index}>
                                <div className={index === 0 ? styles.thumbnailImageContainer : styles.imagesContainer}>
                                    <img src={imageUrl} alt={`Image ${index}`} />
                                </div>
                            </CarouselItem>
                        ))}
                        <CarouselIndicator />
                    </Carousel>
                </div>
                <div className={styles.contents}>
                    <div className={styles.left}>
                        <div className={styles.diary}>
                            <div className={styles.icon}>
                                <DiaryIcon color="#F2B1AB" bgColor="none" />
                            </div>
                            <p>{pageDetail.diaryName}</p>
                        </div>
                        <div className={styles.date}>
                            <CalenderIcon color="#AAA" />
                            <p>{pageDetail.visitedAt}</p>
                        </div>
                        <div className={styles.place}>
                            <PlaceMark color="#AAA" />
                            <p>
                                {pageDetail.city}, {pageDetail.store}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonsContainer}>
                    <Button
                        type="button"
                        variant="inactive"
                        label={
                            <>
                                <PlaceSaveIcon color="#FB8176" fill={isSaveIconFilled ? "#FB8176" : "none"} />
                                <p>저장하기</p>
                            </>
                        }
                        onClick={handleSaveIconClick}
                    />
                    <Button
                        type="button"
                        variant="inactive"
                        label={
                            <>
                                <HeartIcon fill={isHeartIconFilled ? "#FB8176" : "none"} />
                                <p>{likeNum}</p>
                            </>
                        }
                        onClick={handelHeartIconClick}
                    />
                </div>
                <div className={styles.mapContainer}>
                    <MapApiPlace height="218px" coordinateX={pageDetail.coordinateX} coordinateY={pageDetail.coordinateY} />
                </div>
                <hr />
                <div className={styles.pharsesContainer}>
                    <MessageIcon stroke="#000" />
                    <p>코멘트 ({commentList.length})</p>
                </div>
                {isCommentOpen ? (
                    <div className={styles.allCommentContainer}>
                        {commentList.map((comment, index) => (
                            <div className={styles.commentsContainer} key={index}>
                                <img
                                    src={comment.profileImg === "" ? "https://ustory-bucket.s3.ap-northeast-2.amazonaws.com/common/user-profile.png" : comment.profileImg}
                                    alt={comment.userNickname}
                                />
                                <div className={styles.commentContainer}>
                                    <p className={styles.nickName}>{comment.userNickname}</p>
                                    <p className={styles.date}>{comment.createdAt}</p>
                                    {editCommentId === comment.id ? (
                                        <div className={styles.commentEdit}>
                                            <InputField value={editCommentContent} onChange={(e) => setEditCommentContent(e.target.value)} />
                                            <Button type="button" variant="active" label="수정" onClick={commentEditSaveClick} />
                                        </div>
                                    ) : (
                                        <p className={styles.comment}>{comment.content}</p>
                                    )}
                                </div>
                                {comment.isUpdatable === 1 && (
                                    <>
                                        <button className={styles.moreIcon} onClick={() => toggleMenu2(index)}>
                                            <MoreIcon stroke="black" />
                                        </button>
                                        {toggleIndex === index && (
                                            <div className={styles.tapContainer}>
                                                <Button type="button" variant="inactive" label="수정하기" onClick={() => handleEditClick(comment.id, comment.content)} />
                                                <button className={styles.deleteButton} onClick={() => commentDeleteClick(comment.id)}>
                                                    삭제하기
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.allCommentContainer}>
                        {commentList.map((comment, index) => (
                            <div className={styles.commentsContainer} key={index}>
                                <img
                                    src={comment.profileImg === "" ? "https://ustory-bucket.s3.ap-northeast-2.amazonaws.com/common/user-profile.png" : comment.profileImg}
                                    alt={comment.userNickname}
                                />
                                <div className={styles.commentContainer}>
                                    <p className={styles.nickName}>{comment.userNickname}</p>
                                    <p className={styles.date}>{comment.date}</p>
                                    <p className={styles.textshadow}>asfs dfds fsd</p>
                                </div>
                            </div>
                        ))}
                        <div className={styles.commentClosed}>
                            <LoudSpeakerIcon color="#E60000" />
                            <p>
                                모든 멤버가 코멘트를 등록해야
                                <br />
                                기록 확인이 가능합니다.
                            </p>
                        </div>
                    </div>
                )}
                <div className={styles.sendComment}>
                    <InputField placeholder="코멘트 한줄 입력해주세요 :)" value={comment} onChange={handleInputChange} />
                    <Button type="button" variant="active" label={<CommentIcon color="#fff" />} onClick={commentAddClick} />
                </div>
                <BottomBar />
            </div>
            {isModalOpen && (
                <Modal closeFn={closeModal}>
                    <Modal.Icon>{isSaveIconFilled ? <img src={CompletedImage} alt="저장" /> : <img src={CancelImage} alt="취소" />}</Modal.Icon>
                    <Modal.Body>
                        <p>{isSaveIconFilled ? "장소 저장이 완료되었습니다." : "장소 저장이 취소되었습니다."}</p>
                    </Modal.Body>
                    <Modal.Button>
                        {isSaveIconFilled ? (
                            <Button type="button" label="저장리스트 확인하기" variant="active" onClick={() => navigate("/mypage/savepagelist")} />
                        ) : (
                            <Button type="button" label="확인" variant="active" onClick={() => dispatch(setIsModalOpen(false))} />
                        )}
                    </Modal.Button>
                </Modal>
            )}
        </div>
    );
};

export default PaperPage;
