import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 친구 삭제
   */
  deleteFriend(userId, friendId) {
    return api({
      url: `/friend/${userId}/${friendId}`,
      method: "delete"
    })
  },

  /**
   * @method GET
   * @summeray 사용자 검색
   */
  searchUser() {
    return api({
      url: `/friend/search`,
      method: "get"
    })
  },

  /**
   * @method GET
   * @summeray 친구 요청 목록 조회
   */
  getFriendRequestList(userId) {
    return api({
      url: `/friend/requests/${userId}`,
      method: "get"
    })
  },

  /**
   * @method GET
   * @summeray 멤버 추가 페이지에서 사용자 검색
   */
  getFriendList() {
    return api({
      url: `/friend/friends`,
      method: "get"
    })
  },

  /**
   * @method POST
   * @summeray 친구 요청 수락
   */
  postFriendRespond() {
    return api({
      url: `/friend/respond`,
      method: "post",
    })
  },

  /**
   * @method POST
   * @summeray 친구 요청
   */
  postFriendRequest() {
    return api({
      url: `/friend/request`,
      method: "post"
    })
  }
}