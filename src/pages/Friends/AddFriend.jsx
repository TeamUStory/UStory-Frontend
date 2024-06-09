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

const AddFriend = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchResult, setSearchResult] = useState(null)
  const [nickname, setNickname] = useState('')
  const [resultShow, setResultShow] = useState(false)
  const {fetchData: fetchSearchData, data: searchData} = useAxios();

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
  
  const handleAdd = () => {
    setIsModalOpen(true)
  }

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
          <Modal.Icon><img src={checkImg} alt='checkImg'/></Modal.Icon>
          <Modal.Body>친구 추가가 완료되었습니다.</Modal.Body>
          <Modal.Button>
            <Button type="button" label="확인" variant="active" onClick={() => setIsModalOpen(false)}/>
          </Modal.Button>
        </Modal>
      )}
    </>
  )
}

export default AddFriend;