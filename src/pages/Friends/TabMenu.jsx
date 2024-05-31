import { useNavigate } from "react-router-dom";
import styles from "./Friends.module.scss";
import Tab from "./Tab";
import Button from "@/components/Button/Button";
import CirclePlusIcon from "@/assets/icons/CirclePlusIcon";
import propTypes from "prop-types";


const TabMenu = ({ FriendData, RequestData, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  
  return(
    <div className={styles.tabMenu}>
      <div className={styles.tabs}>
        <Tab 
          label={FriendData.length !== 0 ? `친구 목록 (${FriendData.length})` : "친구 목록"}
          isActive={activeTab === "친구 목록"}
          onClick={() => setActiveTab("친구 목록")} 
        />
        <Tab 
          label={RequestData.length !== 0 ? `친구 요청 (${RequestData.length})` : "친구 요청"}
          isActive={activeTab === "친구 요청"} 
          onClick={() => setActiveTab("친구 요청")}
        />
      </div>
      <div className={styles.plusBtn}>
        <Button type="button" label={<CirclePlusIcon fill="#FB8176"/>} variant="inactive" onClick={() => navigate("/friends/add")}/>
      </div>
    </div>
  )
}

TabMenu.propTypes = {
  FriendData: propTypes.array,
  RequestData: propTypes.array,
  activeTab: propTypes.string,
  setActiveTab: propTypes.func
}

export default TabMenu;