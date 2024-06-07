import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BottomBar.module.scss';
import HomeIcon from '../../assets/icons/HomeIcon';
import PageListIcon from '../../assets/icons/PageListIcon';
import DiaryIcon from '../../assets/icons/DiaryIcon';
import MyPageIcon from '../../assets/icons/MyPageIcon';

const BottomBar = () => {
    const location = useLocation();
    const [selectedIcon, setSelectedIcon] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        setSelectedIcon(mapPathnameToIconValue[location.pathname] || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
    
    const mapPathnameToIconValue = {
        "/": "home",
        "/mypage/pagelist": "pageList",
        "/diary": "diaryList",
        "/mypage":"myPage"
    };
    const handleIconClick = (iconName, path) => {
        setSelectedIcon(iconName);
        navigate(path);
    };

    return (
        <div className={styles.bottomBar}>
            <div className={styles.line}></div>
            <div className={styles.iconContainer}>
                <div className={`${styles.iconWrapper}`} onClick={() => handleIconClick('home', '/')}>
                    <HomeIcon color={selectedIcon === 'home' ? '#FB8176' : 'black'} bgColor={selectedIcon === 'home' ? '#F2B1AB45' : 'white'} alt="홈화면" />
                </div>
                <div className={`${styles.iconWrapper}`} onClick={() => handleIconClick('pageList', `/mypage/pagelist`)}>
                    <PageListIcon color={selectedIcon === 'pageList' ? '#FB8176' : 'black'} bgColor={selectedIcon === 'pageList' ? '#F2B1AB45' : 'white'} alt="내가 기록한 장소" />
                </div>
                <div className={`${styles.iconWrapper}`} onClick={() => handleIconClick('diaryList', '/diary')}>
                    <DiaryIcon color={selectedIcon === 'diaryList' ? '#FB8176' : 'black'} bgColor={selectedIcon === 'diaryList' ? '#F2B1AB45' : 'white'} alt="다이어리" />
                </div>
                <div className={`${styles.iconWrapper}`} onClick={() => handleIconClick('myPage', '/mypage')}>
                    <MyPageIcon color={selectedIcon === 'myPage' ? '#FB8176' : 'black'} bgColor={selectedIcon === 'myPage' ? '#F2B1AB45' : 'white'} alt="마이페이지" />
                </div>
            </div>
        </div>
    );
};

export default BottomBar;
