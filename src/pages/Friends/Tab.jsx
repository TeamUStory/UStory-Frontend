import styles from "./Friends.module.scss";
import clsx from "clsx";
import propTypes from "prop-types";

const Tab = ({label, isActive, onClick}) => {

  return(
    <button className={clsx(styles.tab, {[styles.active]: isActive})
    } onClick={onClick}>
      {label}
    </button>
  )
}

Tab.propTypes = {
  label: propTypes.string,
  isActive: propTypes.bool,
  onClick: propTypes.func,
}

export default Tab;