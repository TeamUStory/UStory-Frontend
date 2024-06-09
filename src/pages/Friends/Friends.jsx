import { useEffect, useState } from 'react';
import styles from './Friends.module.scss';
import SubHeader from "@/components/SubHeader/SubHeader";
import TabMenu from './TabMenu';
import FriendRequest from './FriendRequest';
import FriendList from './FriendList';
import useAxios from '@/hooks/useAxios';
import Friend from '@/apis/api/Friend';

const Friends = () => {
  const [activeTab, setActiveTab] = useState("친구 목록");
  const {fetchData: fetchFirendsData, data: friendsData} = useAxios();
  const {fetchData: fetchRequestData, data: requestData} = useAxios();
  const [friendList, setFriendList] = useState([]); // 친구 목록
  const [requestList, setRequestList] = useState([]); // 친구 요청 목록

  // 친구 목록 데이터 가져오기
  useEffect(() => {
    const size = 10;
    const page = 1;
    const requestTime = new Date().toISOString().split('.')[0];
    const fetchData =  async () => {
      await fetchFirendsData(Friend.searchUser({size, page, requestTime}))
    }
    fetchData();
  }, [fetchFirendsData])

  useEffect(() => {
    if(friendsData) {
      setFriendList(friendsData)
    }
  }, [friendsData])

  // 친구 요청 데이터 가져오기
  useEffect(() => {
    const size = 10;
    const page = 1;
    const requestTime = new Date().toISOString().split('.')[0];

    const fetchData = async () => {
      await fetchRequestData(Friend.getFriendRequestList({size, page, requestTime}))
    }
    fetchData();
  }, [fetchRequestData])

  useEffect(() => {
    if(requestData) {
      setRequestList(requestData)
    }
  }, [requestData])

  return(
    <>
      <SubHeader pageTitle="친구" />
      <div className={styles.friendWrap}>
        <div className={styles.wrap}>
          <TabMenu FriendData={friendList} RequestData={requestList} activeTab={activeTab} setActiveTab={setActiveTab}/>
          <div className={styles.listWrap}>
            {activeTab === "친구 목록" ? 
              <FriendList FriendData={friendList}/>
            : (
              <FriendRequest RequestData={requestList}/>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Friends;