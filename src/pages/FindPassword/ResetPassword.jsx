import styles from "./FindPassword.module.scss";
import SubHeader from "@/components/SubHeader/SubHeader";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";

const FindPassword = () => {

  return(
    <>
      <SubHeader pageTitle={"비밀번호 재설정"}/>
      <div className={styles.formBox}>
        <div className={styles.wrap}>
          <form>
            <InputField type="password" placeholder="새 비밀번호 (영문, 숫자, 특수문자 1개 포함 8~16자)" label="새 비밀번호"/>
            <InputField type="password" placeholder="새 비밀번호 재확인" label="새 비밀번호 재확인"/>
            <div className={styles.btnWrap}>
              <Button type="submit" label="비밀번호 재설정하기" variant="disabled"/>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FindPassword;