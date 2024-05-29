import { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from './PlusButton.module.scss';
import Plus from '@/assets/icons/Plus';
import PencilIcon from '@/assets/icons/PencilIcon';

const PlusButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.plus} ${isOpen ? styles.open : ''}`} onClick={handleButtonClick}>
                <Plus className={styles.plusIcon} width="22px" height="22px" bgColor="#FB8176" color="white" bgHeight="50px" bgWidth="50px" />
            </div>
            {isOpen && (
                <div className={styles.buttons}>
                    <button className={styles.registerPage}>
                        <p>장소 기록하기</p>
                        <PencilIcon />
                    </button>
                    <Link to='register-diary' className={styles.link}>
                        <button className={styles.registerDiary}>
                            <p>다이어리 추가</p>
                            <Plus 
                                width="9px" 
                                height="9px" 
                                bgWidth="17px" 
                                bgHeight="17px"
                                bgColor="black"
                                color="#EDD8DD" />
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default PlusButton;