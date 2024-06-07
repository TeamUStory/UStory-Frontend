import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Mypage.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import InputField from '@/components/InputField/InputField';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import BanImg from '@/assets/images/ban.png';
import ProfileUpload from './ProfileUpload';
import useAxios  from '../../hooks/useAxios';
import User from '@/apis/api/User';
import completedImage from '@/assets/images/completedImage.png';

const EditMypage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [lastWithdrawal, setLastWithdrawal] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const [nicknameValid, setNicknameValid] = useState(false);
  const [nicknameButtonDisabled, setNicknameButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);
  const { fetchData: fetchUserData, data: userData } = useAxios();
  const { fetchData: fetchNicknameData, data: nicknameData } = useAxios();
  const { fetchData: fetchEditUser, data: editUserData } = useAxios();

  const nickname = watch('nickname');

  useEffect(() => {
    if (nickname) {
      setNicknameButtonDisabled(false);
      
    } else {
      setNicknameButtonDisabled(true);
      setNicknameValid(false);
      setErrorMessage("");
    }

  }, [nickname]);

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData(User.getUser());
    }
    fetchData();
  },[fetchUserData])

  useEffect(() => {
    if(userData) {
      setValue('profileImgUrl', userData.nickname);
      setValue('nickname', userData.nickname);
      setValue('name', userData.name);
      setValue('profileDescription', userData.profileDescription);
    }
  },[userData, setValue])

  // 닉네임 유효성 검사 로직
  const handleNicknameValidation = async () => {
    const userData = { nickname: nickname };

    await fetchNicknameData(User.postNickname(userData));

    if(nicknameValid === false) {
      // 에러메세지 사라지기
      setErrorMessage("");  
    }
  };

  useEffect(() => {
    if (nicknameData) {
      // 중복 닉네임 있을 때
      if (nicknameData.isDuplicate === true) {
        setNicknameValid(false);
        setErrorMessage("* 이미 사용 중인 닉네임입니다.");
      } else {
        setNicknameValid(true);
      }
    }
  }, [nicknameData])

  // 정보 수정
  const onSubmit = async (data) => {
    await fetchEditUser(User.putUser(data));
  };

  useEffect(() => {
    if (editUserData) {
      console.log(editUserData);
      setEditSuccess(true);
    }
  },[editUserData])

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ProfileUpload />
            <div className={styles.certified}>
              <div className={styles.inputBox}>
                <InputField 
                  type="text"
                  label="닉네임"
                  placeholder="닉네임"
                  {...register('nickname')}
                />
              </div>
              <Button type="button" label="확인" variant={nicknameButtonDisabled ? "disabled" : "active"} onClick={handleNicknameValidation}/>
            </div>
            {<p className={styles.error}>{errorMessage}</p>}
            {nicknameValid && <p className={styles.success}>* 사용 가능한 닉네임입니다.</p>}
            <InputField
              type="text"
              placeholder="이름"
              label="이름"
              {...register('name')}
            />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            <InputField 
              type="text" 
              label="자기 소개" 
              placeholder="자기 소개 (150자 이내)"
              {...register('profileDescription', { 
                required: "* 자기 소개를 입력해 주세요.",
                maxLength: {
                  value: 150,
                  message: "* 150자 이내로 작성해 주세요."
                }
              })}
            />
            {errors.profileDescription && <p className={styles.error}>{errors.profileDescription.message}</p>}
            <div className={styles.btnWrap}>
              {!nicknameValid ? 
                <Button type="button" 
                  onClick={() => setErrorMessage("* 닉네임 확인은 필수입니다.")} 
                  label="수정하기" 
                  variant={watch('nickname') && watch('name') && watch('profileDescription') ? "active" : "disabled"}
                />
                :
                <Button 
                  type="submit" 
                  label="수정하기" 
                  variant={watch('nickname') && watch('name') && watch('profileDescription') ? "active" : "disabled"}
                />
              }
              
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
      {editSuccess && (
        <Modal closeFn={closeModal}>
          <Modal.Icon><img src={completedImage} alt="ban" /></Modal.Icon>
          <Modal.Body><p>수정이 완료되었습니다.</p></Modal.Body>
          <Modal.Button>
            <Button type="button" label="확인" variant="active" onClick={() => window.location.reload()}/>
          </Modal.Button>
        </Modal>
      
      )}
    </>
    
  )
}

export default EditMypage;