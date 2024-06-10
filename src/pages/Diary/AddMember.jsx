import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddMember.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import InputField from '@/components/InputField/InputField';
import SearchIcon from '@/assets/icons/SearchIcon';
import RadioButton from '@/components/RadioButton/RadioButton';
import Button from '@/components/Button/Button';
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '@/assets/icons/SadIcon';
import useAxios from "@/hooks/useAxios";
import Friend from '@/apis/api/Friend';

const AddMember = () => {
    const navigate = useNavigate();

    const [selectedMembers, setSelectedMembers] = useState([]);
    const [members, setMembers] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const { data: friendData, fetchData: fetchFriendList } = useAxios();
    
    // 닉네임으로 친구 검색
    const fetchFriend = async (nickname = "") => {
        const requestTime = new Date().toISOString().split('.')[0];
        const params = {requestTime, nickname};
        await fetchFriendList(Friend.searchUser(params));
    };

    // 페이지 처음 실행될때, 친구들 목록 가져오기
    useEffect(() => {
        fetchFriend();
        const savedSelectedMembers = JSON.parse(localStorage.getItem('selectedMembers')) || [];
        setSelectedMembers(savedSelectedMembers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 친구 존재에 따라 친구들 리스트 추가
    useEffect(() => {
        if (friendData && friendData.length > 0) {
            setMembers(friendData);
        } else {
            setMembers([]);
        }
    }, [friendData]);

    // 추가할 친구들 리스트 선택
    const handleRadioButtonClick = (nickname) => {
        setSelectedMembers((prevSelectedMembers) => {
            const isSelected = prevSelectedMembers.includes(nickname);
            const updatedMembers = isSelected 
                ? prevSelectedMembers.filter((member) => member !== nickname)
                : (prevSelectedMembers.length < 10 ? [...prevSelectedMembers, nickname] : prevSelectedMembers);
            
            // 선택한 멤버 localstorage에 저장
            localStorage.setItem('selectedMembers', JSON.stringify(updatedMembers));
            return updatedMembers;
        });
    };

    // 검색어로 친구 검색
    const handleInputChange = (e) => {
        if(e.target.value === ""){
            fetchFriend('');
        }
        setSearchValue(e.target.value);
    };
    
    const handleSearchClick = () => {
        fetchFriend(searchValue);
    };
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchFriend(searchValue);
        }
    };

    // 추가할 친구 목록 다이어리 추가페이지에 넘겨주기
    const handleAddClick = () => {
        navigate('/register/diary',{state : {selectedMembers}});
    }

    return (
        <div className={styles.allContainer}>
            <SubHeader pageTitle="멤버 선택하기" />
            <div className={styles.contentsContainer}>
                <div className={styles.container}>
                    <div className={styles.membersSearchContainer}>
                        <div className={styles.searchBox}>
                            <InputField placeholder="검색" value={searchValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
                            <SearchIcon onClick={handleSearchClick} />
                        </div>
                        <div className={styles.membersContainer}>
                            {members.length > 0 ? (
                                members.map((member, index) => (
                                    <React.Fragment key={index}>
                                        <div className={styles.memberContainer} >
                                            <div className={styles.memberProfile}>
                                                <img src={member.profileImgUrl} alt={member.nickname} />
                                                <div className={styles.information}>
                                                    <p>{member.nickname}</p>
                                                    <p className={styles.memberName}>@{member.name}</p>
                                                </div>
                                            </div>
                                            <RadioButton 
                                                checked={selectedMembers.includes(member.nickname)} 
                                                onChange={() => handleRadioButtonClick(member.nickname)}
                                                disabled={selectedMembers.length >= 10 && !selectedMembers.includes(member.nickname)}
                                            />
                                        </div>
                                        {index < members.length - 1 && <hr />}
                                    </React.Fragment>
                                ))
                            ) : (
                                <div className={styles.noResult}>
                                    <NoResult icon={<SadIcon stroke="#616161" />} message="앗, 친구 목록에 친구가 없어요!" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Button label="선택완료" variant="active" onClick={handleAddClick} />
            </div>
        </div>
    );
}

export default AddMember;
