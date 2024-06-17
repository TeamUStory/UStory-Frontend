import styles from './Error.module.scss'
import errorImg from '@/assets/images/error_img.png'
import Button from '@/components/Button/Button'
import PropTypes from 'prop-types';

const Error = ({ resetErrorBoundary }) => {

  // 에러 페이지에서 이전 페이지로 이동하는 버튼 navite 안쓰고
  const handleBack = () => {
    history.back();
    resetErrorBoundary()
  }

  return (
    <div className={styles.errorWrap}>
      <div className={styles.error}>
        <img src={errorImg} alt="error" />
        <h3>No Result Found!</h3>
        <p>다시 시도 해주세요.</p>
        <Button type="button" label="이전 화면으로" variant="active" onClick={handleBack}/>
      </div>
    </div>
  )
}

Error.propTypes = {
  resetErrorBoundary: PropTypes.func
};

export default Error