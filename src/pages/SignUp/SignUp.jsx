import styles from "./SignUp.module.scss";
import SubHeader from "@/components/SubHeader/SubHeader";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";

const SignUp = () => {

  return(
    <div className={styles.signUpWrap}>
      <SubHeader pageTitle={"회원가입"}/>
      <div className={styles.formBox}>
        <div className={styles.wrap}>
          <form>
            <div className={styles.certified}>
              <div className={styles.inputBox}>
                <InputField type="text" placeholder="닉네임" label="닉네임"/>
              </div>
              <Button type="button" label="확인" variant="active"/>
            </div>
            <InputField type="text" placeholder="이름" label="이름"/>
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