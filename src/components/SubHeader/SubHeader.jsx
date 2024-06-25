import { useNavigate } from "react-router-dom";
import styles from "./SubHeader.module.scss";
import propTypes from "prop-types";
import Button from "@/components/Button/Button";
import ArrowIcon from "@/assets/icons/ArrowIcon";

const SubHeader = ({ pageTitle, onClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(-1);
        }
    };

    return (
        <>
            <header className={styles.subHeader}>
                <h2 className={styles.pageTitle}>{pageTitle}</h2>
                <Button type="button" variant="inactive" label={<ArrowIcon fill="#1d1d1d" />} onClick={handleClick} />
            </header>
        </>
    );
};

SubHeader.propTypes = {
    pageTitle: propTypes.string,
    onClick: propTypes.func
};

export default SubHeader;
