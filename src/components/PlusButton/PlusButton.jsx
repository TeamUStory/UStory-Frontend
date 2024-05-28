import styles from './PlusButton.module.scss';
import Plus from '@/assets/icons/Plus';

const PlusButton = () => {
    return (
        <div className={styles.plus}>
            <Plus className={styles.plusShadow} width="22px" height="22px" bgColor="#FB8176" color="white" bgHeight="50px" bgWidth="50px" />
        </div>
    )
}

export default PlusButton;