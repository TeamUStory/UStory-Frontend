import styles from "./Login.module.scss";
import Button from "@/components/Button/Button";
import Kakao from "@/assets/images/kakao.png";
import Naver from "@/assets/images/naver.png";
import Google from "@/assets/images/google.png";

const SocialLogin = () => {
  const handleKakaoLogin = () => {
    const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleNaverLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID
    const REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI
    const STATE = import.meta.env.VITE_NAVER_STAT
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?&response_type=code&client_id=${CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = NAVER_AUTH_URL;
  }

  const handleGoggleLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI
    const SCOPE = import.meta.env.VITE_GOOGLE_SCOPE
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = GOOGLE_AUTH_URL;
  }

  return (
    <div className={styles.socialBox}>
      <span>또는</span>
      <div className="socialBtns">
        <Button 
          type="button" 
          label={<img src={Kakao} alt="kakao"/>} 
          onClick={handleKakaoLogin}
        />
        <Button 
          type="button" 
          label={<img src={Naver} alt="Naver"/>} 
          onClick={handleNaverLogin}
        />
        <Button 
          type="button" 
          label={<img src={Google} alt="Google"/>} 
          onClick={handleGoggleLogin}
        />
      </div>
    </div>
  );
};

export default SocialLogin;