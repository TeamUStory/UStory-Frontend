import styles from './Noti.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import NoResult from '@/components/NoResult/NoResult';
import BellIcon from '@/assets/icons/BellIcon';
import Button from '@/components/Button/Button';
import ArrowIcon from '@/assets/icons/ArrowIcon';
import clsx from 'clsx';

const Noti = () => {

  const NotiList = [
    {id: 1, category: '친구', content: '새로운 친구 요청이 있습니다.', date: '2024.09.01'},
    {id: 2, category: '코멘트', content: '당신의 코멘트가 필요해요!당신의 코멘트가 필요해요!당신의 코멘트가 필요해요!당신의 코멘트가 필요해요!', date: '2024.09.01'},
    {id: 3, category: '친구', content: '"마자용"님이 친구를 수락하였습니다.', date: '2024.09.01'},
    {id: 4, category: '기록', content: '페이지 오픈!🎉', date: '2024.09.01'}
  ]

  return (
    <>
      <SubHeader pageTitle={"알림"} />
      <div className={styles.NotiWrap}>
        <div className={styles.wrap}>
          {NotiList.length === 0 ? 
            <NoResult icon={<BellIcon stroke={"#616161"} strokeWidth={1.0}/>} message="알림이 없습니다."/> 
            :
            NotiList.map((noti) => (
              <div key={noti.id} className={styles.NotiBox}>
                <div className={styles.Noti}>
                  <div className={styles.contentBox}>
                    <p className={clsx(styles.category, {
                      [styles.friend]: noti.category === "친구",
                      [styles.comment]: noti.category === "코멘트",
                      [styles.record]: noti.category === "기록"
                    })}>
                      {noti.category}
                    </p>
                    <p className={styles.content}>{noti.content}</p>
                  </div>
                  <p className={styles.date}>{noti.date}</p>
                </div>
                <div className={styles.btnBox}>
                  <Button type="button" label={<ArrowIcon fill="#1d1d1d"/>}/>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Noti