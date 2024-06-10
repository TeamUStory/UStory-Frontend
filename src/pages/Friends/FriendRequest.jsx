import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Friends.module.scss";
import NoResult from "@/components/NoResult/NoResult";
import SadIcon from "@/assets/icons/SadIcon";
import FriendInfo from "./FriendInfo";
import propTyeps from "prop-types";
import Button from "@/components/Button/Button";
import useAxios from "@/hooks/useAxios"; 
import Friend from "@/apis/api/Friend";
import Modal from "@/components/Modal/Modal";
import completedImage from "@/assets/images/completedImage.png";

const FriendRequest = ({ RequestData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const {fetchData: fetchRefuse, data: refuseData} = useAxios();
  const {fetchData: fetchAccept, data: acceptData} = useAxios();
  const navigate = useNavigate();

  // RequestData에서 친구 요청한 닉네임 가져오기
  const senderNickname = RequestData.map((request) => request.senderNickname)

  // 친구 요청 거절
  const handleRefuse = async (index) => {
    const replyData = {
      senderNickname: senderNickname[index],
      accepted: false
    }
    await fetchRefuse(Friend.postFriendRespond(replyData))
  }

  // 거절 요청 결과 확인
  useEffect(() => {
    // reload 필요
    if(refuseData) {
      setModalOpen(true)
      setModalMessage("친구 요청을 거절했습니다.")
    }
  }, [refuseData])

  // 친구 요청 수락
  const handleAccept = async (index) => {
    const replyData = {
      senderNickname: senderNickname[index],
      accepted: true
    }
    await fetchAccept(Friend.postFriendRespond(replyData))
  }

  // 수락 요청 결과 확인
  useEffect(() => {
    // reload 필요
    if(acceptData) {
      setModalOpen(true)
      setModalMessage("친구 요청을 수락했습니다.")
    }
  }, [acceptData])

  return (
    <>
      {RequestData.length === 0 ? (
        <NoResult icon={<SadIcon stroke="#1d1d1d" strokeWidth={1.0}/>} message="새로운 친구 요청이 없습니다."/>
      ) : (
        RequestData.map((request, index) => (
          <div className={styles.list} key={index}>
            <FriendInfo FriendData={request}/>
            <div className={styles.listBtnWrap}>
              <Button type="button" label="거절" variant="noFilled" onClick={() => handleRefuse(index)}/>
              <Button type="button" label="수락" variant="active" onClick={() => handleAccept(index)}/>
            </div>
          </div>
        ))
      )}
      {modalOpen && (
        <Modal closeFn={() => {setModalOpen(false); navigate("/friends")}}>
          <Modal.Icon><img src={completedImage}  alt={"icon img"} /></Modal.Icon>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Button>
            <Button type="button" label="확인" variant="active" onClick={() => {setModalOpen(false); window.location.reload();}}/>
          </Modal.Button>
        </Modal>
      )}
    </>
  );
}

FriendRequest.propTypes = {
  RequestData: propTyeps.array
}

export default FriendRequest;