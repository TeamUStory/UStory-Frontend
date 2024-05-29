import styles from './PostItem.module.scss';
import PropTypes from "prop-types";

const PostItem = ({ image, title, link, subText, borderColor, children }) => {
    return (
        <a href={link} className={styles.postItem}>
            <img src={image} alt={title} className={styles.image} style={{border:borderColor}}/>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.subText}>{subText}</div>
                {children}
            </div>
        </a>
    );
}

PostItem.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    subText: PropTypes.string.isRequired,
    borderColor:PropTypes.string.isRequired,
    children: PropTypes.node
}

export default PostItem;
