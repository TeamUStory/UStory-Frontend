import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from "./FindPassword.module.scss";
import SubHeader from "@/components/SubHeader/SubHeader";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import User from "@/apis/api/User";
import Timer from '@/components/Timer/Timer';
import useTimer from '@/hooks/useSetInterval';
import useAxios from '@/hooks/useAxios';

const FindPassword = () => {
  const { register, handleSubmit, watch } = useForm();
  const [emailValid, setEmailValid] = useState(false); // 이메일 인증 성공 여부
  const [emailButtonDisabled, setEmailButtonDisabled] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [codeSuccess, setCodeSuccess] = useState(false);
  const { fetchData: fetchEmailData, data: emailData } = useAxios(); // 이메일 인증 요청
  const { fetchData: fetchCode, data: codeData } = useAxios(); // 이메일 인증 코드 확인
  const { timeLeft, isRunning, startTimer, resetTimer } = useTimer(180);
  const navigator = useNavigate();

  const email = watch('email');

  // 이메일 버튼 활성화 로직
  useEffect(() => {
    if (email) {
      setEmailButtonDisabled(false);
    } else {
      setEmailButtonDisabled(true);
      setEmailErrorMessage("");
    }
  }, [email]);

  // 이메일 유효성 검사 로직
  const handleEmailValidation = async () => {
    setEmailButtonDisabled(true);

    const userData = { toEmail: email };

    if (!/^\S+@\S+$/.test(email)) {
      setEmailErrorMessage("* 이메일 형식이 올바르지 않습니다.");
      setEmailButtonDisabled(false);
      return;
    }

    await fetchEmailData(User.postResetPasswordEmail(userData));

    resetTimer();
    startTimer();

    // 버튼 클릭 후 10초 동안 비활성화
    setTimeout(() => {
      setEmailButtonDisabled(false);
    }, 10000);
  };

  useEffect(() => {
    if (emailData) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [emailData]);

  // 이메일 변경 시 다시 인증
  useEffect(() => {
    if (emailValid) {
      setEmailValid(false);
      setEmailErrorMessage("* 이메일이 변경되었습니다. 다시 인증해 주세요.");
      setCodeSuccess(false);
    }
  }, [email]);

  // 인증 코드 확인
  const handleVerify = async () => {
    const userData = { toEmail: email, authCode: watch('verificationCode') };

    await fetchCode(User.postResetPasswordEmailCode(userData));
  };

  useEffect(() => {
    if (codeData && codeData.isValid === true) {
      setCodeSuccess(true);
      localStorage.setItem("accessToken", codeData.accessToken);
    } else {
      setEmailValid(false);
      setEmailErrorMessage("* 인증 코드가 일치하지 않습니다. 다시 시도해 주세요.");
      setCodeSuccess(false);
    }
  }, [codeData]);

  // 제출 핸들러
  const onSubmit = async () => {
    if (emailValid && codeSuccess) {
      navigator("/resetpassword");
    }

    if (!emailValid) {
      setEmailErrorMessage("* 이메일 인증을 해주세요.");
    }
  };

  return (
    <>
      <SubHeader pageTitle={"비밀번호 재설정"} />
      <div className={styles.formBox}>
        <div className={styles.wrap}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.certified}>
              <div className={styles.inputBox}>
                <InputField
                  type="email"
                  placeholder="이메일"
                  label="이메일"
                  {...register('email')}
                />
              </div>
              {emailButtonDisabled ? 
                <Button type="button" label="인증 요청" variant="disabled" />
                : 
                <Button type="button" label="인증 요청" variant="active" onClick={handleEmailValidation} />
              }
            </div>
            <div className={styles.certified} style={{ display: emailValid ? "flex" : "none" }}>
              <div className={styles.inputBox} style={{ marginTop: "-10px" }}>
                <InputField
                  type="text"
                  placeholder="인증 번호"
                  {...register('verificationCode')}
                />
              </div>
              <Button type="button" label="인증" variant="noFilled" onClick={handleVerify} />
              <Timer timeLeft={timeLeft} isRunning={isRunning} startTimer={startTimer} resetTimer={resetTimer} />
            </div>
            {!emailValid && <p className={styles.error}>{emailErrorMessage}</p>}
            {codeSuccess && <p className={styles.success}>* 인증되었습니다.</p>}
            <div className={styles.btnWrap}>
              <Button type="submit" label="재설정 하기" variant={watch('email') ? "active" : "disabled"}
                onClick={codeSuccess ? handleSubmit(onSubmit) : () => {}}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FindPassword;