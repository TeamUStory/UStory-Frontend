import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 알림 삭제
   */
  deleteFriend(id) {
    return api({
      url: `/notice/${id}`,
      method: "delete"
    })
  },

  /**
   * @method GET
   * @summeray 알림 목록 조회
   */
  getNoticeList(userId) {
    return api({
      url: `/notice/notices/${userId}`,
      method: "get"
    })
  }
}