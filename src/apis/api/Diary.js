import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 다이어리 삭제
   * @param diaryId 다이어리 ID
   */
  deleteDiary(diaryId) {
    return api({
      url: `/diary/${diaryId}`,
      method: "delete"
    })
  },

  /**
   * @method GET
   * @summeray 다이어리 상세 페이지 조회
   * @param diaryId 다이어리 ID
   */
  getDiaryDetail(diaryId) {
    return api({
      url: `/diary/${diaryId}`,
      method: "get"
    })
  },

  /**
   * @method GET
   * @summeray 자신이 속한 다이어리 목록 불러오기
   * @param requestTime 요청 날짜 {YYYY}-{MM}-{DD}T{HH}:{mm}:{SS}
   */
  getDiaryList(requestTime) {
    return api({
      url: "/diary",
      method: "get",
      params: requestTime
    })
  },

  /**
   * @method GET
   * @summeray 다이어리 나가기
   * @param diaryId 다이어리 ID
   */
  getDiaryExit(diaryId) {
    return api({
      url: `/diary/${diaryId}/exit`,
      method: "get"
    })
  },

  /**
   * @method GET
   * @summeray 홈 페이지 용 최신 다이어리 6개 불러오기
   */
  getHomeDiary() {
    return api({
      url: "/diary/home",
      method: "get"
    })
  },

  /**
   * @method GET
   * @summeray 유저가 속한 다이어리 총 갯 수 불러오기
   */
  getUserDiaryCount() {
    return api({
      url: `/diary/count`,
      method: "get"
    })
  },

  /**
   * @method POST
   * @summeray 다이어리 생성
   * @param diaryData 다이어리 데이터  
   */
  postDiary(diaryData) {
    return api({
      url: "/diary",
      method: "post",
      data: diaryData
    })
  },
  
  /**
   * @method PUT
   * @summeray 다이어리 수정
   * @param diaryId 다이어리 ID
   * @param diaryData 다이어리 데이터
   */
  putDiary(diaryId, diaryData) {
    return api({
      url: `/diary/${diaryId}`,
      method: "put",
      data: diaryData
    })
  }
}