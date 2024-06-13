import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./DiaryDetail.module.scss";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import Noti from "@/components/Noti/Noti";
import CirclePlusIcon from "@/assets/icons/CirclePlusIcon";
import MessageIcon from "@/assets/icons/MessageIcon";
import MoreIcon from "@/assets/icons/MoreIcon";
import PostItem from "@/components/PostItem/PostItem";
import NoResult from "@/components/NoResult/NoResult";
import Button from "@/components/Button/Button";
import SadIcon from "@/assets/icons/SadIcon";
import PlaceMark from "@/assets/icons/PlaceMark";
import useAxios from "@/hooks/useAxios";
import Diary from "@/apis/api/Diary";
import Paper from "@/apis/api/Paper";
import { makeArray } from "@/utils/makeArray";

const DiaryDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isToggle, setIsToggle] = useState(false);
    const [diaryDetail, setDiaryDetail] = useState({
        users: [],
        imgUrl: "",
        name: "",
        diaryCategory: "",
        color: "",
    });
    const [paperList, setPaperList] = useState([]);
    const [members, setMembers] = useState([]);

    const { data: diaryData, fetchData: fetchDiaryData } = useAxios();
    const { data: paperData, fetchData: fetchPaperData } = useAxios();
    const { fetchData: fetchExitDiaryData } = useAxios();

    // 다이어리 상세, 페이지리스트 정보 조회
    useEffect(() => {
        const fetchData = async () => {
            await fetchDiaryData(Diary.getDiaryDetail(id));
            const params = {
                requestTime: new Date().toISOString().split(".")[0],
                size: 2,
            };
            await fetchPaperData(Paper.getPaperListByDiary(id, params));
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDiaryData, fetchPaperData, id]);

    // diaryDetail 정보 저장
    useEffect(() => {
        if (diaryData) {
            setDiaryDetail(diaryData);
            setMembers(diaryData.users);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [diaryData]);

    // paperList 저장
    useEffect(() => {
        if (paperData) {
            setPaperList(paperData);
        }
    }, [paperData]);

    // 2개씩 나뉜 멤버 그룹
    const newMembers = makeArray(members, 2);

    const toggleMenu = () => {
        setIsToggle(!isToggle);
    };

    // 다이어리 나가기 버튼
    const handleExitClick = async () => {
        await fetchExitDiaryData(Diary.getDiaryExit(id));
        navigate('/diary');
    };

    return (
        <div className={styles.allContainer}>
            <div className={styles.header}>
                <Button
                    type="button"
                    variant="inactive"
                    label={<ArrowIcon fill="#1d1d1d" />}
                    onClick={() => navigate(-1)}
                />
                <div className={styles.rightHeader}>
                    <Noti />
                    <button className={styles.moreIcon} onClick={toggleMenu}>
                        <MoreIcon stroke="black" />
                    </button>
                    {isToggle && (
                        <div className={styles.menuContainer}>
                            <Button
                                type="button"
                                variant="inactive"
                                label="수정하기"
                                onClick={() => navigate(`/edit/diary/${id}`)}
                            />
                            <button className={styles.exitButton} onClick={handleExitClick}>
                                나가기
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div
                className={styles.background}
                style={{ backgroundColor: diaryDetail.color }}
            >
                <div className={styles.profile}>
                    <img src={diaryDetail.imgUrl} alt={diaryDetail.name} />
                    <div className={styles.introduction}>
                        <p>{diaryDetail.name}</p>
                        <p className={styles.category}>
                            ({diaryDetail.diaryCategory})
                        </p>
                    </div>
                </div>
                <div className={styles.contentsContainer}>
                    <div className={styles.introduction}>
                        <MessageIcon stroke="black" />
                        <p>{diaryDetail.description}</p>
                    </div>
                    <div className={styles.membersContainer}>
                        <p>멤버</p>
                        <div className={styles.members}>
                            {newMembers.map((memberRow, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className={styles.memberRow}
                                >
                                    {memberRow.map((member, memberIndex) => (
                                        <div
                                            key={memberIndex}
                                            className={styles.member}
                                        >
                                            <img
                                                src={member.profileImgUrl}
                                                alt={member.nickname}
                                            />
                                            <p>{member.nickname}</p>
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
                                <Button
                                    type="button"
                                    label={<CirclePlusIcon fill="#F2B1AB" />}
                                    onClick={() => navigate("/register/paper")}
                                />
                            </div>
                            <div className={styles.right}>
                                <Link to={`/papers/diary/${diaryDetail.id}`}>
                                    <p>전체 보기</p>
                                    <ArrowIcon fill="black" />
                                </Link>
                            </div>
                        </div>
                        <div className={styles.contents}>
                            {paperList.length > 0 ? (
                                paperList.map((postitem, idx) => (
                                    <PostItem
                                        key={idx}
                                        image={postitem.thumbnailImageUrl}
                                        title={postitem.title}
                                        link={`/papers/${postitem.paperId}`}
                                        subText={postitem.store}
                                    >
                                        <PlaceMark color="#AAAAAA" />
                                    </PostItem>
                                ))
                            ) : (
                                <div className={styles.noResultContainer}>
                                    <NoResult
                                        icon={<SadIcon stroke="#616161" />}
                                        message="등록된 기록이 없습니다."
                                    />
                                    <Button
                                        label="기록하기"
                                        variant="active"
                                        onClick={() =>
                                            navigate("/register/paper")
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiaryDetail;
