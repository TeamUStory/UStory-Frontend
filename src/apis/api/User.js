
export default {
  /**
   * @method DELETE
   * @summeray 사용자 탈퇴
   */
  deleteUser(data) {
    return {
      url: "/user",
      method: "delete",
      data: { ...data }
    }
  },

  /**
   * @method GET
   * @summeray 닉네임으로 전체 사용자 검색
   * @param nickname 닉네임
   */
  searchUser(nickname) {
    return {
      url: "/user/search",
      method: "get",
      params: nickname
    }
  },

  /**
   * @method GET
   * @summeray 마이페이지에서 사용자 정보 조회
   */
  getUser() {
    return {
      url: "/user/my-page",
      method: "get"
    }
  },

  /**
   * @method POST
   * @summeray 회원가입
   */
  postUser(data) {
    return {
      url: "/user/sign-up",
      method: "post",
      data: { ...data }
    }
  },

  /**
   * @method POST
   * @summeray 닉네임 중복 확인 및 유효성 검사
   */
  postNickname(data) {
    return {
      url: "/user/sign-up/validate-nickname",
      method: "post",
      data: { ...data }
    }
  },

  /**
   * @method POST
   * @summeray 이메일 검증을 위한 인증 코드 전송
   */
  postEmail(data) {
    return {
      url: "/user/send-validate",
      method: "post",
      data: { ...data }
    }
  },

  /**
   * @method PUT
   * @summeray 사용자 정보 수정
   */
  putUser(data) {
    return {
      url: "/user",
      method: "put",
      data: { ...data }
    }
  },

  /**
   * @method POST
   * @summeray 로그인
   */
  postLogin(data) {
    return {
      url: "/user/login",
      method: "post",
      data: { ...data }
    }
  },

  /**
   * @method POST
   * @summeray 로그아웃
   */
  postLogout() {
    return {
      url: "/user/logout",
      method: "post",
    }
  }
}