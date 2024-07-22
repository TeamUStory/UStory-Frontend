export default {
  /**
   * @method POST
   * @summary 네이버 로그인
   */
  getNaverLogin(code, state) {
    return {
      url: `/login/oauth2/code/naver?code=${code}&state=${state}`,
      method: "post",
    };
  }
};