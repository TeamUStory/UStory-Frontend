import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 코멘트 삭제
   * @param commentId 코멘트 ID
   */
  deleteComment(commentId) {
    return api({
      url: `/comment/${commentId}`,
      method: "delete"
    })
  },

  /**
   * @method GET
   * @summeray 모든 코멘트 조회
   * @param paperId 페이퍼 ID
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
   * @param paperId 페이퍼 ID
   * @param commentId 코멘트 ID
   */
  getComment(paperId, commentId) {
    return api({
      url: `/comment/paper/${paperId}/comment/${commentId}`,
      method: "get"
    })
  },

  /**
   * @method POST
   * @summeray 코멘트 추가
   * @param commentData 코멘트 데이터 (내용)
   * @param paperId 페이퍼 ID
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
   * @param commentId 코멘트 ID
   * @param commentData 코멘트 데이터 (내용)
   */
  putComment(commentId, commentData) {
    return api({
      url: `/comment/${commentId}`,
      method: "put",
      data: commentData
    })
  }
}