import Logo from '@/assets/images/logo.png';
import styles from './SplashScreen.module.scss';

const SplashScreen = () => {

    return (
        <div className={styles.background}>
            <img src={Logo} />
        </div>
    )
}

export default SplashScreen;