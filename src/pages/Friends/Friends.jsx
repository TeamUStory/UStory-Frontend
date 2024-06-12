import { useEffect, useState, useRef } from 'react';
import styles from './Friends.module.scss';
import SubHeader from "@/components/SubHeader/SubHeader";
import TabMenu from './TabMenu';
import FriendRequest from './FriendRequest';
import FriendList from './FriendList';
import useAxios from '@/hooks/useAxios';
import Friend from '@/apis/api/Friend';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const Friends = () => {
  const [activeTab, setActiveTab] = useState("친구 목록");
  const { fetchData: fetchFriendsData, data: friendsData, response: friendsResponse } = useAxios();
  const { fetchData: fetchRequestData, data: requestData, response: requestResponse } = useAxios();
  const [friendList, setFriendList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [friendsPage, setFriendsPage] = useState(1);
  const [requestsPage, setRequestsPage] = useState(1);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);

  const friendsTargetEl = useRef(null);
  const requestsTargetEl = useRef(null);

  const friendsIntersecting = useInfiniteScroll(friendsTargetEl);
  const requestsIntersecting = useInfiniteScroll(requestsTargetEl);

  // 친구 목록 데이터 가져오기
  useEffect(() => {
    const size = 10;
    const requestTime = new Date().toISOString().split('.')[0];
    const fetchData = async () => {
      setLoadingFriends(true);
      await fetchFriendsData(Friend.searchUser({ size, page: friendsPage, requestTime }));
      setLoadingFriends(false);
    };
    fetchData();
  }, [fetchFriendsData, friendsPage]);

  useEffect(() => {
    if (friendsData) {
      setFriendList((prev) => [...prev, ...friendsData]);
    }
  }, [friendsData]);

  useEffect(() => {
    if (friendsIntersecting && !loadingFriends) {
      setFriendsPage((prev) => prev + 1);
    }
  }, [friendsIntersecting, loadingFriends]);

  // 친구 요청 데이터 가져오기
  useEffect(() => {
    const size = 10;
    const requestTime = new Date().toISOString().split('.')[0];
    const fetchData = async () => {
      setLoadingRequests(true);
      await fetchRequestData(Friend.getFriendRequestList({ size, page: requestsPage, requestTime }));
      setLoadingRequests(false);
    };
    fetchData();
  }, [fetchRequestData, requestsPage]);

  useEffect(() => {
    if (requestData) {
      setRequestList((prev) => [...prev, ...requestData]);
    }
  }, [requestData]);

  useEffect(() => {
    if (requestsIntersecting && !loadingRequests) {
      setRequestsPage((prev) => prev + 1);
    }
  }, [requestsIntersecting, loadingRequests]);

  return (
    <>
      <SubHeader pageTitle="친구" />
      <div className={styles.friendWrap}>
        <div className={styles.wrap}>
          <TabMenu FriendData={friendList} RequestData={requestList} activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className={styles.listWrap}>
            {activeTab === "친구 목록" ? (
              <>
                <FriendList FriendData={friendList} />
              </>
            ) : (
              <>
                <FriendRequest RequestData={requestList} />
              </>
            )}
            <div ref={friendsTargetEl} style={{ height: 1 }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Friends;