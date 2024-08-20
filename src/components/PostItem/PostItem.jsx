import { Link } from 'react-router-dom';
import styles from './PostItem.module.scss';
import PropTypes from "prop-types";
import { truncateText } from "@/utils/truncateText";

const PostItem = ({ image, title, link, subText, children }) => {
    return (
        <Link to={link} className={styles.postItem}>
            <p className={styles.image}>
              <img src={image} alt={title} />
            </p>
            <div className={styles.content}>
                <div className={styles.title}>{truncateText(title, 10)}</div>
                <div className={styles.sub}>
                    {children}
                    <div className={styles.subText}>{truncateText(subText, 6)}</div>
                </div>
            </div>
        </Link>
    );
}

PostItem.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    subText: PropTypes.string,
    children: PropTypes.node
}

export default PostItem;