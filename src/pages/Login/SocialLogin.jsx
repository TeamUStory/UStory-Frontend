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
        <Button type="button" label={<img src={Naver} alt="kakao"/>}></Button>
      </div>
    </div>
  );
}

export default SocialLogin;
