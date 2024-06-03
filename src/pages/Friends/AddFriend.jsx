import { useState } from 'react';
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

const AddFriend = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const result = 
    {
      id: 1,
      name: '김영희',
      nickName: '메타몽',
      profileImg: '/src/assets/images/basic_profile.png'
    }

  const handleAdd = () => {
    setIsModalOpen(true)
  }
  

  return(
    <>
      <SubHeader pageTitle="친구 추가하기" />
      <div className={styles.friendWrap}>
        <div className={styles.wrap}>
          {/* 검색창 */}
          <div className={styles.searchInput}>
            <InputField type="text" placeholder="닉네임 검색"/>
            <Button type="button" variant="inactive" label={<SearchIcon />}/>        
          </div>
          {/* 검색 결과 영역 */}
          <div className={styles.searchResult}>
            {/* 결과 O */}
            <div className={styles.list}>
              <FriendInfo FriendData={result}/>
              <div className={styles.listBtnWrap}>
                <Button type="button" label="추가하기" variant="active" onClick={handleAdd}/>
              </div>
            </div>
            {/* 결과 X */}
            <NoResult icon={<SadIcon stroke="#1d1d1d" strokeWidth={1.0}/>}  message={`해당 닉네임을 가진 친구가 \n존재하지 않습니다.`}/>
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