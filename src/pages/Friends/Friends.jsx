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

  const { fetchData: fetchFriendsData, data: friendsData } = useAxios();
  const { fetchData: fetchRequestData, data: requestData } = useAxios();

  const [friendList, setFriendList] = useState([]); // 친구 목록
  const [requestList, setRequestList] = useState([]); // 친구 요청 목록

  const friendTargetEl = useRef(null); // 친구 목록 무한 스크롤 타겟 요소
  const requestTargetEl = useRef(null); // 요청 목록 무한 스크롤 타겟 요소

  const friendIntersecting = useInfiniteScroll(friendTargetEl); // 친구 목록 무한 스크롤 훅 사용
  const requestIntersecting = useInfiniteScroll(requestTargetEl); // 요청 목록 무한 스크롤 훅 사용

  const [friendPage, setFriendPage] = useState(1); // 친구 목록 페이지 상태
  const [requestPage, setRequestPage] = useState(1); // 요청 목록 페이지 상태

  const [friendLoading, setFriendLoading] = useState(false); // 친구 목록 로딩 상태
  const [requestLoading, setRequestLoading] = useState(false); // 요청 목록 로딩 상태

  // 친구 목록 데이터 가져오기
  const loadFriend = async (page) => {
    setFriendLoading(true);
    const size = 10;
    const requestTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace(' ', 'T');
    const params = { size, page, requestTime };
    await fetchFriendsData(Friend.searchUser(params));
    setFriendLoading(false);
  };

  useEffect(() => {
    loadFriend(1); // 초기 친구 목록 로드
  }, []);

  useEffect(() => {
    if (friendsData) {
      setFriendList((prevList) => [...prevList, ...friendsData]); // 기존 리스트에 새 데이터 추가
    }
  }, [friendsData]);

  // 친구 요청 데이터 가져오기
  const loadRequest = async (page) => {
    setRequestLoading(true);
    const size = 10;
    const requestTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace(' ', 'T');
    const params = { size, page, requestTime };
    await fetchRequestData(Friend.getFriendRequestList(params));
    setRequestLoading(false);
  };

  useEffect(() => {
    loadRequest(1); // 초기 요청 목록 로드
  }, []);

  useEffect(() => {
    if (requestData) {
      setRequestList((prevList) => [...prevList, ...requestData]); // 기존 리스트에 새 데이터 추가
    }
  }, [requestData]);

  // 친구 목록 무한 스크롤 처리
  useEffect(() => {
    if (friendIntersecting && !friendLoading) {
      setFriendPage((prevPage) => prevPage + 1);
    }
  }, [friendIntersecting]);

  // 요청 목록 무한 스크롤 처리
  useEffect(() => {
    if (requestIntersecting && !requestLoading) {
      setRequestPage((prevPage) => prevPage + 1);
    }
  }, [requestIntersecting]);

  // 친구 목록 페이지 변경에 따른 데이터 로드
  useEffect(() => {
    if (friendPage > 1) {
      loadFriend(friendPage);
    }
  }, [friendPage]);

  // 요청 목록 페이지 변경에 따른 데이터 로드
  useEffect(() => {
    if (requestPage > 1) {
      loadRequest(requestPage);
    }
  }, [requestPage]);

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
                <div ref={friendTargetEl} style={{ height: '1px' }}></div>
              </>
            ) : (
              <>
                <FriendRequest RequestData={requestList} />
                <div ref={requestTargetEl} style={{ height: '1px' }}></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;