import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BottomBar.module.scss';
import HomeIcon from '@/assets/icons/HomeIcon';
import PageListIcon from '@/assets/icons/PageListIcon';
import DiaryIcon from '@/assets/icons/DiaryIcon';
import MyPageIcon from '@/assets/icons/MyPageIcon';
import RecommendIcon from '@/assets/icons/RecommendIcon';

const mapPathnameToIconValue = {
    "/": "home",
    "/mypage/pagelist": "pageList",
    "/diary": "diaryList",
    "/mypage":"myPage",
};

const BottomBar = () => {
    const location = useLocation();
    const [selectedIcon, setSelectedIcon] = useState('');
    const navigate = useNavigate();
    
    const handleIconClick = (iconName, path) => {
        setSelectedIcon(iconName);
        navigate(path);
    };
    
    useEffect(() => {
        setSelectedIcon(mapPathnameToIconValue[location.pathname] || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
    

    return (
        <div className={styles.bottomBar}>
            <div className={styles.line}></div>
            <div className={styles.iconContainer}>
                <div className={`${styles.iconWrapper}`} onClick={() => handleIconClick('diaryList', '/diary')}>
                    <DiaryIcon color={selectedIcon === 'diaryList' ? '#FB8176' : '#AAA'} alt="다이어리" />
                    <p style={{color: selectedIcon === 'diaryList' ? '#FB8176' : '#AAA'}}>다이어리</p>
                </div>
                <div className={`${styles.iconWrapper}`} onClick={() => handleIconClick('pageList', `/mypage/pagelist`)}>
                    <PageListIcon color={selectedIcon === 'pageList' ? '#FB8176' : '#AAA'} alt="내가 기록한 장소" />
                    <p style={{color: selectedIcon === 'pageList' ? '#FB8176' : '#AAA'}}>기록</p>
                </div>
                <div className={`${styles.iconWrapper}`} onClick={() => handleIconClick('home', '/')}>
                    <HomeIcon color={selectedIcon === 'home' ? '#FB8176' : '#AAA'} alt="홈화면" />
                    <p style={{color: selectedIcon === 'home' ? '#FB8176' : '#AAA'}}>홈</p>
                </div>
                <div className={`${styles.iconWrapper}`} onClick={() => handleIconClick('home', '/')}>
                    <RecommendIcon color={selectedIcon === 'home' ? '#FB8176' : '#AAA'} alt="추천페이지" />
                    <p style={{color: selectedIcon === 'home' ? '#FB8176' : '#AAA'}}>추천</p>
                </div>
                <div className={`${styles.iconWrapper}`} onClick={() => handleIconClick('myPage', '/mypage')}>
                    <MyPageIcon color={selectedIcon === 'myPage' ? '#FB8176' : '#AAA'} alt="마이페이지" />
                    <p style={{color: selectedIcon === 'myPage' ? '#FB8176' : '#AAA'}}>마이페이지</p>
                </div>
            </div>
        </div>
    );
};

export default BottomBar;
