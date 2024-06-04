import { useState } from 'react';
import styles from './Mypage.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import InputField from '@/components/InputField/InputField';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import BanImg from '@/assets/images/ban.png';
import ProfileUpload from './ProfileUpload';

const EditMypage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [lastWithdrawal, setLastWithdrawal] = useState(false);

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setLastWithdrawal(false);
  }

  return(
    <>
      <SubHeader pageTitle="정보 수정하기" />
      <div className={styles.editWrap}>
        <div className={styles.wrap}>
          <form>
            <ProfileUpload />
            <div className={styles.certified}>
              <div className={styles.inputBox}>
                <InputField type="text" label="닉네임" placeholder="닉네임 (10자 이내)"/>
              </div>
              <Button type="button" label="확인" variant="active"/>
            </div>
            <InputField type="text" label="이름" placeholder="이름"/>
            <InputField type="text" label="자기 소개" placeholder="자기 소개 (150자 이내)"/>
            <div className={styles.btnWrap}>
              <Button type="submit" label="수정하기" variant="disabled"/>
              <button type='button' className={styles.withdrawal} onClick={() => setModalOpen(true)}>회원 탈퇴하기</button>
            </div>
          </form>
        </div>
      </div>
      {modalOpen && (
        <Modal closeFn={closeModal}>
          <Modal.Icon><img src={BanImg} alt="ban" /></Modal.Icon>
          <Modal.Body><p>정말 탈퇴하시겠습니까?</p></Modal.Body>
          <Modal.Button>
            <Button type="button" label="탈퇴하기" variant="active" onClick={() => {setLastWithdrawal(true), setModalOpen(false)}}/>
          </Modal.Button>
        </Modal>
      )}
      {lastWithdrawal && (
        <Modal closeFn={closeModal}>
          <Modal.Icon><img src={BanImg} alt="ban" /></Modal.Icon>
          <Modal.Body>
            <p>비밀번호를 입력하면 탈퇴가 완료됩니다.</p>
            <input type="password" placeholder='비밀번호 입력' className={styles.input} />
          </Modal.Body>
          <Modal.Button>
            <Button type="button" label="탈퇴하기" variant="active" onClick={() => console.log("찐탈퇴")}/>
          </Modal.Button>
        </Modal>
      )}
    </>
    
  )
}

export default EditMypage;