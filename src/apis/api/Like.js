export default {
  /**
   * @method DELETE
   * @summeray 좋아요 해제
   */
  deleteLike(paperId) {
    return {
      url: `/papers/${paperId}/like`,
      method: "delete"
    }
  },

  /**
   * @method GET
   * @summeray 좋아요가 지정되어있는지 확인 (0 -> 좋아요 X, 1 -> 좋아요 O)
   */
  getLikeCheck(paperId) {
    return {
      url: `/papers/${paperId}/like`,
      method: "get"
    }
  },

  /**
   * @method GET
   * @summeray 해당 페이퍼에서 좋아요의 총 개수를 반환
   */
  getCountLike(paperId) {
    return {
      url: `/papers/${paperId}/count`,
      method: "get"
    }
  },

  /**
   * @method GET
   * @summeray 사용자가 누른 좋아요 리스트 조회
   */
  getLikePaper(params) {
    return {
      url: `/papers/likes`,
      method: "get",
      params: { ...params }
    }
  },

  /**
   * @method POST
   * @summeray 좋아요로 지정
   */
  postLike(paperId) {
    return {
      url: `/papers/${paperId}/like`,
      method: "post",
    }
  }
}