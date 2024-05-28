import styles from './Modal.module.scss';
import propTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Button from "@/components/Button/Button";
import XIcon from "/public/icons/XIcon";

const Modal = ({icon, children, buttonText, actionFn, closeFn}) => {
  return ReactDOM.createPortal(
      <div className={styles.modal}>
        <div className={styles.modal__overlay}></div>
        <div className={styles.modal__content}>
          <div className={styles.modal__content__icon}>
            {icon}
          </div>
          <div className={styles.modal__content__body}>
              {children}
          </div>
          <div className={styles.modal__content__button}>
              <Button
                label={`${buttonText}`}
                type={"button"}
                onClick={actionFn}
                variant={"active"}
              />
          </div>
          <button type='button' onClick={closeFn} className={styles.modal__close}>
            <XIcon stroke={"#AAAAAA"}/>
          </button>
        </div>
      </div>
    , document.body
  )
}

Modal.propTypes = {
  icon: propTypes.element,
  children: propTypes.node,
  buttonText: propTypes.string,
  actionFn: propTypes.func,
  closeFn: propTypes.func
}

export default Modal;