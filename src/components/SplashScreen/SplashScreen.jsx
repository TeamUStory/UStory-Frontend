import Logo from '@/assets/images/logo.png';
import styles from './SplashScreen.module.scss';

const SplashScreen = () => {

    return (
        <div className={styles.background}>
            <p>우리의 추억을 기록해요.</p>
            <img src={Logo} />
        </div>
    )
}

export default SplashScreen;