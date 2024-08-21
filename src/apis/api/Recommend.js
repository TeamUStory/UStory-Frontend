export default {
  /**
   * @method GET
   * @summeray 추천 리스트 조회
   */
  getRecommendList(params) {
    return {
      url: `/recommend`,
      method: "get",
      params: { ...params }
    }
  },

  /**
   * @method GET
   * @summeray 새로운 추천 리스트 조회
  */
  getNewRecommendList() {
    return {
      url: `/recommend/reset`,
      method: "get",
    }
  },

  /**
   * @method GET
   * @summeray 추천 장소에 따른 페이퍼 조회
   * @param {string} recommendPaperKey
   */
  getRecommendPaper(recommendPaperKey) {
    return {
      url: `/recommend/papers?recommendPaperKey=${recommendPaperKey}`,
      method: "get"
    }
  }
}