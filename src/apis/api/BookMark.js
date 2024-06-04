import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 북마크 해제
   * @description 북마크 해제
   */
  deleteBookmark() {
    return api({
      url: "/bookmark",
      method: "delete"
    })
  },

  /**
   * @method GET
   * @summeray 해당 페이퍼가 북마크 되어있는지 여부 조회
   * @description 해당 페이퍼가 북마크 되어있는지 여부 조회
   */
  getBookmarkPaper(paperId){
    return api({
      url: `/bookmark/paper/${paperId}/bookmark`,
      method: "get"
    })
  },

  /**
   * @method GET
   * @summeray 북마크된 페이퍼 전체 조회
   * @description 북마크된 페이퍼 전체 조회
   */
  getBookmarkPaperList(){
    return api({
      url: "/bookmarks",
      method: "get"
    })
  },

  /**
   * @method POST
   * @summeray 북마크 추가
   * @description 북마크 추가
   */
  postBookmark(){
    return api({
      url: "/bookmark",
      method: "post"
    })  
  }
}