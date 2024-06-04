import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 사용자 탈퇴
   * @param userData 사용자 데이터 (id)
   */
  deleteUser(userData) {
    return api({
      url: "/user",
      method: "delete",
      data: userData
    })
  },

  /**
   * @method GET
   * @summeray 닉네임으로 전체 사용자 검색
   * @param nickname 닉네임
   */
  searchUser(nickname) {
    return api({
      url: "/user/search",
      method: "get",
      params: nickname
    })
  },

  /**
   * @method GET
   * @summeray 마이페이지에서 사용자 정보 조회
   */
  getUser() {
    return api({
      url: "/user/my-page",
      method: "get"
    })
  },

  /**
   * @method POST
   * @summeray 회원가입
   * @param userData 사용자 데이터
   */
  postUser(userData) {
    return api({
      url: "/user",
      method: "post",
      data: userData,
    })
  },

  /**
   * @method POST
   * @summeray 닉네임 중복 확인 및 유효성 검사
   * @param userData 사용자 데이터 (닉네임)
   */
  postNickname(userData) {
    return api({
      url: "/user/validate-nickname",
      method: "post",
      data: userData
    })
  },

  /**
   * @method POST
   * @summeray 이메일 검증을 위한 인증 코드 전송
   * @param userData 사용자 데이터 (이메일)
   */
  postEmail(userData) {
    return api({
      url: "/user/send-validate",
      method: "post",
      data: userData
    })
  },

  /**
   * @method PUT
   * @summeray 사용자 정보 수정
   * @param userData 사용자 데이터
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
   * @param userData 사용자 데이터 (이메일, 비밀번호)
   */
  postLogin(userData) {
    return api({
      url: "/user/login",
      method: "post",
      data: userData,
    })
  }
}