import { useEffect, useState } from 'react';
import styles from './Friends.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import InputField from '@/components/InputField/InputField';
import SearchIcon from '@/assets/icons/SearchIcon';
import Button from '@/components/Button/Button';
import FriendInfo from './FriendInfo';
import Modal from '@/components/Modal/Modal';
import checkImg from "@/assets/images/completedImage.png"
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '@/assets/icons/SadIcon';
import Friend from '@/apis/api/Friend';
import User from '@/apis/api/User';
import useAxios from '@/hooks/useAxios';
import BanImg from '@/assets/images/ban.png';

const AddFriend = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchResult, setSearchResult] = useState(null)
  const [nickname, setNickname] = useState('')
  const [resultShow, setResultShow] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [selfAdd, setSelfAdd] = useState(false)
  const {fetchData: fetchSearchData, data: searchData} = useAxios();
  const {fetchData: fetchAddFriend, response} = useAxios();

  // 검색
  const handleSearch = async () => {
    const nicknameData = nickname
    await fetchSearchData(User.searchUser(nicknameData))
  }

  useEffect(() => {
    if(searchData) {
      setResultShow(true)
      setSearchResult(searchData)
    } 

    if (searchData && !searchData.isExist) {
      setSearchResult()
    }
  }, [searchData])
  
  // 친구 요청
  const handleAdd = async () => {

    await fetchAddFriend(Friend.postFriendRequest({
      receiverNickname: searchResult.nickname
    }), (err) => {
      // 이미 있거나 요청한 경우
      if(err.response.status === 409) {
        setIsModalOpen(true);
        setModalMessage(`이미 있는 친구이거나, \n친구 요청을 이미 보냈습니다.`)
      }
      // 자기 자신인 경우
      if(err.response.status === 400) {
        setIsModalOpen(true);
        setSelfAdd(true)
        setModalMessage("자기 자신은 친구 추가가 불가능합니다.")
      } 
    })
  }

  useEffect(() => {
    if(response) {
      if(response.status === 204) {
        setModalMessage("친구 추가가 완료되었습니다.")
        setIsModalOpen(true)
      }
    }
  }, [response])
  
  // 텍스트 입력 시 결과 사라지기
  useEffect(() => {
    if(nickname === '') {
      setResultShow(false)
    }
  }, [nickname])

  return(
    <>
      <SubHeader pageTitle="친구 추가하기" />
      <div className={styles.friendWrap}>
        <div className={styles.wrap}>
          {/* 검색창 */}
          <div className={styles.searchInput}>
            <InputField type="text" placeholder="닉네임 검색" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
            <Button type="submit" variant="inactive" label={<SearchIcon />} onClick={handleSearch}/>        
          </div>
          {/* 검색 결과 영역 */}
          <div className={styles.searchResult} style={!resultShow ? {display:"none"} : {display:"block"}}>
            {searchResult ? 
              <div className={styles.list}>
                <FriendInfo FriendData={searchResult}/>
                <div className={styles.listBtnWrap}>
                  <Button type="button" label="추가하기" variant="active" onClick={handleAdd}/>
                </div>
              </div>
            : 
              <NoResult icon={<SadIcon stroke="#1d1d1d" strokeWidth={1.0}/>}  message={`해당 닉네임을 가진 친구가 \n존재하지 않습니다.`}/>
            }
          </div>
        </div>
      </div>
      {isModalOpen && ( 
        <Modal closeFn={() => setIsModalOpen(false)}>
          <Modal.Icon><img src={selfAdd ? BanImg : checkImg} alt='checkImg'/></Modal.Icon>
          <Modal.Body>
            {modalMessage}
          </Modal.Body>
          <Modal.Button>
            <Button type="button" label="확인" variant="active" onClick={() => setIsModalOpen(false)}/>
          </Modal.Button>
        </Modal>
      )}
    </>
  )
}

export default AddFriend;