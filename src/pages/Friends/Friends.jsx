import { useState } from 'react';
import styles from './Friends.module.scss';
import SubHeader from "@/components/SubHeader/SubHeader";
import TabMenu from './TabMenu';
import FriendRequest from './FriendRequest';
import FriendList from './FriendList';

const Friends = () => {
  const [activeTab, setActiveTab] = useState("친구 목록");

  // 친구 데이터
  const FriendData = [
    { id: 1, name: "김지수", nickName: "메타몽메타몽메타몽몽", profileImg: "/src/assets/images/basic_profile.png" },
    { id: 2, name: "박지수", nickName: "메타몽", profileImg: "/src/assets/images/basic_profile.png" },
    { id: 3, name: "최지수", nickName: "메타몽", profileImg: "/src/assets/images/basic_profile.png" },
    { id: 4, name: "강지수", nickName: "메타몽", profileImg: "/src/assets/images/basic_profile.png" },
  ];

  // 친구 요청 데이터
  const RequestData = [
    { id: 5, name: "이수", nickName: "신청자1234567", profileImg: "/src/assets/images/basic_profile.png" },
    { id: 6, name: "최수", nickName: "신청자2", profileImg: "/src/assets/images/basic_profile.png" },
  ];

  return(
    <>
      <SubHeader pageTitle="친구" />
      <div className={styles.friendWrap}>
        <div className={styles.wrap}>
          <TabMenu FriendData={FriendData} RequestData={RequestData} activeTab={activeTab} setActiveTab={setActiveTab}/>
          <div className={styles.listWrap}>
            {activeTab === "친구 목록" ? 
              <FriendList FriendData={FriendData}/>
            : (
              <FriendRequest RequestData={RequestData}/>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Friends;