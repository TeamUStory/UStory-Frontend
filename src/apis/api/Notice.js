
export default {
  /**
   * @method DELETE
   * @summeray 알림 삭제
   * @param noticeId 알림 ID
   */
  deleteNotice(noticeId) {
    return {
      url: `/notices/${noticeId}`,
      method: "delete"
    }
  },

  /**
   * @method DELETE
   * @summeray 사용자가 가진 알림 선택 삭제
   */
  deleteNoticeSelected(data) {
    return {
      url: `/notices/selected`,
      method: "delete",
      data: { ...data }
    }
  },

  /**
   * @method DELETE
   * @summeray 사용자가 가진 모든 알림 삭제
   */
  deleteNoticeAll() {
    return {
      url: `/notices/all`,
      method: "delete"
    }
  },

  /**
   * @method GET
   * @summeray 사용자가 가진 모든 알림 조회 / type: 친구 or 기록 or 코멘트
   */
  getNoticeList(params) {
    return {
      url: `/notices`,
      method: "get",
      params: { ...params }
    }
  }
}