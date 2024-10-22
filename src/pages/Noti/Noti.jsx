import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Noti.module.scss';
import NoResult from '@/components/NoResult/NoResult';
import BellIcon from '@/assets/icons/BellIcon';
import Button from '@/components/Button/Button';
import clsx from 'clsx';
import useAxios from '@/hooks/useAxios';
import Notice from '@/apis/api/Notice';
import MoreIcon from "@/assets/icons/MoreIcon";
import Modal from "@/components/Modal/Modal";
import XImg from "@/assets/images/cancelImage.png";
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import ArrowIcon from "@/assets/icons/ArrowIcon";
import CheckIcon from "@/assets/icons/CheckIcon";

const Noti = () => {
  const { fetchData: fetchNoti, data: notiData } = useAxios();
  const { fetchData: fetchNotiDelete, response: deleteRes } = useAxios();
  const { fetchData: fetchNotiDeleteAll, response: allDeleteRes } = useAxios();
  const { fetchData: fetchNotiDeleteSelect, response: selectDeleteRes } = useAxios();
  const [notiList, setNotiList] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [allDelete, setAllDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [allDeleteSuccess, setAllDeleteSuccess] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null); // 선택된 알림 ID 추가
  const [page, setPage] = useState(1); // 페이지 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const targetEl = useRef(null); // 무한 스크롤 타겟 요소
  const intersecting = useInfiniteScroll(targetEl); // 무한 스크롤 훅 사용
  const [isToggle, setIsToggle] = useState(null);
  const [isSelect, setIsSelect] = useState(false); // 선택 삭제 버튼 활성화
  const [isCheck, setIsCheck] = useState(false); // 체크박스 클릭 시 삭제하기 버튼 활성화
  const navigate = useNavigate();

  // 알림 조회
  const fetchNotiData = async () => {
    setLoading(true);
    const size = 10;
    const requestTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace(' ', 'T');
    const params = { size, page, requestTime };
    await fetchNoti(Notice.getNoticeList(params));
    setLoading(false);
  };

  useEffect(() => {
    fetchNotiData();
  }, []);

  // 데이터가 업데이트될 때 userSaveList 갱신
  useEffect(() => {
    if (notiData) {
      setNotiList((prevList) => [...prevList, ...notiData]); // 기존 리스트에 새 데이터 추가
    }
  }, [notiData]);


  // 페이지가 변경될 때마다 추가 데이터 불러오기
  useEffect(() => {
    if (intersecting && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [intersecting]);

  // 페이지 변경에 따른 데이터 로드
  useEffect(() => {
    if (page > 1) {
      fetchNotiData();
    }
  }, [page]);

  // 최신 알림 시간으로 로컬 스토리지 업데이트
  useEffect(() => {
    if (notiList.length > 0) {
      const latestTime = notiList[0].time;
      localStorage.setItem('latestTime', latestTime);
      // 알림 페이지 확인 시 알림 비활성화
      localStorage.setItem('notiActivation', 'false');
    }
  }, [notiList]);

  // 버튼 클릭 시 해당 페이지로 이동
  const handleButton = (noti) => {
    if (noti.type === "친구") {
      navigate('/friends');
    } else if (noti.type === "코멘트") {
      navigate(`/papers/${noti.paperId}`);
    } else if (noti.type === "기록") {
      navigate(`/papers/${noti.paperId}`);
    }
  }

  // 알림 삭제
  // 삭제하기 버튼 각자 보이기
  const showDeleteButton = (idx) => {
    setActiveId(activeId === idx ? null : idx)
  }

  // 클릭 시 버튼 숨기기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.moreBtn}`)) {
        setActiveId(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // 삭제하기 모달 열기
  const deleteModal = (noticeId) => {
    setSelectedNoticeId(noticeId); // 선택된 알림 ID 저장
    setIsModal(true);
  }

  // 삭제 버튼
  const handleDelete = async (noticeId) => {
    await fetchNotiDelete(Notice.deleteNotice(noticeId));
    setNotiList(notiList.filter(noti => noti.id !== noticeId));
    setIsModal(false); // 모달 닫기
  }

  useEffect(() => {
    if (deleteRes && deleteRes.status === 204) {
      setDeleteSuccess(true);
      window.location.reload();
    }
  }, [deleteRes])

  // ISO 날짜 문자열을 한국 날짜 형식으로 변환하는 함수
  const formatKoreanDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = {
      timeZone: 'Asia/Seoul',
      weekday: "short"
    };
    const day = new Intl.DateTimeFormat('ko-KR', options).format(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(date.getDate()).padStart(2, '0');
    
    return `${year}.${month}.${dayOfMonth} (${day})`;
  };

  // header에 있는 moreIcon
  const toggleMenu = () => {
    setIsToggle(isToggle ? false : true);
  };

  // 다른 여백 누르면 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.moreIcon}`)) {
        setIsToggle(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // 전체 삭제
  const handleAllDelete = async () => {
    await fetchNotiDeleteAll(Notice.deleteNoticeAll());
    setNotiList([]); // 전체 알림 삭제
    setAllDelete(false);
  }

  // 전체 삭제 성공
  useEffect(() => {
    if (allDeleteRes && allDeleteRes.status === 204) {
      setAllDeleteSuccess(true);
    }
  }, [allDeleteRes])

  // 선택 삭제 버튼
  const handleSelectDelete = async () => {
    // selectedNoticeIds는 선택된 알림 ID들
    const selectedNoticeIds = [];
    const checkboxes = document.querySelectorAll(`.${styles.checkbox}`);
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedNoticeIds.push(Number(checkbox.id.split('_')[1]));
      }
    })

    await fetchNotiDeleteSelect(Notice.deleteNoticeSelected({ noticeIds: selectedNoticeIds }));
  }

  // 선택 삭제 성공
  useEffect(() => {
    if (selectDeleteRes && selectDeleteRes.status === 204) {
      setIsCheck(false);
      window.location.reload();
    }
  }, [selectDeleteRes])

  // 체크박스 클릭 시 삭제하기 버튼 활성화
  useEffect(() => {
    const buttonActive = () => {
      const checkboxes = document.querySelectorAll(`.${styles.checkbox}`);
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
          setIsCheck(checkboxes.length > 0 && Array.from(checkboxes).some((checkbox) => checkbox.checked));
        })
      })
    }
    buttonActive()
  }, [isSelect])

  // 취소하기
  const handleCancel = () => {
    setIsSelect(false);
    setIsCheck(false);
    // 체크박스 초기화
    const checkboxes = document.querySelectorAll(`.${styles.checkbox}`);
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    })
  }

  return (
    <>
      <div className={styles.header}>
        <Button type="button" variant="inactive" label={<ArrowIcon fill="#1d1d1d" />} onClick={() => navigate(-1)} />
        <h1 className={styles.title}>알림</h1>
        <div className={styles.rightHeader}>
          {notiList.length > 0 ? 
            <button className={styles.moreIcon} onClick={toggleMenu}>
              <MoreIcon stroke="black" />
            </button>
            :
            null
          }
          {isToggle && (
            <div className={styles.menuContainer}>
              <Button type="button" variant="inactive" label="선택 삭제" onClick={() => setIsSelect(true)}/>
              <button className={styles.exitButton} type="button" onClick={() => setAllDelete(true)}>전체 삭제</button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.NotiWrap}>
        <div className={styles.wrap}>
          {notiList.length === 0 ? 
            <NoResult icon={<BellIcon stroke={"#616161"} strokeWidth={1.0}/>} message="알림이 없습니다."/> 
            :
            notiList.map((noti, idx) => (
              <div key={idx} className={styles.NotiBox}>
                <div className={styles.checkBox}
                  style={
                    isSelect ? {display: "block"} : {display: "none"}
                  }
                  >
                  <input type="checkbox" id={`selectDelete_${noti.noticeId}`} name={`selectDelete_${noti.noticeId}`} className={styles.checkbox}/>
                  <label htmlFor={`selectDelete_${noti.noticeId}`} className={styles.selectDelete}>
                    <CheckIcon/>
                  </label>
                </div>
                <div className={styles.Noti} onClick={() => handleButton(noti)}>
                  <div className={styles.contentBox}>
                    <p className={clsx(styles.category, {
                      [styles.friend]: noti.type === "친구",
                      [styles.comment]: noti.type === "코멘트",
                      [styles.record]: noti.type === "기록"
                    })}>
                      {noti.type}
                    </p>
                    <p className={styles.content}>{noti.message}</p>
                  </div>
                  <p className={styles.date}>{formatKoreanDate(noti.time)}</p>
                </div>
                <div className={styles.btnBox}>
                  <div className={styles.moreBtn}>
                    <Button type="button" label={<MoreIcon stroke="#AAAAAA"/>} variant="inactive" onClick={() => showDeleteButton(idx)}/>
                    {activeId === idx && 
                      <div className={styles.buttonWrap} style={{display:"block"}}>
                        <Button type="button" label="삭제하기" variant="inactive" onClick={() => deleteModal(noti.noticeId)}/>
                      </div>
                    }
                  </div>
                </div>
              </div>
            ))}
            <div ref={targetEl} style={{ height: '1px' }} /> {/* 무한 스크롤 트리거 요소 */}
            {isModal && (
              <Modal closeFn={() => setIsModal(false)}>
                <Modal.Icon><img src={XImg} alt="x"/></Modal.Icon>
                <Modal.Body>
                  {deleteSuccess ? "삭제되었습니다." : `알림을 삭제하시겠습니까?`}
                </Modal.Body>
                <Modal.Button>
                  {deleteSuccess ? 
                    <Button type="button" label="확인" variant="active" onClick={() => {setIsModal(false); window.location.reload()}}/>
                    :
                    <Button type="button" label="삭제하기" variant="active" onClick={() => handleDelete(selectedNoticeId)}/>
                  }
                </Modal.Button>
              </Modal>
            )}
            {allDelete && (
              <Modal closeFn={() => setAllDelete(false)}>
                <Modal.Icon><img src={XImg} alt="x"/></Modal.Icon>
                <Modal.Body>
                  {allDeleteSuccess ? "삭제되었습니다." : `전체 알림을 삭제하시겠습니까?`}
                </Modal.Body>
                <Modal.Button>
                  {allDeleteSuccess ? 
                    <Button type="button" label="확인" variant="active" onClick={() => {setAllDelete(false); window.location.reload()}}/>
                    :
                    <Button type="button" label="삭제하기" variant="active" onClick={() => handleAllDelete()}/>
                  }
                </Modal.Button>
              </Modal>
            )}
        </div>
        <div className={styles.deleteBtnBox}
          style={
            isSelect ? {display: "block"} : {display: "none"}
          }>
          <div>
            <Button type="button" label="취소하기" variant="noFilled" onClick={handleCancel} />
            <Button type="button" label="삭제하기" variant={isCheck ? "active" : "disabled"} onClick={handleSelectDelete}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Noti;