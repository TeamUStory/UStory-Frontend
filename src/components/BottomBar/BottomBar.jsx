import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './BottomBar.module.scss';
import HomeIcon from '../../assets/icons/HomeIcon';
import PageListIcon from '../../assets/icons/PageListIcon';
import DiaryIcon from '../../assets/icons/DiaryIcon';
import MyPageIcon from '../../assets/icons/MyPageIcon';

const BottomBar = () => {
    const location = useLocation();
    const [selectedIcon, setSelectedIcon] = useState('');

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setSelectedIcon('home');
                break;
            case '/pageList':
                setSelectedIcon('pageList');
                break;
            case '/diarylist':
                setSelectedIcon('diary');
                break;
            case '/myPage':
                setSelectedIcon('myPage');
                break;
            default:
                setSelectedIcon('');
                break;
        }
    }, [location.pathname]);

    return (
        <div className={styles.bottomBar}>
            <div className={styles.line}></div>
            <div className={styles.iconContainer}>
                <Link to="/">
                    <div className={`${styles.iconWrapper} ${selectedIcon === 'home' ? styles.selected : ''}`} onClick={() => setSelectedIcon('home')}>
                        <HomeIcon color={selectedIcon === 'home' ? '#FB8176' : 'black'} alt="홈화면" />
                    </div>
                </Link>
                <Link to="/pageList">
                    <div className={`${styles.iconWrapper} ${selectedIcon === 'pageList' ? styles.selected : ''}`} onClick={() => setSelectedIcon('pageList')}>
                        <PageListIcon color={selectedIcon === 'pageList' ? '#FB8176' : 'black'} alt="내가 기록한 장소" />
                    </div>
                </Link>
                <Link to="/diarylist">
                    <div className={`${styles.iconWrapper} ${selectedIcon === 'diary' ? styles.selected : ''}`} onClick={() => setSelectedIcon('diary')}>
                        <DiaryIcon color={selectedIcon === 'diary' ? '#FB8176' : 'black'} alt="다이어리" />
                    </div>
                </Link>
                <Link to="/myPage">
                    <div className={`${styles.iconWrapper} ${selectedIcon === 'myPage' ? styles.selected : ''}`} onClick={() => setSelectedIcon('myPage')}>
                        <MyPageIcon color={selectedIcon === 'myPage' ? '#FB8176' : 'black'} alt="마이페이지" />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default BottomBar;
