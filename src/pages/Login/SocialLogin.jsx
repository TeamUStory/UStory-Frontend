import styles from "./Login.module.scss";
import Button from "@/components/Button/Button";
import Kakao from "@/assets/images/kakao.png";

const SocialLogin = () => {
  const handleKakaoLogin = () => {
    window.open("https://kauth.kakao.com/oauth/authorize?client_id=eab271dce70bcf6a5f89799f1f6ca6d5&redirect_uri=http://15.164.24.133:8080/login/oauth2/code/kakao&response_type=code", "_blank");
  }

  return (
    <div className={styles.socialBox}>
      <span>또는</span>
      <div className="socialBtns">
        <Button 
          type="button" 
          label={<img src={Kakao} alt="kakao"/>} 
          onClick={handleKakaoLogin}
          >
        </Button>
      </div>
    </div>
  );
}

export default SocialLogin;
