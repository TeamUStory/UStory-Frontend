import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 페이퍼 삭제
   */
  deletePaper(paperId) {
    return api({
      url: `/paper/${paperId}`,
      method: "delete"
    })
  },

  /**
   * @method GET
   * @summeray 페이퍼 상세 조회
   */
  getPaperDetail(paperId) {
    return api({
      url: `/paper/${paperId}`,
      method: "get"
    })
  },

  /**
   * @method GET
   * @summeray 유저 작성 페이퍼 리스트 조회
   */
  getPaperList() {
    return api({
      url: `/papers/user`,
      method: "get"
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
   * @method POST
   * @summeray 페이퍼 생성
   */
  postPaper(paperData) {
    return api({
      url: "/paper",
      method: "post",
      data: paperData
    })
  },

  /**
   * @method PUT
   * @summeray 페이퍼 수정
   */
  putPaper(paperId, paperData) {
    return api({
      url: `/paper/${paperId}`,
      method: "put",
      data: paperData
    })
  }
}