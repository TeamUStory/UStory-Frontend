
export default {
  /**
   * @method DELETE
   * @summeray 사용자 탈퇴
   */
  deleteUser() {
    return {
      url: "/user",
      method: "delete"
    }
  },

  /**
   * @method GET
   * @summeray 닉네임으로 전체 사용자 검색
   */
  searchUser(nickname) {
    return {
      url: "/user/search",
      method: "get",
      params: { nickname }
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
      url: "/user/validate-nickname",
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
      url: "/user/sign-up/send-validate",
      method: "post",
      data: { ...data }
    }
  },

  /**
   * @method POST
   * @summeray 이메일 인증 코드 검증
   */
  postEmailCode(data) {
    return {
      url: "/user/sign-up/verify-validate",
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
  },

  /**
   * @method POST
   * @summeray 비밀번호 재설정 이메일 인증 코드 발송
   */
  postResetPasswordEmail(data) {
    return {
      url: "/user/change-password/send-validate",
      method: "post",
      data: { ...data }
    }
  },
    
  /**
   * @method POST
   * @summeray 비밀번호 재설정 이메일 인증 코드 검증
   */
  postResetPasswordEmailCode(data) {
    return {
      url: "/user/change-password/verify-validate",
      method: "post",
      data: { ...data }
    }
  },

  /**
   * @method PUT
   * @summeray 비밀번호 재설정
   */
  putResetPassword(data) {
    return {
      url: "/user/change-password",
      method: "put",
      data: { ...data }
    }
  }
}