import { useState } from 'react';
import styles from './Friends.module.scss';
import Button from "@/components/Button/Button";
import MoreIcon from "@/assets/icons/MoreIcon";
import propTypes from 'prop-types';
import Modal from "@/components/Modal/Modal";
import XImg from "@/assets/images/cancelImage.png";

const MoreBtn = ({ onClick, isActive }) => {
  const [isModal, setIsModal] = useState(false);

  // 삭제하기 모달 열기
  const deleteModal = () => { setIsModal(true) }

  // 모달 열릴 때 isActive 초기화
  if(isModal) {
    isActive = false;
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
          <Modal.Body>정말 삭제하시겠습니까?<br/>(삭제 시 친구 목록에서도 사라집니다.)</Modal.Body>
          <Modal.Button>
            <Button type="button" label="삭제하기" variant="active" onClick={() => console.log("찐삭제")}/>
          </Modal.Button>
        </Modal>
      )}
    </div>
  )
}

MoreBtn.propTypes = {
  onClick: propTypes.func,
  isActive: propTypes.bool
}

export default MoreBtn;