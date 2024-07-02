import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from "./FindPassword.module.scss";
import SubHeader from "@/components/SubHeader/SubHeader";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import useAxios  from '@/hooks/useAxios';
import User from "@/apis/api/User";
import Modal from '@/components/Modal/Modal';
import completedImage from '@/assets/images/completedImage.png';
import cancelImage from '@/assets/images/cancelImage.png';

const FindPassword = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { fetchData: fetchResetPassword, data: resetPasswordData } = useAxios();
  const [resetSuccess, setResetSuccess] = useState(false); // 비밀번호 재설정 성공 여부
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigator = useNavigate();

  // 재설정 버튼 활성화 로직
  const onSubmit = async () => {
    const userData = {
      password: watch('password'),
      passwordCheck: watch('confirmPassword')
    }

    await fetchResetPassword(User.putResetPassword(userData));
  }

  useEffect(() => {
    if (resetPasswordData) {
      setResetSuccess(true);
      setIsModalOpen(true);
    } else {
      setResetSuccess(false);
    }
  }, [resetPasswordData]);

  // 재설정 성공 시 로그인 페이지로 이동
  const resetSuccessHeandler = () => {
    navigator("/login");
    localStorage.removeItem("accessToken");
  }

  return(
    <>
      <SubHeader pageTitle={"비밀번호 재설정"}/>
      <div className={styles.formBox}>
        <div className={styles.wrap}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
              type="password"
              placeholder="새 비밀번호 (영문, 숫자, 특수문자 1개 포함 8~16자)"
              label="새 비밀번호"
              {...register('password', {
                required: "* 새 비밀번호를 입력해 주세요.",
                minLength: {
                  value: 8,
                  message: "* 비밀번호는 8자 이상이어야 합니다."
                },
                maxLength: {
                  value: 16,
                  message: "* 비밀번호는 16자 이하여야 합니다."
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*])[a-zA-Z\d~!@#$%^&*]{8,16}$/,
                  message: "* 비밀번호는 영문, 숫자, 특수문자를 1개 이상 포함해야 합니다."
                }
              })}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            <InputField
              type="password"
              placeholder="새 비밀번호 재확인"
              label="새 비밀번호 재확인"
              {...register('confirmPassword', {
                required: "* 비밀번호를 다시 입력해 주세요.",
                validate: (value) => value === watch('password') || "* 비밀번호가 일치하지 않습니다."
              })}
            />
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
            <div className={styles.btnWrap}>
              <Button type="submit" label="비밀번호 재설정하기" variant={watch('password') && watch('confirmPassword') ? "active" : "disabled"}
                  onClick={handleSubmit(onSubmit)}
                />
            </div>
          </form>
        </div>
        {isModalOpen && 
          <Modal closeFn={() => navigator("/login")}>
            <Modal.Icon><img src={resetSuccess ? completedImage : cancelImage} alt="modal icon"/></Modal.Icon>
            <Modal.Body>
              {resetSuccess ? "비밀번호 변경을 성공하였습니다." : "비밀번호 변경에 실패하였습니다. 다시 시도해 주세요."}
            </Modal.Body>
            <Modal.Button>
              {resetSuccess ? 
                <Button label="다시 로그인하기" variant="active" onClick={resetSuccessHeandler}/>
                :
                <Button label="닫기" variant="active" onClick={() => setIsModalOpen(false)}/>
              }  
            </Modal.Button>
          </Modal>}
      </div>
    </>
  )
}

export default FindPassword;