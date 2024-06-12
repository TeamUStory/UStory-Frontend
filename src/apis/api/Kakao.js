export default {
  /**
   * @method GET
   * @summeray 카카오 로그인
   */
  getKakaoLogin() {
    return {
      url: `/login/oauth2/code/kakao`,
      method: "get"
    }
  },

  /**
   * @method GET
   * @summeray 카카오 로그아웃
   */
  getKakaoLogout() {
    return {
      url: `/auth/logout`,
      method: "get"
    }
  },

  /**
   * @method POST
   * @summeray 카카오 로그인
   */
  postKakaoLogin() {
    return {
      url: `/login/oauth2/code/kakao`,
      method: "post"
    }
  },

  /**
   * @method POST
   * @summeray 카카오 로그아웃
   */
  postKakaoLogout() {
    return {
      url: `/auth/logout`,
      method: "post"
    }
  },
}