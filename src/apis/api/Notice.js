
export default {
  /**
   * @method DELETE
   * @summeray 알림 삭제
   * @param noticeId 알림 ID
   */
  deleteFriend(noticeId) {
    return {
      url: `/notices/${noticeId}`,
      method: "delete"
    }
  },

  /**
   * @method GET
   * @summeray 사용자가 가진 모든 알림 조회 / type: 친구 or 기록 or 코멘트
   */
  getNoticeList() {
    return {
      url: `/notices`,
      method: "get"
    }
  }
}