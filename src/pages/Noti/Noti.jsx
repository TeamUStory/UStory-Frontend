import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Noti.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import NoResult from '@/components/NoResult/NoResult';
import BellIcon from '@/assets/icons/BellIcon';
import Button from '@/components/Button/Button';
import clsx from 'clsx';
import useAxios from '@/hooks/useAxios';
import Notice from '@/apis/api/Notice';
import MoreIcon from "@/assets/icons/MoreIcon";
import Modal from "@/components/Modal/Modal";
import XImg from "@/assets/images/cancelImage.png";

const Noti = () => {
  const { fetchData: fetchNoti, data: notiData } = useAxios();
  const { fetchData: fetchNotiDelete } = useAxios();
  const [notiList, setNotiList] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  // 알림 조회
  useEffect(() => {
    const fetchNotiData = async () => {
      const size = 10;
      const page = 1;
      const requestTime = new Date().toISOString().split('.')[0];
      await fetchNoti(Notice.getNoticeList({ size, page, requestTime }));
    }
    fetchNotiData();
  }, [fetchNoti]);

  useEffect(() => {
    if (notiData) {
      setNotiList(notiData)
      // 최신 알림 시간으로 로컬 스토리지 업데이트
      if (notiData.length > 0) {
        const latestTime = notiData[0].time;
        localStorage.setItem('latestTime', latestTime);
        // 알림 페이지 확인 시 알림 비활성화
        localStorage.setItem('notiActivation', 'false');
      }
    }
  }, [notiData, setNotiList]);

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
  const deleteModal = () => { setIsModal(true); }

  // 삭제 버튼
  const handleDelete = async (noticeId) => {
    await fetchNotiDelete(Notice.deleteNotice(noticeId));
    setDeleteSuccess(true) 
    setNotiList(notiList.filter(noti => noti.id !== noticeId));
  }

  return (
    <>
      <SubHeader pageTitle={"알림"} />
      <div className={styles.NotiWrap}>
        <div className={styles.wrap}>
          {notiList.length === 0 ? 
            <NoResult icon={<BellIcon stroke={"#616161"} strokeWidth={1.0}/>} message="알림이 없습니다."/> 
            :
            notiList.map((noti, idx) => (
              <div key={idx} className={styles.NotiBox}>
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
                  <p className={styles.date}>{noti.time.split("T")[0]}</p>
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
        </div>
      </div>
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
              <Button type="button" label="삭제하기" variant="active" onClick={handleDelete}/>
            }
          </Modal.Button>
        </Modal>
      )}
    </>
  )
}

export default Noti