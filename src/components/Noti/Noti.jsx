import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Noti.module.scss';
import Button from "@/components/Button/Button";
import BellIcon from "@/assets/icons/BellIcon";

const Noti = () => {
  const [notiActivation, setNotiActivation] = useState(false)

  useEffect(() => {
    setNotiActivation(true)
  }, [])

  const navigate = useNavigate();
  
  return (
    <div className={styles.notiBox}>
      <Button type="button" label={<BellIcon stroke="#1d1d1d" />} variant="inactive" onClick={() => navigate("/noti")}/>
      {notiActivation && <span className={styles.dot}></span>}
    </div>
  )
}

export default Noti