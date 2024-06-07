import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from "./SignUp.module.scss";
import SubHeader from "@/components/SubHeader/SubHeader";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import User from "@/apis/api/User";
import Timer from '@/components/Timer/Timer';
import useTimer from '@/hooks/useSetInterval';
import useAxios  from '../../hooks/useAxios';

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [nicknameValid, setNicknameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [nicknameButtonDisabled, setNicknameButtonDisabled] = useState(true);
  const [emailButtonDisabled, setEmailButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { fetchData: fetchNicknameData, data: nicknameData } = useAxios(); // 닉네임 중복 체크
  const { fetchData: fetchEmailData, data: emailData } = useAxios(); // 이메일 인증 요청
  const { fetchData: fetchSignup, data: signUpData } = useAxios(); // 회원가입
  const navigate = useNavigate();

  const nickname = watch('nickname');
  const email = watch('email');

  useEffect(() => {
    if (nickname) {
      setNicknameButtonDisabled(false);
      
    } else {
      setNicknameButtonDisabled(true);
      setNicknameValid(false);
      setErrorMessage("");
    }

    if (email) {
      setEmailButtonDisabled(false);
    } else {
      setEmailButtonDisabled(true);
    }

  }, [nickname, email]);

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

  // 이메일 유효성 검사 로직
  const handleEmailValidation = async () => {
    const userData = { email: email };

    // if(!/^\S+@\S+$/.test(email)) {
    //   console.log("이메일 형식이 아닙니다.")
    // }

    await fetchEmailData(User.postEmail(userData));
  };

  useEffect(() => {
    if(emailData) {
      setEmailValid(true);
      startTimer(180)
    } else {
      setEmailValid(false);
    }
  }, [emailData])

  const { timeLeft, isRunning, startTimer, resetTimer } = useTimer(180);

    // 회원가입
    const onSubmit = async () => {
      await fetchSignup(User.postUser());
    };

  return (
    <div className={styles.signUpWrap}>
      <SubHeader pageTitle={"회원가입"}/>
      <div className={styles.formBox}>
        <div className={styles.wrap}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.certified}>
              <div className={styles.inputBox}>
                <InputField
                  type="text"
                  placeholder="닉네임"
                  label="닉네임"
                  {...register('nickname', { required: "* 닉네임을 입력해 주세요." })}
                />
              </div>
              {nicknameButtonDisabled ?
                <Button type="button" label="확인" variant="disabled"/>
                : <Button type="button" label="확인" variant="active" onClick={handleNicknameValidation}/>
              }
            </div>
            {<p className={styles.error}>{errorMessage}</p>}
            {nicknameValid && <p className={styles.success}>* 사용 가능한 닉네임입니다.</p>}
            <InputField
              type="text"
              placeholder="이름"
              label="이름"
              {...register('name', { required: "* 이름을 입력해 주세요." })}
            />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            <InputField
              type="password"
              placeholder="비밀번호 (영문, 숫자, 특수문자 1개 포함 8~16자)"
              label="비밀번호"
              {...register('password', {
                required: "* 비밀번호를 입력해 주세요.",
                minLength: {
                  value: 8,
                  message: "* 비밀번호는 8자 이상이어야 합니다."
                },
                maxLength: {
                  value: 16,
                  message: "* 비밀번호는 16자 이하여야 합니다."
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                  message: "* 비밀번호는 영문, 숫자, 특수문자를 1개 이상 포함해야 합니다."
                }
              })}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            <InputField
              type="password"
              placeholder="비밀번호 재확인"
              label="비밀번호 재확인"
              {...register('confirmPassword', {
                required: "* 비밀번호를 다시 입력해 주세요.",
                validate: (value) => value === watch('password') || "* 비밀번호가 일치하지 않습니다."
              })}
            />
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
            <div className={styles.certified}>
              <div className={styles.inputBox}>
                <InputField
                  type="email"
                  placeholder="이메일"
                  label="이메일"
                  {...register('email', {
                    required: "* 이메일을 입력해 주세요.",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "* 유효한 이메일 주소를 입력해 주세요."
                    }
                    
                  })}
                />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
              </div>
              {emailButtonDisabled ? 
                <Button type="button" label="인증 요청" variant="disabled"/>
                : 
                <Button type="button" label="인증 요청" variant="active" onClick={handleEmailValidation}/>
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
              <Button type="button" label="인증" variant="noFilled"/>
              <Timer timeLeft={timeLeft} isRunning={isRunning} startTimer={startTimer} resetTimer={resetTimer}/>
            </div>
            <div className={styles.btnWrap}>
              <Button type="submit" label="가입하기" variant={watch('nickname') && watch('name') && watch('password') && watch('confirmPassword') && watch('email') ? "active" : "disabled"}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;