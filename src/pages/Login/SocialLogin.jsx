import styles from "./Login.module.scss";
import Button from "@/components/Button/Button";
import Kakao from "@/assets/images/kakao.png";
import Naver from "@/assets/images/naver.png";

const SocialLogin = () => {
  return (
    <div className={styles.socialBox}>
      <span>또는</span>
      <div className="socialBtns">
        <Button type="button" label={<img src={Kakao} alt="kakao"/>}></Button>
        {/* 추후 개발 예정 네이버 */}
        {/* <Button type="button" label={<img src={Naver} alt="naver"/>}></Button> */} 
      </div>
    </div>
  );
}

export default SocialLogin;
