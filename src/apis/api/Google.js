export default {
  /**
   * @method POST
   * @summary 구글 로그인
   */
  getGoogleLogin(code) {
    return {
      url: `/login/oauth2/code/google?code=${code}`,
      method: "post",
    };
  }
};