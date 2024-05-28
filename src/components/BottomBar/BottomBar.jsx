import { useState } from 'react';
import styles from './BottomBar.module.scss';
import HomeIcon from '../../assets/icons/HomeIcon';
import PageListIcon from '../../assets/icons/PageListIcon';
import DiaryIcon from '../../assets/icons/DiaryIcon';
import MyPageIcon from '../../assets/icons/MyPageIcon';

const BottomBar = () => {
    const [selectedIcon, setSelectedIcon] = useState(null);

    const handleIconClick = (iconName) => {
        setSelectedIcon(iconName);
    };

    return (
        <div className={styles.bottomBar}>
            <div className={styles.line}></div>
            <div className={styles.iconContainer}>
                <div className={styles.iconWrapper} onClick={() => handleIconClick('home')}>
                    <HomeIcon color={selectedIcon === 'home' ? '#FB8176' : 'black'} bgColor={selectedIcon === 'home' ? '#F2B1AB20' : 'white'} alt="홈화면" />
                </div>
                <div className={styles.iconWrapper} onClick={() => handleIconClick('pageList')}>
                    <PageListIcon color={selectedIcon === 'pageList' ? '#FB8176' : 'black'} bgColor={selectedIcon === 'pageList' ? '#F2B1AB20' : 'white'} alt="내가 기록한 장소"/>
                </div>
                <div className={styles.iconWrapper} onClick={() => handleIconClick('diary')}>
                    <DiaryIcon color={selectedIcon === 'diary' ? '#FB8176' : 'black'} bgColor={selectedIcon === 'diary' ? '#F2B1AB20' : 'white'} alt="다이어리" />
                </div>
                <div className={styles.iconWrapper} onClick={() => handleIconClick('myPage')}>
                    <MyPageIcon color={selectedIcon === 'myPage' ? '#FB8176' : 'black'} bgColor={selectedIcon === 'myPage' ? '#F2B1AB20' : 'white'} alt="마이페이지"/>
                </div>
            </div>
        </div>
    )
}

export default BottomBar;
