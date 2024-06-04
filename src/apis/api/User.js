import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 사용자 탈퇴
   */
  deleteUser() {
    return api({
      url: "/user",
      method: "delete",
    })
  },

  /**
   * @method POST
   * @summeray 회원가입
   */
  postUser(userData) {
    return api({
      url: "/user",
      method: "post",
      data: userData,
    })
  },

  /**
   * @method PUT
   * @summeray 사용자 정보 수정
   */
  putUser(userData) {
    return api({
      url: "/user",
      method: "put",
      data: userData,
    })
  },

  /**
   * @method POST
   * @summeray 로그인
   */
  postLogin(userData) {
    return api({
      url: "/user/login",
      method: "post",
      data: userData,
    })
  }
}