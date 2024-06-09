import { useState, useEffect } from 'react';
import styles from './Friends.module.scss';
import NoResult from "@/components/NoResult/NoResult";
import SadIcon from "@/assets/icons/SadIcon";
import FriendInfo from './FriendInfo';
import MoreBtn from './MoreBtn';
import propTyeps from "prop-types";

const FriendList = ({ FriendData }) => {
  const [activeId, setActiveId] = useState(null);

  // 더보기 버튼 클릭 시 실행되는 함수
  const handleMore = (id) => {
    setActiveId(activeId === id ? null : id)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.moreBtn}`)) {
        setActiveId(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return(
    <>
      {FriendData.length === 0 ? (
        <NoResult icon={<SadIcon stroke="#1d1d1d" strokeWidth={1.0}/>} message="등록된 친구가 없습니다."/>
      ) : (
        FriendData.map((friend, idx) => (
          <div className={styles.list} key={idx}>
            <FriendInfo FriendData={friend}/>
            <MoreBtn onClick={() => handleMore(idx)} isActive={activeId === idx}/>
          </div>
        ))
      )}
    </>
  )
}

FriendList.propTypes = {
  FriendData: propTyeps.array
}


export default FriendList;