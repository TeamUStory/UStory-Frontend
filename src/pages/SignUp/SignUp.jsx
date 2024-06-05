import { useState } from "react";
import { useForm } from 'react-hook-form';
import styles from "./SignUp.module.scss";
import SubHeader from "@/components/SubHeader/SubHeader";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import User from "@/apis/api/User";

const SignUp = () => {
  const [nickname, setNickname] = useState("");
  const [nickNameCheck, setNickNameCheck] = useState(false);
  const {register, handleSubmit, watch, formState: {errors}} = useForm();
  
  const onsubmit = async (data) => {
    try {
      const response = await User.postUser(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  if (nickname.length > 0) {
    setNickNameCheck(true);
  }

  // 닉네임 중복 및 유효성 검사
  const handleNickname = async () => {
    const userData = {
      nickname: nickname
    }
    try {
      const response = await User.postNickname(userData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div className={styles.signUpWrap}>
      <SubHeader pageTitle={"회원가입"}/>
      <div className={styles.formBox}>
        <div className={styles.wrap}>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className={styles.certified}>
              <div className={styles.inputBox}>
                <InputField 
                  type="text" 
                  placeholder="닉네임" 
                  label="닉네임"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  // {...register("nickname", {required: "* 닉네임을 입력해 주세요."})}
                />
              </div>
              {!nickNameCheck ?
                <Button type="button" label="확인" variant="disabled"/> 
                : 
                <Button type="button" label="확인" variant="active" onClick={handleNickname}/>
              }
              {/* {errors.nickname && <p className={styles.error}>{errors.nickname.message}</p>} */}
            </div>
            <InputField 
              type="text" 
              placeholder="이름" 
              label="이름"
              {...register("name", {required: "* 이름을 입력해 주세요."})}
            />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            <InputField type="password" placeholder="비밀번호 (영문, 숫자, 특수문자 1개 포함 8~16자)  " label="비밀번호"/>
            <InputField type="password" placeholder="비밀번호 재확인" label="비밀번호 재확인"/>
            <div className={styles.certified}>
              <div className={styles.inputBox}>
                <InputField type="email" placeholder="이메일" label="이메일"/>
              </div>
              <Button type="button" label="인증 요청" variant="active"/>
              <div className={styles.certified} style={{display:"none"}}>
                <div className={styles.inputBox} style={{marginTop:"-10px"}}>
                  <InputField type="text" placeholder="인증 번호"/>
                </div>
                <Button type="button" label="인증" variant="noFilled"/>
              </div>
            </div>
            <div className={styles.btnWrap}>
              <Button type="submit" label="가입하기" variant="disabled"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;