import { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import LogoImg from "@/assets/images/logo.png"; 
import InputField from "@/components/InputField/InputField";
import MyPageIcon from "@/assets/icons/MyPageIcon";
import PwIcon from "@/assets/icons/PwIcon";
import Button from "@/components/Button/Button";
import SocialLogin from "./SocialLogin"
import { useNavigate } from "react-router-dom";
import User from "@/apis/api/User";
import useAxios from "@/hooks/useAxios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { fetchData, data } = useAxios();
  const navigate = useNavigate();

  // 로그인 클릭
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("* 이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const userData = { loginEmail: email, password: password };
    fetchData(User.postLogin(userData), () => setError("* 이메일 또는 비밀번호를 확인해 주세요."));
  };

  useEffect(() => {
    if (data?.accessToken) {
      const accessToken = data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      navigate('/');
    }

    if (data?.accessToken === null) {
      setError("* 이메일 또는 비밀번호를 확인해 주세요.");
    }
  }, [data, navigate]);

  useEffect(() => {
    if (email || password) setError("");
  }, [email, password]);

  return (
    <div className={styles.loginWrap}>
      <div className={styles.wrap}>
        <div className={styles.logoBox}>
          <p>우리의 추억을 기록해요.</p>
          <img src={LogoImg} alt="logo image" />
        </div>
        <div className={styles.loginBox}>
          <form onSubmit={handleLogin}>
            <div className={styles.emailBox}>
              <MyPageIcon color="#dddddd" bgColor="none"/>
              <InputField type="email" placeholder="이메일" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.pwBox}>
              <PwIcon fill="#dddddd"/>
              <InputField type="password" placeholder="비밀번호"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}  
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}    
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