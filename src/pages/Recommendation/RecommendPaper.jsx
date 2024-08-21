import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Recommendation.module.scss';
import useAxios from '@/hooks/useAxios';
import SubHeader from '@/components/SubHeader/SubHeader';
import Recommend from "@/apis/api/Recommend";
import PostItem from '@/components/PostItem/PostItem';
import clsx from "clsx";
import HeartIcon from "@/assets/icons/HeartIcon";

const RecommendPaper = () => {
  const { fetchData: fetchPaperData, data: paperData } = useAxios();
  const [paperList, setPaperList] = useState([]);
  const [storeName, setStoreName] = useState("");
  const { recommendPaperKey } = useParams();

  // 추천 기록 가져오기
  useEffect(() => {
    const fetchData = async () => {
      await fetchPaperData(Recommend.getRecommendPaper(`${recommendPaperKey}`));
    }
    fetchData();
  }, [recommendPaperKey])

  // 추천 기록 데이터
  useEffect(() => {
    if(paperData) {
      setPaperList(paperData.recommendPaper)
      setStoreName(paperData.store)
    }
  }, [paperData])
  
  return (
    <>
      <SubHeader pageTitle={storeName} />
      <div className={styles.recommendWrap}>
        <div className={styles.wrap}>
          <div className={clsx(styles.rcmdList, styles.detail)}>
            {paperList.map((paper) => {
              return (
                <PostItem 
                  key={paper.paperId}
                  image={paper.imgUrl}
                  title={paper.paperTitle}
                  link={`/papers/${paper.paperId}`}
                  children={<HeartIcon fill="##AAAAAA"/>}
                  subText={paper.countGreat.toString()} 
                />
              )
            })
          }
          </div>
        </div>
      </div>
    </>
  );
}

export default RecommendPaper;