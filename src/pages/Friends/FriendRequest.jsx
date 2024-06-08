import styles from "./Friends.module.scss";
import NoResult from "@/components/NoResult/NoResult";
import SadIcon from "@/assets/icons/SadIcon";
import FriendInfo from "./FriendInfo";
import propTyeps from "prop-types";
import Button from "@/components/Button/Button";

const FriendRequest = ({ RequestData }) => {
  return (
    <>
      {RequestData.length === 0 ? (
        <NoResult icon={<SadIcon stroke="#1d1d1d" strokeWidth={1.0}/>} message="새로운 친구 요청이 없습니다."/>
      ) : (
        RequestData.map((request, idx) => (
          <div className={styles.list} key={idx}>
            <FriendInfo FriendData={request}/>
            <div className={styles.listBtnWrap}>
              <Button type="button" label="거절" variant="noFilled"/>
              <Button type="button" label="수락" variant="active"/>
            </div>
          </div>
        ))
      )}
    </>
  );
}

FriendRequest.propTypes = {
  RequestData: propTyeps.array
}

export default FriendRequest;