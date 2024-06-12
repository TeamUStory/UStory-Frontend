import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Noti.module.scss';
import Button from "@/components/Button/Button";
import BellIcon from "@/assets/icons/BellIcon";
import Notice from "@/apis/api/Notice";
import useAxios from "@/hooks/useAxios";

const Noti = () => {
  const [notiActivation, setNotiActivation] = useState(false)
  const {fetchData, data} = useAxios();
  const navigate = useNavigate();

  // 알림 로드
  useEffect(() => {
    const fetchNotiData = async () => {
      const size = 10;
      const page = 1;
      const requestTime = new Date().toISOString().split('.')[0];
      await fetchData(Notice.getNoticeList({ size, page, requestTime }));
    }
    fetchNotiData();
  }, [fetchData])

  useEffect(() => {
    if (data && data.length > 0) {
      // data에서 가장 최근 데이터의 time만 가져와서 로컬에 저장
      const latestTime = data[0].time;
      const localLatestTime = localStorage.getItem('latestTime');
      if (localLatestTime !== latestTime) {
        // 로컬에 저장된 시간과 서버에서 가져온 시간이 다르면 알림 활성화
        setNotiActivation(true);
        localStorage.setItem('latestTime', latestTime);
        localStorage.setItem('notiActivation', 'true');
      }
    }
  }, [data])

  // 컴포넌트 로드 시 localStorage에서 notiActivation 값 읽어오기
  useEffect(() => {
    const savedNotiActivation = localStorage.getItem('notiActivation') === 'true';
    setNotiActivation(savedNotiActivation);
  }, []);

  const handleNotiClick = () => {
    navigate("/noti");
    setNotiActivation(false);
    localStorage.setItem('notiActivation', 'false');
  };
  
  return (
    <div className={styles.notiBox}>
      <Button type="button" label={<BellIcon stroke="#1d1d1d" />} variant="inactive" onClick={handleNotiClick}/>
      {notiActivation && <span className={styles.dot}></span>}
    </div>
  )
}

export default Noti