import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Diary.module.scss';
import ArrowIcon from '@/assets/icons/ArrowIcon';
import Noti from '@/components/Noti/Noti';
import CirclePlusIcon from '@/assets/icons/CirclePlusIcon';
import MessageIcon from '@/assets/icons/MessageIcon';
import MoreIcon from '@/assets/icons/MoreIcon';
import PostItem from '@/components/PostItem/PostItem';
import NoResult from '@/components/NoResult/NoResult';
import Button from '@/components/Button/Button';
import SadIcon from '@/assets/icons/SadIcon';
import PlaceMark from '../../assets/icons/PlaceMark';


const Diary = () => {
    const navigate = useNavigate();    
    const [isPostItems, setIsPostItems] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    
    const members = [
        { name: '메타몽', imgSrc: '/src/assets/images/basicMemberImage.png' },
        { name: '멤버2', imgSrc: '/src/assets/images/basicMemberImage.png' },
        { name: '멤버3', imgSrc: '/src/assets/images/basicMemberImage.png' },
        { name: '멤버4', imgSrc: '/src/assets/images/basicMemberImage.png' },
        { name: '멤버5', imgSrc: '/src/assets/images/basicMemberImage.png' },
    ];
    
    // 멤버를 2개로 나누는 함수
    const makeArray = (array, size) => {
        return array.reduce((acc, _, i) => {
            if (i % size === 0) acc.push(array.slice(i, i + size));
            return acc;
        }, []);
    };
    
    // 2개씩 나뉜 멤버 그룹
    const newMembers = makeArray(members, 2);

    // 장소 기록 배열
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const postItems = [
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '/diary', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '/diary', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '/diary', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '/diary', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '/diary', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 01', link: '/diary', subText: '개인', borderColor: 'black' },
        { image: 'src/assets/images/diaryBasicImage.png', title: '껑냥이들 05', link: '/diary', subText: '개인', borderColor: 'black' },
    ];

    useEffect(() => {
        setIsPostItems(postItems.length > 0);
    },[postItems]);


    const toggleMenu = () => {
        setIsToggle(!isToggle);
    };

    return (
        <div className={styles.allContainer}>
            <div className={styles.header}>
                <Button type="button" variant="inactive" label={<ArrowIcon fill="#1d1d1d" />} onClick={() => navigate(-1)} />
                <div className={styles.rightHeader}>
                    <button onClick={() => navigate(0)} >
                        <Noti />
                    </button>
                    <button className={styles.moreIcon} onClick={toggleMenu} >
                        <MoreIcon stroke="black" />
                    </button>
                    {isToggle && (
                        <div className={styles.menuContainer}>
                            <Button type="button" variant="inactive" label="수정하기" onClick={() => navigate("/editdiary")} />
                            <button className={styles.exitButton}>나가기</button>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.background}>
                <div className={styles.profile}>
                    <img src='/src/assets/images/diaryBasicImage.png' alt='프로필' />
                    <div className={styles.introduction}>
                        <p>껑냥이들</p>
                        <p className={styles.category}>(친구)</p>
                    </div>
                </div>
                <div className={styles.contentsContainer}>
                    <div className={styles.introduction}>
                        <MessageIcon stroke="black" />
                        <p>엄청난 먹부심이 있는자, 이 모임에 참가해랏</p>
                    </div>
                    <div className={styles.membersContainer}>
                        <p>멤버</p>
                        <div className={styles.members}>
                            {newMembers.map((memberRow, rowIndex) => (
                                <div key={rowIndex} className={styles.memberRow}>
                                    {memberRow.map((member, memberIndex) => (
                                        <div key={memberIndex} className={styles.member}>
                                            <img src={member.imgSrc} alt='프로필 기본이미지' />
                                            <p>{member.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr />
                    <div className={styles.diaryPages}>
                        <div className={styles.title}>
                            <div className={styles.left}>
                                <p>우리들의 기록</p>
                                <Button type="button" label={<CirclePlusIcon fill="#F2B1AB" />} onClick={()=> navigate("/register/paper")}/>
                            </div>
                            <div className={styles.right}>
                                <Link to="/diary/pagelist">
                                    <p>전체 보기</p>
                                    <ArrowIcon fill="black" />
                                </Link>
                            </div>
                        </div>
                        <div className={styles.contents}>
                            {isPostItems ? (
                                postItems.map((postitem, idx) => (
                                    <PostItem
                                        key={idx}
                                        image={postitem.image}
                                        title={postitem.title}
                                        link={postitem.link}
                                        subText={postitem.subText}
                                        borderColor={postitem.borderColor}
                                    >
                                        <PlaceMark color="#AAAAAA" />
                                    </PostItem>
                                ))
                            ) : (
                                <div className={styles.noResult}>
                                    <NoResult icon={<SadIcon stroke="#616161" />} message="등록된 기록이 없습니다." />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Diary;
