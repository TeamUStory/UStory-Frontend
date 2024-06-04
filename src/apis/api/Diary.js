import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 다이어리 삭제
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
   */
  getDiaryList() {
    return api({
      url: "/diary",
      method: "get"
    })
  },
  
  /**
   * @method GET
   * @summeray 유저가 속한 다이어리 개수 불러오기
   */
  getDiaryCount(userId) {
    return api({
      url: `/diary/${userId}/count`,
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
   * @method POST
   * @summeray 다이어리 생성
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
   */
  putDiary(diaryId, diaryData) {
    return api({
      url: `/diary/${diaryId}`,
      method: "put",
      data: diaryData
    })
  }
}