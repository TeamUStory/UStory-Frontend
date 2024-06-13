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
import useAxios  from '@/hooks/useAxios';
import Modal from '@/components/Modal/Modal';
import Congratulations from '@/assets/images/Congratulations.png';

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [nicknameValid, setNicknameValid] = useState(false); // 닉네임 중복 체크 성공 여부
  const [emailValid, setEmailValid] = useState(false); // 이메일 인증 성공 여부
  const [nicknameButtonDisabled, setNicknameButtonDisabled] = useState(true);
  const [emailButtonDisabled, setEmailButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const { fetchData: fetchNicknameData, data: nicknameData } = useAxios(); // 닉네임 중복 체크
  const { fetchData: fetchEmailData, data: emailData } = useAxios(); // 이메일 인증 요청
  const { fetchData: fetchCode, data: codeData } = useAxios(); // 이메일 인증 코드 확인
  const { fetchData: fetchSignup, data: signUpData } = useAxios(); // 회원가입
  const navigate = useNavigate();

  const nickname = watch('nickname');
  const email = watch('email');

  // 닉네임, 이메일 버튼 활성화 로직
  useEffect(() => {
    if (nickname) {
      setNicknameButtonDisabled(false);
    } else {
      setNicknameButtonDisabled(true);
      setErrorMessage("");
    }

    if (email) {
      setEmailButtonDisabled(false);
    } else {
      setEmailButtonDisabled(true);
      setEmailErrorMessage("")
    }

  }, [nickname, email]);

  // 닉네임 유효성 검사 
  const handleNicknameValidation = async () => {
    const userData = { nickname: nickname };

    await fetchNicknameData(User.postNickname(userData));

    // 에러메세지 사라지기
    if(nicknameValid === false) {
      setErrorMessage("");  
    }
  };

  useEffect(() => {
    if (nicknameData) {
      // 중복 닉네임 있을 때
      if (nicknameData.isDuplicate === true) {
        setNicknameValid(false);
        console.log(nicknameData)
        setErrorMessage("* 이미 사용 중인 닉네임입니다.");
      } else {
        setNicknameValid(true);
      }
    }

  }, [nicknameData])

  // 닉네임이 변경되었을 때 유효성을 다시 확인하도록 
  useEffect(() => {
    if(nicknameValid) {
      setNicknameValid(false);
      setErrorMessage("* 닉네임이 변경되었습니다. 다시 확인해 주세요.");
    }
  }, [nickname])

  // 이메일 유효성 검사 로직
  const handleEmailValidation = async () => {
    setEmailButtonDisabled(true);

    const userData = { email: email };

    if(!/^\S+@\S+$/.test(email)) {
      setEmailErrorMessage("* 이메일 형식이 올바르지 않습니다.");
      setEmailButtonDisabled(false);
      return;
    }

    await fetchEmailData(User.postEmail(userData),
      (err) => {
        if(err.response.status === 400) {
          setEmailValid(false);
          setEmailErrorMessage("* 이미 사용 중인 이메일입니다.");
        }
      }
    );

    // 버튼 클릭 할 때 마다 10초 동안 비활성화
    setInterval(() => {
      setEmailButtonDisabled(false);
    }, 10000);
  };

  useEffect(() => {
    if(emailData) {
      setEmailValid(true);
      startTimer(180)
    } else {
      setEmailValid(false);
    }
  }, [emailData])

  // 이메일 변경 시 다시 인증
  useEffect(() => {
    if(emailValid) {
      setEmailValid(false);
      setEmailErrorMessage("* 이메일이 변경되었습니다. 다시 인증해 주세요.");
      setCodeSuccess(false)
    }
  
  }, [email])

  const { timeLeft, isRunning, startTimer, resetTimer } = useTimer(180);

  // 인증 코드 확인
  const handleVerify = async () => {
    const userData = { toEmail: email, authCode: watch('verificationCode') };

    await fetchCode(User.postEmailCode(userData));
  }

  useEffect(() => {
    if(codeData && codeData.isValid === true) {
      setCodeSuccess(true);
    } else {
      setEmailValid(false);
      setEmailErrorMessage("* 인증 코드가 일치하지 않습니다. 다시 시도해 주세요.");
      setCodeSuccess(false);
    }
  }, [codeData])

  // 회원가입
  const onSubmit = async () => {
    if(nicknameValid && codeSuccess) {
      await fetchSignup(User.postUser({
        email: email,
        name: watch('name'),
        nickname: nickname,
        password: watch('password'),
        passwordCheck: watch('confirmPassword'),
        profileImgUrl: "https://ustory-bucket.s3.ap-northeast-2.amazonaws.com/common/user-profile.png",
        profileDescription: "자기소개가 없습니다.",
        diaryImgUrl: "https://ustory-bucket.s3.ap-northeast-2.amazonaws.com/common/diary-profile.png"
      }));
    } 

    if(!nicknameValid) {
      setErrorMessage("* 닉네임 중복 확인을 해주세요.");
    }

    if(!emailValid) {
      setEmailErrorMessage("* 이메일 인증을 해주세요.");
    }
  }

  useEffect(() => {
    if(signUpData) {
      if(signUpData) {
        setSignUpSuccess(true)
      } else {
        setSignUpSuccess(false)
      }
    }
  }, [signUpData, navigate]);

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
                  {...register('nickname')}
                />
              </div>
              {nicknameButtonDisabled ?
                <Button type="button" label="확인" variant="disabled"/>
                : <Button type="button" label="확인" variant="active" onClick={handleNicknameValidation}/>
              }
            </div>
            {nicknameValid ?
              <p className={styles.success}>* 사용 가능한 닉네임입니다.</p>
              :
              <p className={styles.error}>{errorMessage}</p>
            }
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
                  value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*])[a-zA-Z\d~!@#$%^&*]{8,16}$/,
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
                  {...register('email')}
                />
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
              <Button type="button" label="인증" variant="noFilled" onClick={handleVerify}/>
              <Timer timeLeft={timeLeft} isRunning={isRunning} startTimer={startTimer} resetTimer={resetTimer}/>
            </div>
            {!emailValid && <p className={styles.error}>{emailErrorMessage}</p> }
            {codeSuccess && <p className={styles.success}>* 인증되었습니다.</p>}
            <div className={styles.btnWrap}>
              <Button type="submit" label="가입하기" variant={watch('nickname') && watch('name') && watch('password') && watch('confirmPassword') && watch('email') ? "active" : "disabled"}/>
            </div>
          </form>
        </div>
      </div>
      {signUpSuccess && (
        <Modal closeFn={() => navigate("/login")}>
          <Modal.Icon><img src={Congratulations} alt='cancelImage' /></Modal.Icon>
          <Modal.Body>회원가입을 성공 했어요!</Modal.Body>
          <Modal.Button>
            <Button type="button" label="어스토리 시작하기" variant="active" onClick={() => navigate("/login")}/>
          </Modal.Button>
        </Modal>
      )}
    </div>
  );
}

export default SignUp;