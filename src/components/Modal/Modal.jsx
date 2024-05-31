import { createContext } from 'react';
import styles from './Modal.module.scss';
import propTypes from 'prop-types';
import ReactDOM from 'react-dom';
import XIcon from "@/assets/icons/XIcon";

const ModalContext = createContext();

const Modal = ({children, closeFn}) => {

  return ReactDOM.createPortal(
      <div className={styles.modal}>
        <div className={styles.modal__overlay}></div>
        <div className={styles.modal__content}>
          <ModalContext.Provider value={{closeFn}}>
            {children}
            <button type='button' onClick={closeFn} className={styles.modal__close}>
              <XIcon stroke={"#AAAAAA"}/>
            </button>
          </ModalContext.Provider>
        </div>
      </div>
    , document.body
  )
}

const ModalIcon = ({children}) => {
  return (
    <div className={styles.modal__content__icon}>
      {children}
    </div>
  )
}

const ModalBody = ({children}) => {
  return (
    <div className={styles.modal__content__body}>
      {children}
    </div>
  )
}

const ModalButton = ({children}) => {
  return (
    <div className={styles.modal__content__button}>
      {children}
    </div>
  )
}

Modal.Icon = ModalIcon;
Modal.Body = ModalBody;
Modal.Button = ModalButton;

Modal.propTypes = {
  children: propTypes.node
}

ModalIcon.propTypes = {
  children: propTypes.node
}

ModalBody.propTypes = {
  children: propTypes.node
}

ModalButton.propTypes = {
  children: propTypes.node
}

export default Modal;
