export default {
  /**
   * @method DELETE
   * @summeray 페이퍼 삭제
   */
  deletePaper(paperId) {
    return {
      url: `/papers/${paperId}`,
      method: "delete"
    }
  },

  /**
   * @method GET
   * @summeray 페이퍼 상세 조회
   */
  getPaperDetail(paperId) {
    return {
      url: `/papers/${paperId}`,
      method: "get"
    }
  },

  /**
   * @method GET
   * @summeray 유저 작성 페이퍼 리스트 조회
   */
  getPaperList(params) {
    return {
      url: `/papers/written`,
      method: "get",
      params: { ...params }
    }
  },

  /**
   * @method GET
   * @summeray 유저와 관련된 모든 리스트 조회
   */
  getPaperListAll() {
    return {
      url: `/papers/map`,
      method: "get"
    }
  },

  /**
   * @method GET
   * @summeray 다이어리에 포함된 페이퍼 리스트 조회
   * @param diaryId 다이어리 ID
   */
  getPaperListByDiary(diaryId, params) {
    return {
      url: `/papers/diary/${diaryId}`,
      method: "get",
      params: { ...params }
    }
  },

  /**
   * @method GET
   * @summeray 유저가 작성한 모든 페이퍼의 갯 수 조회
   */
  getPaperCount() {
    return {
      url: `/papers/count`,
      method: "get"
    }
  },

  /**
   * @method POST
   * @summeray 페이퍼 생성
   */
  postPaper(data) {
    return {
      url: "/papers",
      method: "post",
      data: { ...data }
    }
  },

  /**
   * @method PUT
   * @summeray 페이퍼 수정
   * @param paperId 페이퍼 ID
   */
  putPaper(paperId, data) {
    return {
      url: `/papers/${paperId}`,
      method: "put",
      data: { ...data }
    }
  }
}