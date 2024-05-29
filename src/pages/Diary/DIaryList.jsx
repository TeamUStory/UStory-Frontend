import { useState } from 'react';
import styles from './DiaryList.module.scss';
import Plus from '@/assets/icons/Plus';
import NotificationIcon from '@/assets/icons/NotificationIcon';
import PlusButton from '@/components/PlusButton/PlusButton';
import PostItem from '../../components/PostItem/PostItem';
import BottomBar from '@/components/BottomBar/BottomBar';

const DiaryList = () => {
    // 카테고리 배열
    const [buttonStates, setButtonStates] = useState([
        { category: "개인", diaryCount: 12, isActive: false },
        { category: "연인", diaryCount: 3, isActive: false },
        { category: "친구", diaryCount: 4, isActive: false },
        { category: "가족", diaryCount: 5, isActive: false },

    ]);
    
    // 카테고리 선택
    const handleButtonClick = (index) => {
        setButtonStates(prevStates => {
            const newButtonStates = [...prevStates];
            newButtonStates[index].isActive = !newButtonStates[index].isActive;
            return newButtonStates;
        });
    };

    // 다이어리 배열
    const postItems = [
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '', subText: '개인', borderColor: 'black' },
       
    ];

    // 다이어리를 2개로 나누는 함수
    const makeArray = (array, size) => {
        return array.reduce((acc, _, i) => {
            if (i % size === 0) acc.push(array.slice(i, i + size));
            return acc;
        }, []);
    };
    
    // 2개씩 나뉜 다이어리 그룹
    const groupedPostItems = makeArray(postItems, 2);


    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.leftHeader}>
                    <p>다이어리</p>
                    <Plus bgWidth="18px" bgHeight="18px" bgColor="#FB8176" width="8px" height="8px" color="white" />
                </div>
                <NotificationIcon />
            </header>
            <div className={styles.category}>
                {buttonStates.map((buttonState, index) => (
                    <button
                        key={index}
                        className={buttonState.isActive ? styles.active : ''}
                        onClick={() => handleButtonClick(index)}
                    >
                        {buttonState.category} {buttonState.isActive ? `(${buttonState.diaryCount})` : ''}
                    </button>
                ))}
            </div>
            <div className={styles.diaryList} >
                {groupedPostItems.map((group, index) => (
                    <div key={index} className={styles.postItem}>
                        {group.map((postItem, idx) => (
                            <PostItem
                                key={idx}
                                image={postItem.image}
                                title={postItem.title}
                                link={postItem.link}
                                subText={postItem.subText}
                                borderColor={postItem.borderColor}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <PlusButton />
            <BottomBar />
        </div>
    );
}

export default DiaryList;
