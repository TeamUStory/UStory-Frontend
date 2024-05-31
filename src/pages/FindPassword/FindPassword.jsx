import styles from "./FindPassword.module.scss";
import SubHeader from "@/components/SubHeader/SubHeader";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";

const FindPassword = () => {

  return(
    <>
      <SubHeader pageTitle={"비밀번호 찾기"}/>
      <div className={styles.formBox}>
        <div className={styles.wrap}>
          <form>
            <div className={styles.certified}>
              <div className={styles.inputBox}>
                <InputField type="email" placeholder="이메일" label="이메일"/>
              </div>
              <Button type="button" label="인증 요청" variant="active"/>
              <div className={styles.inputBox} style={{marginTop:"-10px"}}>
                <InputField type="text" placeholder="인증 번호"/>
              </div>
              <Button type="button" label="인증" variant="noFilled"/>
            </div>
            <div className={styles.btnWrap}>
              <Button type="submit" label="비밀번호 찾기" variant="disabled"/>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FindPassword;