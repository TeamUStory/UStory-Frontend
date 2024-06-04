import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 코멘트 삭제
   * @description 코멘트 삭제
   */
  deleteComment(id) {
    return api({
      url: `/comment/${id}`,
      method: "delete"
    })
  },

  /**
   * @method GET
   * @summeray 모든 코멘트 조회
   * @description 모든 코멘트 조회
   */
  getAllComment(paperId) {
    return api({
      url: `/comment/paper/${paperId}`,
      method: "get"
    })
  },

  /**
   * @method GET
   * @summeray 댓글 ID를 통해 불러옴
   * @description 댓글 ID를 통해 불러옴.
   */
  getComment(paperId, id) {
    return api({
      url: `/comment/paper/${paperId}/comment/${id}`,
      method: "get"
    })
  },

  /**
   * @method POST
   * @summeray 코멘트 추가
   * @description 코멘트 추가
   */
  postComment(commentData) {
    return api({
      url: "/comment",
      method: "post",
      data: commentData
    })
  },

  /**
   * @method PUT
   * @summeray 코멘트 수정
   * @description 코멘트 수정
   */
  putComment(id) {
    return api({
      url: `/comment/${id}`,
      method: "put",
    })
  }
}