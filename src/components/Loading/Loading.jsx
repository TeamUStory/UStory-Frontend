import styles from './Loading.module.scss';

export default function Loading() {
  // 화면 깜빡임 방지를 위한 로딩 상태
  

  return (
    <p className={styles.loading}>LOADING...</p>
  );
}