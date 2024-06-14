import styles from "./Login.module.scss";
import Button from "@/components/Button/Button";
import Kakao from "@/assets/images/kakao.png";

const SocialLogin = () => {
  const handleKakaoLogin = () => {
    const REST_API_KEY = "eab271dce70bcf6a5f89799f1f6ca6d5";
    const REDIRECT_URI = import.meta.env.MODE === 'production' 
      ? "https://ustory.me/login/oauth2/code/kakao"
      : "http://localhost:5173/login/oauth2/code/kakao";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className={styles.socialBox}>
      <span>또는</span>
      <div className="socialBtns">
        <Button 
          type="button" 
          label={<img src={Kakao} alt="kakao"/>} 
          onClick={handleKakaoLogin}
        />
      </div>
    </div>
  );
};

export default SocialLogin;