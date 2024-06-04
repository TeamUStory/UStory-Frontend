import { request } from "express"
import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 페이퍼 삭제
   * @param paperId 페이퍼 ID
   */
  deletePaper(paperId) {
    return api({
      url: `/papers/${paperId}`,
      method: "delete"
    })
  },

  /**
   * @method GET
   * @summeray 페이퍼 상세 조회
   * @param paperId 페이퍼 ID
   */
  getPaperDetail(paperId) {
    return api({
      url: `/papers/${paperId}`,
      method: "get"
    })
  },

  /**
   * @method GET
   * @summeray 유저 작성 페이퍼 리스트 조회
   * @param requestTime 요청 날짜 {YYYY}-{MM}-{DD}T{HH}:{mm}:{SS}
   */
  getPaperList(requestTime) {
    return api({
      url: `/papers/written`,
      method: "get",
      params: requestTime
    })
  },

  /**
   * @method GET
   * @summeray 유저와 관련된 모든 리스트 조회
   */
  getPaperListAll() {
    return api({
      url: `/papers/map`,
      method: "get"
    })
  },

  /**
   * @method GET
   * @summeray 다이어리에 포함된 페이퍼 리스트 조회
   * @param diaryId 다이어리 ID
   * @param requestTime 요청 날짜 {YYYY}-{MM}-{DD}T{HH}:{mm}:{SS}
   */
  getPaperListByDiary(diaryId, requestTime) {
    return api({
      url: `/papers/diary/${diaryId}`,
      method: "get",
      params: requestTime
    })
  },

  /**
   * @method GET
   * @summeray 유저가 작성한 모든 페이퍼의 갯 수 조회
   */
  getPaperCount() {
    return api({
      url: `/papers/count`,
      method: "get"
    })
  },

  /**
   * @method POST
   * @summeray 페이퍼 생성
   * @param paperData 페이퍼 데이터
   */
  postPaper(paperData) {
    return api({
      url: "/papers",
      method: "post",
      data: paperData
    })
  },

  /**
   * @method PUT
   * @summeray 페이퍼 수정
   * @param paperId 페이퍼 ID
   * @param paperData 페이퍼 데이터
   */
  putPaper(paperId, paperData) {
    return api({
      url: `/papers/${paperId}`,
      method: "put",
      data: paperData
    })
  }
}