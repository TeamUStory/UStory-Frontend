import { useState } from 'react';
import styles from './Friends.module.scss';
import Button from "@/components/Button/Button";
import MoreIcon from "@/assets/icons/MoreIcon";
import propTypes from 'prop-types';
import Modal from "@/components/Modal/Modal";
import XImg from "@/assets/images/cancelImage.png";
import useAxios from '@/hooks/useAxios';
import Friend from '@/apis/api/Friend';

const MoreBtn = ({ onClick, isActive, friendNickname }) => {
  const [isModal, setIsModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const { fetchData } = useAxios();

  // 삭제하기 모달 열기
  const deleteModal = () => { setIsModal(true); }

  // 모달 열릴 때 isActive 초기화
  if(isModal) {
    isActive = false;
  }

  // 삭제 버튼
  const handleDelete = async () => {
    await fetchData(Friend.deleteFriend(friendNickname));
    setDeleteSuccess(true) 
  }

  return (
    <div className={styles.moreBtn}>
      <Button type="button" label={<MoreIcon stroke="#1d1d1d"/>} variant="inactive" onClick={onClick}/>
      {isActive && (
        <div className={styles.buttonWrap} style={{display:"block"}}>
          <Button type="button" label="삭제하기" variant="inactive" onClick={deleteModal}/>
        </div>
      )}
      {isModal && (
        <Modal closeFn={() => setIsModal(false)}>
          <Modal.Icon><img src={XImg} alt="x"/></Modal.Icon>
          <Modal.Body>
            {deleteSuccess ? "삭제되었습니다." : `정말 삭제하시겠습니까?\n(삭제 시 친구 목록에서도 사라집니다.)`}
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
    </div>
  )
}

MoreBtn.propTypes = {
  onClick: propTypes.func,
  isActive: propTypes.bool,
  friendNickname: propTypes.string
}

export default MoreBtn;