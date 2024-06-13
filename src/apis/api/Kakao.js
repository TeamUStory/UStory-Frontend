export default {
  /**
   * @method GET
   * @summary 카카오 로그인
   * @param {string} code - 카카오 인증 코드
   */
  getKakaoLogin(code) {
    return {
      url: `/login/oauth2/code/kakao?code=${code}`,
      method: "get",
    };
  }
};