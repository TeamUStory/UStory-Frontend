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
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 로그인 클릭
  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      loginEmail: email,
      password: password
    }

    // 빈 칸 체크
    if (!email || !password) return setError("* 이메일 혹은 비밀번호를 입력해 주세요.");

    try {
      const response = await User.postLogin(userData);
      const { accessToken } = response.data;

      if (accessToken) {

        // Axios 기본 헤더에 Authorization 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        // 로그인 성공 시 메인 페이지로 이동
        navigate('/');
      } else {
        setError('* 이메일 혹은 비밀번호를 확인해 주세요.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('* 이메일 혹은 비밀번호를 확인해 주세요.');
    }
  }

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