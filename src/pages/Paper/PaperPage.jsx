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
import MapApi from '@/apis/MapApis/MapApi';
import InputField from '@/components/InputField/InputField';
import MessageIcon from '@/assets/icons/MessageIcon';
import Modal from '@/components/Modal/Modal';
import LoudSpeakerIcon from '@/assets/icons/LoudSpeakerIcon';
import Paper from '../../apis/api/Paper';
import Comment from '@/apis/api/Comment';
import BookMark from '@/apis/api/BookMark';
import useAxios from '@/hooks/useAxios';

const commentsData = [
    { nickName: '껑냥이', date: '2024.06.01 (토)', comment: '너무너무 재미있었고, 오늘 진짜 존맛탱이어써' },
    { nickName: '껑냥이', date: '2024.06.01 (토)', comment: '너무너무 재미있었고, 오늘 진짜 존맛탱이어써' },
    { nickName: '껑냥이', date: '2024.06.01 (토)', comment: '너무너무 재미있었고, 오늘 진짜 존맛탱이어써' }
];

const PaperPage = () => {
    const navigate = useNavigate();  
    const { paperId } = useParams(); 
    const [isToggle, setIsToggle] = useState(false);
    const [toggleIndex, setToggleIndex] = useState(null);
    const [isSaveIconFilled, setIsSaveIconFilled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCommetOpen, setCommentOpen] = useState(0);
    const [pageDetail, setPageDetail] = useState([]);

    const { data:pageData, fetchData:fetchPageData} = useAxios();
    const { data:commentData, fetchData:fetchCommentData} = useAxios();

    useEffect(() => {
        const fetchPage = async () => {
            await fetchPageData(Paper.getPaperDetail(paperId));
        }
        fetchPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchPageData]);
        
    useEffect(() => {
        if (pageData){
            setPageDetail(pageData);
        }
    }, [pageData]);

    console.log(pageData);
    
    // header에 있는 moreIcon
    const toggleMenu = () => {
        setIsToggle(!isToggle);
    };

    // 코멘트에 있는 moreIcon
    const toggleMenu2 = (index) => {
        if (toggleIndex === index) {
            setToggleIndex(null); // 이미 열려 있는 경우 닫기
        } else {
            setToggleIndex(index); // 다른 댓글의 메뉴 열기
        }
    };


    // 저장 버튼
    const handleSaveIconClick = () => {
        setIsSaveIconFilled(!isSaveIconFilled);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        setCommentOpen(false);
    },[])

    return (
        <div className={styles.allContainer}>
            <div className={styles.header}>
                <Button type="button" variant="inactive" label={<ArrowIcon fill="#1d1d1d" />} onClick={() => navigate(-1)} />
                <div className={styles.rightHeader}>
                    <button onClick={() => navigate(0)} >
                        <Noti />
                    </button>
                    <button className={styles.moreIcon} onClick={toggleMenu} >
                        <MoreIcon stroke="black" />
                    </button>
                    {isToggle && (
                        <div className={styles.menuContainer}>
                            <Button type="button" variant="inactive" label="수정하기" onClick={() => navigate("/editpaper")} />
                            <button className={styles.exitButton}>삭제하기</button>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.contentsContainer}>
                <p className={styles.pageName}>{pageDetail.title}</p>
                <div className={styles.imagesContainer}>
                    <img src={pageDetail.thumbnailImageUrl} alt={pageDetail.title} />
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
                    <MapApi height="218px" />
                </div>
                <hr />
                <div className={styles.pharsesContainer}>
                    <MessageIcon stroke="#000" />
                    <p>코멘트 (3)</p>
                </div>
                {isCommetOpen ? (
                    <div className={styles. allCommentContainer}>
                        {commentsData.map((comment, index) => (
                            <div className={styles.commentsContainer} key={index}>
                                <img src="/src/assets/images/basic_profile.png" alt='기본 프로필' />
                                <div className={styles.commentContainer}>
                                    <p className={styles.nickName}>{comment.nickName}</p>
                                    <p className={styles.date}>{comment.date}</p>
                                    <p className={styles.comment}>{comment.comment}</p>
                                </div>
                                <button className={styles.moreIcon} onClick={() => toggleMenu2(index)} >
                                    <MoreIcon stroke="black" />
                                </button>
                                {toggleIndex === index && (
                                    <div className={styles.tapContainer}>
                                        <Button type="button" variant="inactive" label="수정하기" onClick={() => navigate("/editpaper")} />
                                        <button className={styles.deleteButton}>삭제하기</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles. allCommentContainer}>
                        {commentsData.map((comment, index) => (
                            <div className={styles.commentsContainer} key={index}>
                                <img src="/src/assets/images/basic_profile.png" alt='기본 프로필' />
                                <div className={styles.commentContainer}>
                                    <p className={styles.nickName}>{comment.nickName}</p>
                                    <p className={styles.date}>{comment.date}</p>
                                    <p className={styles.textshadow}>asfs dfds fsd</p>
                                </div>
                                <button className={styles.moreIcon} onClick={() => toggleMenu2(index)} >
                                    <MoreIcon stroke="black" />
                                </button>
                                {toggleIndex === index && (
                                    <div className={styles.tapContainer}>
                                        <Button type="button" variant="inactive" label="수정하기" onClick={() => navigate("/editpaper")} />
                                        <button className={styles.deleteButton}>삭제하기</button>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className={styles.commentClosed}>
                            <LoudSpeakerIcon color="#E60000" />
                            <p>모든 멤버가 코멘트를 등록해야<br/>기록 확인이 가능합니다.</p>
                        </div>
                    </div>
                )}
                <div className={styles.sendComment}>
                    <InputField placeholder="코멘트 한줄 입력해주세요 :)"/>
                    <Button type="button" variant="active" label={<CommentIcon color="#fff" />}/>
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
                        <Button type="button" label={isSaveIconFilled ? "저장리스트 확인하기" : "확인"} variant="active" onClick={() => navigate('/mypage/savepagelist')} />
                    </Modal.Button>
                </Modal>
            )}
        </div>

    )
}

export default PaperPage;