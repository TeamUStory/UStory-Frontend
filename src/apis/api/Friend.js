import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 친구 삭제
   * @param friendId 친구 ID
   */
  deleteFriend(friendId) {
    return api({
      url: `/friend/${friendId}`,
      method: "delete"
    })
  },

  /**
   * @method GET
   * @summeray 사용자의 전체 친구 리스트를 조회하거나 닉네임으로 친구 검색
   * @param nickname 친구 닉네임
   */
  searchUser(nickname) {
    return api({
      url: `/friend/search`,
      method: "get",
      params: nickname
    })
  },

  /**
   * @method GET
   * @summeray 친구 요청 목록 조회
   */
  getFriendRequestList() {
    return api({
      url: `/friend/received`,
      method: "get"
    })
  },

  /**
   * @method POST
   * @summeray 친구 요청 응답
   * @param senderNickname 요청한 사용자 닉네임
   * @param receiverNickname 요청 받은 사용자 닉네임
   * @param accepted 수락 여부 (boolean)
   */
  postFriendRespond(senderNickname, receiverNickname, accepted) {
    return api({
      url: `/friend/approve`,
      method: "post",
      params: senderNickname, receiverNickname, accepted
    })
  },

  /**
   * @method POST
   * @summeray 친구 요청
   * @param userData 친구 요청할 사용자 데이터
   */
  postFriendRequest(userData) {
    return api({
      url: `/friend`,
      method: "post",
      data: userData
    })
  }
}