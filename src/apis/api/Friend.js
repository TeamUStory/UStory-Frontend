
export default {
  /**
   * @method DELETE
   * @summeray 친구 삭제
   */
  deleteFriend(friendId) {
    return {
      url: `/friend/${friendId}`,
      method: "delete"
    }
  },

  /**
   * @method GET
   * @summeray 사용자의 전체 친구 리스트를 조회하거나 닉네임으로 친구 검색
   */
  searchUser(params) {
    return {
      url: `/friend/search`,
      method: "get",
      params: { ...params }
    }
  },

  /**
   * @method GET
   * @summeray 친구 요청 목록 조회
   */
  getFriendRequestList(params) {
    return {
      url: `/friend/received`,
      method: "get",
      params: { ...params }
    }
  },

  /**
   * @method POST
   * @summeray 친구 요청
   */
  postFriendRequest(data) {
    return {
      url: `/friend`,
      method: "post",
      data: { ...data }
    }
  },

  /**
   * @method POST
   * @summeray 친구 요청 응답
   */
  postFriendRespond(data) {
    return {
      url: `/friend/approve`,
      method: "post",
      data: { ...data }
    }
  }
}