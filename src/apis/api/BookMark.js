import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 북마크 해제
   * @param paperId 페이퍼 아이디
   */
  deleteBookmark(paperId) {
    return api({
      url: `/papers/${paperId}/bookmark`,
      method: "delete"
    })
  },

  /**
   * @method GET
   * @summeray 해당 페이퍼가 북마크 되어있는지 여부 조회 / 0: 북마크 되어있지 않음, 1: 북마크 되어있음
   * @param paperId 페이퍼 아이디
   */
  getBookmarkPaper(paperId){
    return api({
      url: `/papers/${paperId}/bookmark`,
      method: "get"
    })
  },

  /**
   * @method GET
   * @summeray 북마크된 페이퍼 전체 조회
   */
  getBookmarkPaperList(){
    return api({
      url: "/papers/bookmarks",
      method: "get"
    })
  },

  /**
   * @method POST
   * @summeray 북마크 추가
   * @param paperId 페이퍼 아이디
   */
  postBookmark(paperId){
    return api({
      url: `/papers/${paperId}/bookmark`,
      method: "post"
    })  
  }
}