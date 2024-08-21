import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from  "@/redux/slices/userSlice";

const EditMypage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [lastWithdrawal, setLastWithdrawal] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const [nicknameValid, setNicknameValid] = useState(false);
  const [nicknameButtonDisabled, setNicknameButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [pwCheck, setPwCheck] = useState(false);
  const { fetchData: fetchUserData, data: userData } = useAxios();
  const { fetchData: fetchNicknameData, data: nicknameData } = useAxios();
  const { fetchData: fetchEditUser, data: editUserData } = useAxios();
  const { fetchData: fetchDeleteUser, response: deleteUserData } = useAxios();
  const navigator = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  
  const text = "탈퇴";
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
    if (userData) {
      dispatch(setUser(userData));

      setValue('profileImgUrl', userData.profileImgUrl);
      setValue('nickname', userData.nickname);
      setValue('name', userData.name);
      setValue('profileDescription', userData.profileDescription);
    }

    if(userData?.profileImgUrl === "") {
      setValue('profileImgUrl', "https://ustory-bucket.s3.ap-northeast-2.amazonaws.com/common/user-profile.png");
    }
  },[userData, dispatch, setValue])
  
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

  // 받아온 유저 데이터에서 닉네임 입력에 변화가 없으면 인증 안해도 됨
  useEffect(() => {
    if(userData && nickname === userData.nickname) {
      setNicknameValid(true);
      setErrorMessage("");
    } else if (userData && nickname !== userData.nickname) {
      setNicknameValid(false);
      setErrorMessage("* 닉네임이 변경되었습니다. 다시 확인해 주세요.");
    }
  }, [nickname, userData])

  // 정보 수정
  const onSubmit = async (data) => {
    await fetchEditUser(User.putUser(data));
  };

  useEffect(() => {
    if (editUserData) {
      setEditSuccess(true);
    }
  },[editUserData])

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setLastWithdrawal(false);
  }

  // 찐탈퇴
  const handleLastWithdrawal = async () => {
    if(text === message) {
      await fetchDeleteUser(User.deleteUser());
      setPwCheck(false);
    }  else if (text !== message) {
      setPwCheck(true);
    }
  }

  useEffect(() => {
    if (deleteUserData && deleteUserData.status === 200) {
      navigator('/login');
    }
  }, [deleteUserData, navigator]);

  // 프로필 이미지 업로드
  const handleProfileUpload = (url) => {
    setValue('profileImgUrl', url);
  }

  return(
    <>
      <SubHeader pageTitle="정보 수정하기" />
      <div className={styles.editWrap}>
        <div className={styles.wrap}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 이미지 업로드, 프리뷰 컴포넌트 */}
            <ProfileUpload profileUrl={watch('profileImgUrl')} onUploadComplete={handleProfileUpload}/>
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
                  variant="active"
                />
                :
                <Button 
                  type="submit" 
                  label="수정하기" 
                  variant={watch('nickname') && watch('name') && watch('profileDescription') && watch('profileImgUrl') ? "active" : "disabled"}
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
            <p>아래 메세지를 똑같이 입력해 주세요.</p>
            <span className={styles.needMessage}>"{text}"</span>
            <input type="text" placeholder='메세지 입력' className={styles.input} value={message} onChange={(e) => setMessage(e.target.value)}/>
            {pwCheck ? <span className={styles.error} style={{marginTop:"15px", display:"inline-block"}}>메세지가 맞지 않습니다.</span> : null}
          </Modal.Body>
          <Modal.Button>
            <Button type="button" label="탈퇴하기" variant="active" onClick={handleLastWithdrawal}/>
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