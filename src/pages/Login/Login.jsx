import styles from "./Login.module.scss";
import LogoImg from "@/assets/images/logo.png"; 
import InputField from "@/components/InputField/InputField";
import MyPageIcon from "@/assets/icons/MyPageIcon";
import PwIcon from "@/assets/icons/PwIcon";
import Button from "@/components/Button/Button";
import SocialLogin from "./SocialLogin"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.loginWrap}>
      <div className={styles.wrap}>
        <div className={styles.logoBox}>
          <p>우리의 추억을 기록해요.</p>
          <img src={LogoImg} alt="logo image" />
        </div>
        <div className={styles.loginBox}>
          <form>
            <div className={styles.emailBox}>
              <MyPageIcon color="#dddddd" bgColor="none"/>
              <InputField type="email" placeholder="이메일" />
            </div>
            <div className={styles.pwBox}>
              <PwIcon fill="#dddddd"/>
              <InputField type="password" placeholder="비밀번호"/>
            </div>    
            <Button type="submit" label="로그인" variant="active"/>
          </form>
        </div>
        <div className={styles.bottomBtns}>
          <Button label="비밀번호 찾기" variant="inactive"  onClick={() => navigate("/findpassword")}/>
          <Button label="회원가입" variant="inactive" onClick={() => navigate("/signup")}/>
        </div>
        <SocialLogin />
      </div>
    </div>
  )
}

export default Login;