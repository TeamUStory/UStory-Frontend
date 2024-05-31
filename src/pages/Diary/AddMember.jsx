import React, { useEffect, useState } from 'react';
import styles from './AddMember.module.scss'
import SubHeader from '@/components/SubHeader/SubHeader';
import InputField from '@/components/InputField/InputField';
import SearchIcon from '@//assets/icons/SearchIcon';
import RadioButton from '@/components/RadioButton/RadioButton';
import Button from '@/components/Button/Button';
import NoResult from '@/components/NoResult/NoResult';
import SadIcon from '../../assets/icons/SadIcon';

const AddMember = () => {
    // 라디오 버튼의 체크 상태를 관리하는 상태
    const [isChecked, setIsChecked] = useState(false);
    const [memberExist, setMemberExist] = useState(false);

    const members = [
        { nickName: '메타몽', name: '김영희', src: '/src/assets/images/basicMemberImage.png' },
        { nickName: '피카츄', name: '김철수', src: '/src/assets/images/basicMemberImage.png' },
        { nickName: '이브이', name: '난사람', src: '/src/assets/images/basicMemberImage.png' },
    ];

    const handleRadioButtonClick = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        setMemberExist(false);
    },[])

    return (
        <div className={styles.allContainer}>
            <SubHeader pageTitle="멤버 선택하기" />
            {memberExist ? (
                <div className={styles.contentsContainer}>
                <div className={styles.container}>
                    <div className={styles.membersSearchContainer}>
                        <div className={styles.searchBox}>
                            <InputField placeholder="검색" />
                            <SearchIcon />
                        </div>
                        <div className={styles.membersContainer}>
                            {members.map((member, index) => (
                                <React.Fragment key={index}>
                                    <div className={styles.memberContainer} >
                                        <div className={styles.memberProfile}>
                                            <img src='/src/assets/images/basicMemberImage.png' alt='멤버 기본이미지' />
                                            <div className={styles.information}>
                                                <p>{member.nickName}</p>
                                                <p className={styles.memberName}>@{member.name}</p>
                                            </div>
                                        </div>
                                        <RadioButton checked={isChecked} onChange={handleRadioButtonClick} />
                                    </div>
                                    {index < members.length - 1 && <hr />}
                                </React.Fragment>
                            ))}
                            
                        </div>
                    </div>
                </div>
                <Button label="선택완료" variant={"active"} onChange ={()=><div></div>}/>
            </div>
            ) : (
                <div className={styles.noResult}>
                    <div className={styles.noResultContainer}>
                        <NoResult icon={<SadIcon stroke="#616161" />} message="앗, 친구목록에 친구가 없어요" />
                    </div>
                    <Button label="선택완료" onChange ={()=><div></div>} variant="disabled" />
                </div>
            )}
        </div>
    )
}

export default AddMember;
