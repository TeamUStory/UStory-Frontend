import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PaperPage.module.scss';
import Button from '@/components/Button/Button';
import ArrowIcon from '@/assets/icons/ArrowIcon';
import Noti from '@/components/Noti/Noti';
import MoreIcon from '@/assets/icons/MoreIcon';
import DiaryIcon from '@/assets/icons/DiaryIcon';
import CalenderIcon from '@/assets/icons/CalenderIcon';
import PlaceMark from '@/assets/icons/PlaceMark';
import PlaceSaveIcon from '@/assets/icons/PlaceSaveIcon';
import CommentIcon from '@/assets/icons/CommentIcon';
import MapApiPlace from '@/apis/MapApis/MapApiPlace';
import InputField from '@/components/InputField/InputField';
import MessageIcon from '@/assets/icons/MessageIcon';
import Modal from '@/components/Modal/Modal';
import LoudSpeakerIcon from '@/assets/icons/LoudSpeakerIcon';
import Paper from '@/apis/api/Paper';
import Comment from '@/apis/api/Comment';
import BookMark from '@/apis/api/BookMark';
import useAxios from '@/hooks/useAxios';
import Carousel from "@/components/Carousel/Carousel";
import CarouselItem from "@/components/Carousel/CarouselItem";

const PaperPage = () => {
    const navigate = useNavigate();  
    const { paperId } = useParams(); 
    
    const [commentList, setCommentList] = useState([]);
    const [isToggle, setIsToggle] = useState(false);
    const [toggleIndex, setToggleIndex] = useState(null);
    const [isSaveIconFilled, setIsSaveIconFilled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCommetOpen, setCommentOpen] = useState(0);
    const [pageDetail, setPageDetail] = useState({});
    const [images, setImages] = useState([]);
    const [comment, setComment] = useState('');
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('')

    const { data:pageData, fetchData:fetchPageData} = useAxios();
    const { data:bookmarkData, fetchData:fetchBookmarkData} = useAxios();
    const { data:commentData, fetchData:fetchCommentData} = useAxios();
    const { fetchData:fetchCommentAddData} = useAxios();
    const { fetchData:fetchCommentEditData} = useAxios();
    const { fetchData:fetchCommentDeleteData} = useAxios();


    // paper 상세 정보 조회
    useEffect(() => {
        const fetchPage = async () => {
            await fetchPageData(Paper.getPaperDetail(paperId));
        }
        fetchPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchPageData]);
    
    // paperDetail 정보 저장, 이미지 저장
    useEffect(() => {
        if (pageData){
            setPageDetail(pageData);
            if (pageData.unlocked) {
                setImages([pageData.thumbnailImageUrl, ...pageData.imageUrls]);
                setCommentOpen(true);
            } else {
                setImages([pageData.thumbnailImageUrl]);
                setCommentOpen(false);
            }
        }
    }, [pageData]);
    

    // bookmark 정보 가져오기
    const fetchBookmark = async () => {
        await fetchBookmarkData(BookMark.getBookmarkPaper(paperId));
    };

    // 페이지 처음 실행됭때, bookmark 정보 가져옴
    useEffect(() => {
        fetchBookmark();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // bookmark 여부 저장
    useEffect(() => {
        if (bookmarkData) {
            setIsSaveIconFilled(bookmarkData.bookmarked);
        }
    }, [bookmarkData]);

    // bookmark 추가/해제 핸들러
    const handleSaveIconClick = async () => {
        if (isSaveIconFilled) {
            await fetchBookmarkData(BookMark.deleteBookmark(paperId));
        } else {
            await fetchBookmarkData(BookMark.postBookmark(paperId));
        }

        await fetchBookmark();
        setIsModalOpen(true);
    };
    
   // Comment 불러오기
    const fetchComment = async () => {
        await fetchCommentData(Comment.getAllComment(paperId));
    }

    // 페이지 처음 실행시, 모든 comment 목록 불러옴
    useEffect(() => {
        fetchComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(commentData){
            setCommentList(commentData);
        }
    },[commentData]);
    
    const handleInputChange = (e) => {
        setComment(e.target.value);
    }
        
    // 코멘트 추가
    const commentAddClick = async () => {
        if (!comment) {
            alert('코멘트를 입력해주세요.');
            return ;
        }

        await fetchCommentAddData(Comment.postComment(paperId, comment));
        
        fetchComment();
        setComment('');
    }

    // 코멘트 수정 버튼 클릭
    const handleEditClick = (commentId, content) => {
        setEditCommentId(commentId);
        setEditCommentContent(content);
        setToggleIndex(null);
    }

    // 코멘트 수정 사항 저장
    const commentEditSaveClick = async () => {
        if (!editCommentContent) {
            alert('코멘트를 입력해주세요.');
            return;
        }

        await fetchCommentEditData(Comment.putComment(editCommentId, editCommentContent));
        
        fetchComment();
        setEditCommentId(null);
        setEditCommentContent('');
    }   

    // 코멘트 삭제
    const commentDeleteClick = async (commentId) => {
        await fetchCommentDeleteData(Comment.deleteComment(commentId));
        fetchComment();
    }
    
    // header에 있는 moreIcon
    const toggleMenu = () => {
        setIsToggle(!isToggle);
    };

    // 코멘트에 있는 moreIcon
    const toggleMenu2 = (index) => {
        if (toggleIndex === index) {
            setToggleIndex(null);
        } else {
            setToggleIndex(index);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className={styles.allContainer}>
            <div className={styles.header}>
                <Button type="button" variant="inactive" label={<ArrowIcon fill="#1d1d1d" />} onClick={() => navigate(-1)} />
                <div className={styles.rightHeader}>
                    <Noti />
                    {pageDetail.isUpdatable === 1 && (
                        <>
                            <button className={styles.moreIcon} onClick={toggleMenu} >
                                <MoreIcon stroke="black" />
                            </button>
                            {isToggle && (
                                <div className={styles.menuContainer}>
                                    <Button type="button" variant="inactive" label="수정하기" onClick={() => navigate(`/edit/paper/${paperId}`)} />
                                    <button className={styles.exitButton}>삭제하기</button>
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
                            <PlaceMark color="#AAA"  />
                            <p>{pageDetail.city}, {pageDetail.store}</p>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <Button type="button" variant="inactive" label={<PlaceSaveIcon color="#000" fill={isSaveIconFilled ? "#000" : "none"}/>} onClick={handleSaveIconClick} />
                    </div>
                </div>
                <div className={styles.mapContainer}>
                    <MapApiPlace height="218px" coordinateX={pageDetail.coordinateX} coordinateY={pageDetail.coordinateY}/>
                </div>
                <hr />
                <div className={styles.pharsesContainer}>
                    <MessageIcon stroke="#000" />
                    <p>코멘트 ({commentList.length})</p>
                </div>
                {isCommetOpen ? (
                    <div className={styles. allCommentContainer}>
                        {commentList.map((comment, index) => (
                            <div className={styles.commentsContainer} key={index}>
                                <img src={comment.profileImg} alt={comment.userNickname} />
                                <div className={styles.commentContainer}>
                                    <p className={styles.nickName}>{comment.userNickname}</p>
                                    <p className={styles.date}>{comment.createdAt}</p>
                                    {editCommentId === comment.id ? (
                                        <div className={styles.commentEdit}>
                                            <InputField 
                                                value={editCommentContent} 
                                                onChange={(e) => setEditCommentContent(e.target.value)} 
                                            />
                                            <Button type="button" variant="active" label="수정" onClick={commentEditSaveClick} />
                                        </div>
                                    ) : (
                                        <p className={styles.comment}>{comment.content}</p>
                                    )}
                                </div>
                                {comment.isUpdatable === 1 && (
                                    <>
                                        <button className={styles.moreIcon} onClick={() => toggleMenu2(index)} >
                                            <MoreIcon stroke="black" />
                                        </button>
                                        {toggleIndex === index && (
                                            <div className={styles.tapContainer}>
                                                <Button type="button" variant="inactive" label="수정하기" onClick={() => handleEditClick(comment.id, comment.content)} />
                                                <button className={styles.deleteButton} onClick={() => commentDeleteClick(comment.id)}>삭제하기</button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles. allCommentContainer}>
                        {commentList.map((comment, index) => (
                            <div className={styles.commentsContainer} key={index}>
                                <img src={comment.profileImg} alt={comment.userNickname} />
                                <div className={styles.commentContainer}>
                                    <p className={styles.nickName}>{comment.userNickname}</p>
                                    <p className={styles.date}>{comment.date}</p>
                                    <p className={styles.textshadow}>asfs dfds fsd</p>
                                </div>
                            </div>
                        ))}
                        <div className={styles.commentClosed}>
                            <LoudSpeakerIcon color="#E60000" />
                            <p>모든 멤버가 코멘트를 등록해야<br/>기록 확인이 가능합니다.</p>
                        </div>
                    </div>
                )}
                <div className={styles.sendComment}>
                    <InputField placeholder="코멘트 한줄 입력해주세요 :)" value={comment} onChange={handleInputChange}/>
                    <Button type="button" variant="active" label={<CommentIcon color="#fff" />} onClick={commentAddClick}/>
                </div>
            </div>
            {isModalOpen && (
                <Modal closeFn={closeModal}>
                    <Modal.Icon>
                        {isSaveIconFilled ? <img src="/src/assets/images/completedImage.png" alt="저장" /> : <img src="/src/assets/images/cancelImage.png" alt="취소" />}
                        
                    </Modal.Icon> 
                    <Modal.Body>
                        <p>{isSaveIconFilled ? "장소 저장이 완료되었습니다." : "장소 저장이 취소되었습니다."}</p>
                    </Modal.Body>
                    <Modal.Button>
                        {isSaveIconFilled ? (
                            <Button  type="button"  label="저장리스트 확인하기" variant="active" onClick={() => navigate('/mypage/savepagelist')} />
                            ) : (
                            <Button type="button" label="확인" variant="active" onClick={() => setIsModalOpen(false)} />
                        )}
                    </Modal.Button>
                </Modal>
            )}
        </div>

    )
}

export default PaperPage;